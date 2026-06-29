require("dotenv").config();

const cluster = require("cluster");
const mongoose = require("mongoose");
const validateEnv = require("./src/config/env.js");

// Make sure required secrets exist before we touch anything else.
validateEnv();

// How many worker processes to run. WEB_CONCURRENCY=1 (the default) means a
// single process with no clustering. Anything higher forks that many workers.
// Set it to match the cores you want to use (don't exceed your CPU count, or
// the extra workers just add context-switching overhead).
const workerCount = Math.max(1, Number(process.env.WEB_CONCURRENCY) || 1);

if (cluster.isPrimary && workerCount > 1) {
  // ---- Primary process: only supervises workers, never serves traffic ----
  console.log(`Primary ${process.pid} starting ${workerCount} workers`);

  let shuttingDown = false;

  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }

  // Replace a worker that crashes, unless we're in the middle of shutting down.
  cluster.on("exit", (worker, code, signal) => {
    if (shuttingDown) return;
    console.error(
      `Worker ${worker.process.pid} died (${signal || code}), restarting`,
    );
    cluster.fork();
  });

  // On deploy/stop, forward the signal to every worker so each can drain
  // its own connections via the worker shutdown handler below.
  const shutdownPrimary = (signal) => {
    shuttingDown = true;
    console.log(`Primary received ${signal}, stopping workers...`);
    for (const id in cluster.workers) {
      cluster.workers[id].kill(signal);
    }
  };
  process.on("SIGTERM", () => shutdownPrimary("SIGTERM"));
  process.on("SIGINT", () => shutdownPrimary("SIGINT"));
} else {
  // ---- Worker process (or single-process mode): the actual server ----
  const app = require("./src/app.js");
  const connectDb = require("./src/config/database.js");

  const PORT = process.env.PORT || 3000;

  const start = async () => {
    await connectDb();

    // Under cluster, every worker calls listen() on the same port; Node shares
    // the listening socket across workers and load-balances incoming requests.
    const server = app.listen(PORT, () => {
      console.log(`Worker ${process.pid} listening on port ${PORT}`);
    });

    // Graceful shutdown: hosting platforms send SIGTERM on every deploy.
    // Stop accepting new connections, close the DB, then exit.
    const shutdown = (signal) => {
      console.log(`Worker ${process.pid} received ${signal}, shutting down...`);
      server.close(async () => {
        await mongoose.connection.close(false);
        process.exit(0);
      });

      // If something hangs, force-exit rather than block the deploy forever.
      setTimeout(() => {
        console.error("Could not close connections in time, forcing exit.");
        process.exit(1);
      }, 10000).unref();
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  };

  // Last-resort safety nets so failures are logged, not silent.
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled promise rejection:", reason);
  });
  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
  });

  start();
}
