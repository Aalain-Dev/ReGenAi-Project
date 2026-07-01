// Shared options for the auth token cookie.
// - httpOnly: JavaScript (and therefore XSS) cannot read the token.
// - secure: only sent over HTTPS.
// - sameSite "none" because the SPA is served from a different origin than the
//   API (cross-site cookies require "none" + secure).
// - maxAge mirrors the JWT's 1h expiry so the cookie dies with the token.
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 60 * 60 * 1000,
};

module.exports = cookieOptions;
