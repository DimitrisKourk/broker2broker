# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Broker2Broker: a B2B real-estate platform where verified brokers share property listings, build "associate" networks, and control listing visibility (Private/Associates/Public). Solo project, work in progress, no automated tests or CI yet. React 19 + Vite frontend, layered Express 5 backend, MySQL, Valkey/Redis for sessions.

## Commands

```bash
npm install      # install deps
npm run start     # Express API on :3000 (src/BackEnd/server.js)
npm run react     # Vite dev server on :5173
npm run build     # production frontend build
npm run preview   # preview the production build
npm run lint      # eslint .
```

Both servers must be running concurrently for the app to work end-to-end. There is no test command — the project has no automated tests.

Requires MySQL 8 reachable via the `DB_*` vars in `.env` (see `.env.example`), and Valkey/Redis on `localhost:6379` for sessions. The DB schema isn't scripted in the repo; tables in use: `users`, `registrationrequests`, `subscriptions`, `properties`, `propertyimages`, `favourites`, `associates`, `associationrequests`.

## Backend architecture

Each backend module (`src/BackEnd/Modules/<name>/`) is split into four files per the same layering:

```
*.routes.js      → express.Router() factory, wires middleware (auth, uploads) to controller methods
*.controller.js  → reads req, calls the service, writes res (try/catch → HTTP status)
*.service.js     → business rules
*.repository.js  → raw SQL via mysql2 (parameterized queries)
```

Key conventions:
- The DB connection is **not** imported directly inside modules. `server.js` builds the connection/redis store once and injects it into each router factory (e.g. `propertyRouter({db: connection})`); route handlers then set `res.locals.database = data.db` before calling the controller, and that flows down through `service`/`repository` call payloads. When adding a new module or endpoint, follow this injection pattern rather than importing `dbconfig.js` directly.
- Repository/service functions **throw** on failure; only controllers catch and translate errors into HTTP responses. Don't reintroduce swallow-and-return-error patterns in repository/service code.
- Auth middleware lives in `src/BackEnd/utils/`: `isAuthenticated` and `isActiveMember` (`userAuthorization.js`), `isAdmin` (`adminAuthorization.js`). `isActiveMember` is the server-side mirror of the frontend's `PrivateRoute` — it gates on numeric `user.role`, not just session presence.
- **Role scheme** (numeric, same values used on both frontend and backend): `-3` declined, `-2` restricted, `-1` no active plan, `0` pending approval, `>=1` active member, `10` admin, `69` super admin.
- Property visibility/access checks go through `canAccessProperty` in `property.repository.js` — reuse it rather than re-implementing visibility logic elsewhere.
- Uploads go through `multerConfig.js` (`uploadPropertyImages`/`uploadProfileImage`, `handleUploadError`) which validates file type/size and is mounted after `isActiveMember` in the route chain; uploaded files are served statically from `/property-images` and `/profile-images` (currently unauthenticated static serving — a known gap).
- `eslint.config.js` splits the backend out from the frontend lint config so `src/BackEnd/**` gets Node globals (`process`, etc.) instead of browser globals — keep new backend files under that glob.

## Frontend architecture

- Routing (`src/FrontEnd/routes/App/App.jsx`) wraps everything in `AuthProvider` and gates route groups with guard components rather than per-page checks:
  - `PrivateRoute` — active members only, redirects pending/declined/restricted/no-plan roles to their matching status page.
  - `AdminRoute` — role `10`/`69` only.
  - `RoleBasedRoutes.jsx` exports one guard per non-active status (`ApprovalPending`, `NoActivePlan`, `Restricted`, `RegistrationRequestDeclined`) so those status pages are only reachable by users actually in that state.
- Each feature has its own React context under `components/*Context/` (auth, user profile, associates, property form, registration requests, property card grid, property details). Context values are **not memoized** by any provider here — when adding `useEffect` dependencies, include real prop/param deps but deliberately leave context objects out (with a short comment) rather than causing render loops.
- All network calls go through `apiFetch` in `src/FrontEnd/utils/apiClient.js` — a shared wrapper that prefixes `VITE_API_URL`, sends the session cookie (`credentials: "include"`), JSON-encodes `json:` bodies (or passes `body:` through as-is for `FormData` uploads), and auto-logs-out on `{isAuthenticated: false}` responses via a handler `AuthContext` registers with `setUnauthorizedHandler`. New fetch calls should use this instead of calling `fetch` directly.

## Environment

`.env` (git-ignored) holds `VITE_*` frontend vars and backend `DB_*`/`SESSION_SECRET` vars — see `.env.example` for the full list. Session cookies are `httpOnly` always, and `secure`/`sameSite` are driven by `NODE_ENV === 'production'`.
