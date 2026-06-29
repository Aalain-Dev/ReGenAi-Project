// Validates that all required environment variables are present at boot.
// Fail fast and loud: a clear crash on startup beats a server that runs but
// breaks on every request because a secret is missing.
const REQUIRED_ENV_VARS = ["MONGO_URL", "JWT_SECRET", "GROQ_API_KEY"];

const validateEnv = () => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
    console.error("Set them in your .env file (see .env.example). Exiting.");
    process.exit(1);
  }
};

module.exports = validateEnv;
