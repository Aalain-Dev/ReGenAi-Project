const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const authrouter = require("./routes/auth.routes");
const interviewrouter = require("./routes/interview.routes");

const app = express();

// Trust the reverse proxy (Railway/Render/Nginx/etc.) so secure cookies and
// rate-limit client IPs work correctly behind TLS termination.
app.set("trust proxy", 1);

// Comma-separated list of allowed origins, e.g.
// CORS_ORIGINS=https://app.example.com,https://www.example.com
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, "")) // tolerate trailing slashes
  .filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Health check for load balancers / uptime monitoring.
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// Interactive API documentation (Swagger UI) and the raw OpenAPI spec.
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authrouter);
app.use("/api/reports", interviewrouter);

// Unknown route.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler: log the real error server-side, return a generic
// message to the client so we never leak internals.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: "Internal server error" });
});

module.exports = app;
