const isProduction = process.env.NODE_ENV === "production";

// Shared options for the auth token cookie.
// - httpOnly: JavaScript (and therefore XSS) cannot read the token.
// - secure: only sent over HTTPS in production.
// - sameSite "none" in prod because the SPA is served from a different origin
//   than the API (cross-site cookies require "none" + secure). "lax" in dev so
//   localhost:5173 -> localhost:3000 keeps working without HTTPS.
// - maxAge mirrors the JWT's 1h expiry so the cookie dies with the token.
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 60 * 60 * 1000,
};

module.exports = cookieOptions;
