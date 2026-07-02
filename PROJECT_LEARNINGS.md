# ReGenAi — Project Learnings & Reusable Patterns

> A field guide distilled from the ReGenAi codebase. **ReGenAi** is a resume/interview-report
> generator: a React SPA + Express/MongoDB API that takes a PDF resume + job description and
> uses an LLM to produce a match score, interview questions, skill gaps, and a prep plan.
>
> Use this as a checklist and reference when starting future projects.

---

## 1. Project Structure & Separation of Concerns

### Backend — layered by responsibility (`backend/src/`)
- `server.js` = **process/lifecycle only** (clustering, graceful shutdown).
- `app.js` = **Express wiring only**.
- This split lets you `require("./app")` in tests without starting a server.
- Layer flow: `config/` → `controller/` → `services/` → `models/`, with `middleware/`, `routes/`, `utils/`.
- **Controllers handle HTTP; services hold business/AI logic; models hold schema.**
- A controller should never call an external API directly — it calls a service.

### Frontend — feature-sliced 4-layer architecture (`frontend/features/`)
Each feature (`auth`, `interview`) has the same 4 layers:
- `services/` — raw API calls (axios)
- `hooks/` — orchestration + state updates, error handling
- `context/` — shared state
- `pages/` / `components/` — UI

**Takeaway:** the flow is always `component → hook → service → apiBase`. UI never calls axios
directly. This is the single most transferable pattern here — replicate it per feature in any
React app.

---

## 2. Production-Readiness Checklist (Node service boot sequence)

- **Fail-fast env validation** (`config/env.js`) — check required secrets at boot; `process.exit(1)`
  if missing. A clear crash beats silent per-request failures.
- **Graceful shutdown** (`server.js`) — hosts send `SIGTERM` on every deploy; stop accepting
  connections, close DB, then exit; force-exit after 10s if it hangs.
- **`process.exit(1)` vs `exit(0)`** — `1` = error/crash (let platform restart), `0` = clean exit.
- **Clustering** via `WEB_CONCURRENCY` to use multiple cores, with worker auto-restart on crash.
- **Safety nets** — `unhandledRejection` / `uncaughtException` handlers so nothing fails silently.
- **`app.set("trust proxy", 1)`** — required behind a reverse proxy (Railway/Render/Nginx) so
  secure cookies and rate-limit IPs work.
- **Middleware order matters**: `helmet` → `compression` → `morgan` → `cors` → body parser →
  `cookieParser`. Security and logging first.
- **`express.json({ limit: "1mb" })`** — always cap body size.
- **Global error handler** logs the real error server-side but returns a generic message — never
  leak internals to clients.

---

## 3. Auth & Security

- **JWT in an httpOnly cookie**, not localStorage (`utils/cookieOptions.js`):
  - `httpOnly` (XSS can't read it), `secure`, `sameSite:"none"` (needed for cross-origin SPA→API),
    `maxAge` mirrors the token's 1h expiry.
  - **One shared cookieOptions object** used for both set and clear — they must match or
    `clearCookie` silently fails.
- **Token blacklisting for logout** (`models/blacklisttoken.model.js`):
  - JWTs are stateless, so "logout" means storing the token in a blacklist the middleware checks.
  - **MongoDB TTL index** (`index: { expires: 0 }` on `expiresAt`) auto-deletes entries once the
    token would have expired anyway — the collection never grows forever.
- **Rate limiting** (`middleware/rateLimit.middleware.js`) on auth routes — 10 attempts / 15 min to
  blunt brute-force / credential-stuffing.
- **bcrypt cost factor 12**; identical error message for "no such user" vs "wrong password" (don't
  leak which emails exist).
- **Ownership scoping**: report queries filter by `{ user: req.user.id, _id }` — never trust a
  client-supplied ID alone. Validate `ObjectId` before querying.
- **`.select("-resume -selfDescription")`** on list endpoints — don't ship heavy/sensitive fields
  in list views.

---

## 4. AI Integration (Groq / OpenRouter)

- **Zod schema validates LLM output** (`services/groq.service.js`) — LLMs lie about JSON shape;
  `JSON.parse` then `schema.parse()` before touching the DB.
- **Retry with exponential backoff + jitter**, and a **model fallback chain**
  (`llama-3.3-70b` → `llama-3.1-8b-instant`). Only retry *transient* errors (429/5xx/"overloaded");
  throw immediately on real errors like bad API keys.
- **`response_format: { type: "json_object" }`** + low `temperature: 0.3` for structured,
  deterministic output.
- **Usage/quota gating** (`services/usage.services.js`) — count docs in a rolling 24h window; guard
  against `NaN` from a bad env var with `Number(...) || 3`.

> ⚠️ **Gap worth noting:** `openrouter.service.js` exists as a full fallback provider, but the
> controller only ever calls Groq. The cross-*provider* fallback isn't actually wired up — only
> intra-Groq model fallback is. If Groq is down, the request fails. Worth completing.

---

## 5. Frontend Patterns

- **`withCredentials: true`** on the axios instance (`apiBase.js`) — required to send/receive the
  httpOnly cookie cross-origin. Without it auth silently breaks.
- **Axios interceptors** are set up but currently pass-through — the intended use is centralizing
  401-handling/redirects and error normalization in one place instead of every call.
- **Session hydration pattern** (`auth.hooks.js`): after login, the server sets the cookie, then
  the client calls `getMe()` to fetch the real user — the token is never read client-side.
- **A single `loading` = "is the startup session check done?"** (`auth.context.jsx`) — route guards
  wait on it so they don't redirect before `getMe()` resolves. In-flight form state is handled
  separately by react-hook-form's `isSubmitting`. Conflating these two is a common bug; keeping
  them separate is the lesson.
- **Route guards as layout routes**: `<Protected>` and `<GuestRoute>` wrap `<Outlet />` —
  declarative auth boundaries instead of per-page checks.

---

## 6. Things to Watch / Improve Next Time

1. **Wire the OpenRouter fallback** (or delete it) — dead fallback code is misleading.
2. **No input validation library on the API body** — Zod is used for LLM output but hand-rolled
   `if` checks for register/login. Consider Zod on request bodies too for consistency.
3. **`catch (e)` swallowing** — several controllers return generic 500s without logging `e`, which
   makes production debugging hard.
4. **Naming consistency** — mixed casing (`Interview.controller.js` vs `auth.controller.js`,
   `getme`, `authmiddleware`). Pick one convention early.
5. **No tests** — the `server.js`/`app.js` split was made to enable testing; take that payoff.

---

## Quick Reference: Key Packages

| Package | Purpose |
|---|---|
| `helmet` | Secure HTTP headers |
| `compression` | Gzip responses |
| `morgan` | HTTP request logging (`combined` in prod, `dev` locally) |
| `express-rate-limit` | Brute-force / DoS throttling |
| `cookie-parser` | Read cookies (for the JWT session cookie) |
| `bcrypt` | Password hashing (cost 12) |
| `jsonwebtoken` | Sign/verify JWTs |
| `zod` | Validate LLM output & (recommended) request bodies |
| `multer` | File uploads (memory storage, 3MB cap for resume PDF) |
| `pdf-parse` | Extract text from uploaded PDF resume |
| `groq-sdk` / `openai` | LLM providers (OpenAI SDK points at OpenRouter baseURL) |
| `swagger-jsdoc` / `swagger-ui-express` | API docs from JSDoc comments |
| **Frontend** | |
| `axios` | HTTP client (single configured instance with `withCredentials`) |
| `react-router-dom` | Routing + layout-route guards |
| `react-hook-form` | Forms + `isSubmitting` in-flight state |
| `react-toastify` | User-facing error/success toasts |
| `tailwindcss` | Styling |
