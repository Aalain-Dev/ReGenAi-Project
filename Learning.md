# 📚 Full Stack Learning Notes

This document contains my learning journey while building production-ready full-stack applications using **Express.js**, **MongoDB**, **React**, and AI APIs.

---

# 🚀 Backend Learning

## 1. Authentication System
- Learned how authentication works from end to end.
- Understood the complete login and logout flow.
- Learned how JWT tokens are generated and validated.

---

## 2. Storing JWT in Cookies
- Learned how to store JWT tokens securely in **HTTP-only cookies** from the backend.
- Understood why cookies are preferred over local storage for authentication.
- Learned different cookie options such as:
  - `httpOnly`
  - `secure`
  - `sameSite`
  - `maxAge`
  - `expires`

---

## 3. Express Middleware
- Learned how to create custom middleware.
- Understood the middleware execution flow.
- Learned where authentication middleware should be placed.
- Understood the purpose of the `next()` function.

---

## 4. Token Blacklisting
- Learned the concept of token blacklisting.
- Understood why it is required for logout functionality.
- Learned how Redis or a database can be used to invalidate JWT tokens before they expire.

---

## 5. AI Model Fallback
- Learned how to implement multiple AI providers.
- Integrated:
  - Groq
  - OpenRouter

This allows automatic fallback if one provider fails.

---

## 6. Rate Limiting
Learned about the **express-rate-limit** package.

Purpose:
- Prevent brute-force attacks
- Reduce API abuse
- Limit repeated requests from the same IP

---

## 7. Helmet
Learned about the **Helmet** package.

Purpose:
- Adds important HTTP security headers.
- Protects against common web vulnerabilities.

---

## 8. MongoDB TTL (Time To Live)
Learned about MongoDB's **TTL Index**.

Use cases:
- OTP expiration
- Password reset tokens
- Session cleanup
- Temporary data

---

## 9. Production Scripts

Learned the difference between development and production scripts.

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

- `npm start` → Production
- `npm run dev` → Development

---

## 10. Morgan
Learned about the **Morgan** package.

Purpose:
- Logs incoming HTTP requests.
- Useful for debugging and monitoring.

---

## 11. Compression
Learned about the **compression** middleware.

Purpose:
- Compresses HTTP responses.
- Reduces bandwidth usage.
- Improves application performance.

---

## 12. Database Connection & `process.exit()`

Learned the purpose of:

```javascript
process.exit(0);
process.exit(1);
```

- `process.exit(0)` → Successful termination.
- `process.exit(1)` → Application terminated because of an error.

Commonly used when database connection fails during server startup.

---

## 13. Cookie Options

Learned how to configure cookies using options like:

```javascript
{
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
}
```

---

## 14. Environment Variable Validation

Learned that production applications should validate all required environment variables during startup.

Example variables:

- `JWT_SECRET`
- `MONGO_URI`
- `PORT`
- `OPENAI_API_KEY`
- `GROQ_API_KEY`

The application should fail immediately if any required environment variable is missing.

---

## 15. Express Trust Proxy

Studied the following configuration:

```javascript
app.set("trust proxy", 1);
```

Purpose:
- Required when the application is behind a reverse proxy (e.g., Nginx, Cloudflare, Render, Railway, AWS Load Balancer).
- Ensures Express correctly identifies the client's IP address.
- Important for secure cookies and rate limiting.

---

# 🤖 AI Integration

## Installing Required SDKs

### Groq SDK

```bash
npm install groq-sdk
```

### OpenAI SDK

```bash
npm install openai
```

---

# 💻 Frontend Learning

## 1. Four-Layer Architecture

Learned how to organize frontend applications using a layered architecture.

Example:

- Components
- Pages
- Services/API
- Utilities/Hooks

This improves maintainability and scalability.

---

## 2. `withCredentials`

Learned the purpose of:

```javascript
withCredentials: true
```

Used in Axios requests to:

- Send cookies automatically.
- Support authentication using HTTP-only cookies.
- Enable secure communication between frontend and backend.

---

## 3. React Hooks

Learned the use of React Hooks, including:

- `useState`
- `useEffect`
- `useContext`
- `useMemo`
- `useCallback`
- Custom Hooks

---

## 4. Axios Interceptors

Learned about:

### Request Interceptors
Used before every request to:

- Attach authentication tokens
- Modify request headers
- Log outgoing requests

### Response Interceptors
Used after every response to:

- Handle errors globally
- Refresh expired tokens
- Redirect users on unauthorized responses
- Standardize API error handling

---

# 🎯 Key Takeaways

- Built a deeper understanding of authentication systems.
- Learned production-ready backend practices.
- Explored security-focused middleware and configurations.
- Integrated AI providers with fallback support.
- Improved frontend architecture and API communication.
- Gained knowledge of performance optimization and secure deployment practices.

---

> **Note:** These notes summarize my ongoing learning while building production-ready full-stack applications using Express.js, React, MongoDB, JWT authentication, and AI integrations.