# Broker2Broker

> **Work in progress.** This project is under active development. Core features work, but several sections are still being built (marked ** In development** below), and the code has not yet been through a security hardening pass. It is not production-ready.

A **B2B web platform for real-estate brokers**: verified professionals share property listings with each other, build networks of trusted partners ("associates"), and control exactly who can see each listing.

My first attempt at an enterprise-level application, built with a **React** front end and a layered **Node.js / Express** back end, with **MySQL** for data and **Valkey (Redis)** for sessions.

## Features

### Accounts and access
| Feature | Status |
|---|---|
| Broker registration with business details (business name, tax ID/AFM, area of operation, contact info) and username availability check | ✅ |
| **Admin approval:** new accounts stay pending until an administrator approves or declines the registration request | ✅ |
| Login and logout with **Passport.js** sessions stored in **Valkey/Redis**, passwords hashed with **bcrypt** | ✅ |
| Role-based routing: pending, declined, restricted, no active plan, member, admin and super admin | ✅ |
| Admin panel for pending, approved and declined registration requests | ✅ |
| Admin home / dashboard |  In development |

### Properties
| Feature | Status |
|---|---|
| **Multi-step listing form:** property type, location, size and rooms, features, heating and energy class, price (sale or rent), photos, visibility, review and submit | ✅ |
| Multiple photo upload per property, with preview and a cover ("hero") image | ✅ |
| Property cards, details view with image slider and full specification table | ✅ |
| Edit your own listings | ✅ |
| **Visibility levels** for each listing: Private, Associates, Public | ✅ |
| Region-based visibility (share with brokers operating in the same region) |  In development |
| My properties, associates' properties and favourites pages | ✅ |
| Property counters (total / for sale / for rent) on profiles | ✅ |
| Property alerts |  In development |

### Broker network
| Feature | Status |
|---|---|
| Search brokers by business name | ✅ |
| Public broker profiles with profile picture and their listings | ✅ |
| **Association requests:** send, cancel, accept, decline; remove an associate | ✅ |
| Associates list on your profile | ✅ |
| Notifications (e.g. for new association requests) | In development (UI shell only) |

### Platform
| Feature | Status |
|---|---|
| Subscription plans and pricing page | In development |
| Subscription management in the profile |  In development |
| User dashboard |  In development |
| Landing page and About page |  In development |
| Server-side role enforcement and upload validation (security hardening) |  In development |
| Database schema / migration script in the repository |  In development |

## Tech stack

| Layer | Technologies |
|---|---|
| Front end | React 19, Vite, React Router 7, React Select, React Slick |
| Back end | Node.js, Express 5, Passport (local strategy), express-session, Multer |
| Data | MySQL (`mysql2`, parameterized queries), Valkey/Redis session store (`connect-redis`, Valkey GLIDE) |
| Security | bcrypt password hashing, session-based authentication, role-based authorization middleware |

## Architecture

```
React SPA (Vite, :5173)
   │  fetch() with session cookie
   ▼
Express API (:3000)
   ├── /api/user       registration, login, profiles, admin approvals, associations
   └── /api/property   listings, images, visibility, favourites
          │
   routes → controller → service → repository
          │                              │
   Passport session ◄── Valkey/Redis     └──► MySQL
```

The back end is split into **modules** (`user`, `property`). Each one has:

| Layer | Responsibility |
|---|---|
| `*.routes.js` | Endpoints and middleware (authentication, admin checks, uploads) |
| `*.controller.js` | Reads the request and sends the response |
| `*.service.js` | Business rules |
| `*.repository.js` | SQL queries |

On the front end, each feature has its own **React context** (auth, user profile, associates, property form, registration requests…) and **route guards** (`PrivateRoute`, `AdminRoute` and role-based routes) send users to the right place depending on their account status.

```
src/
├── BackEnd/
│   ├── server.js               # Express app, sessions, Passport, routers
│   ├── dbconfig.js             # MySQL connection pool (settings from .env)
│   ├── valkeyClient.js         # Valkey/Redis client for sessions
│   ├── Modules/
│   │   ├── user/               # routes / controller / service / repository
│   │   └── property/
│   ├── utils/                  # auth middleware, Passport strategy, Multer config, helpers
│   └── imageUploads/           # uploaded profile and property images
└── FrontEnd/
    ├── routes/                 # pages (Home, Profile, Properties, Auth, Pricing…)
    ├── components/             # reusable components and context providers
    └── utils/
```

## Running locally

### Requirements
- Node.js 20+
- MySQL 8
- Valkey or Redis on `localhost:6379`

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Database:** create a MySQL database. The schema script isn't in the repository yet (). The app uses the tables `users`, `registrationrequests`, `subscriptions`, `properties`, `propertyimages`, `favourites`, `associates` and `associationrequests`.

3. **Session store:** start Valkey (or Redis) on port `6379`.

4. **Environment:** copy `.env.example` to `.env` and fill it in. It holds the front-end API URLs (`VITE_*`) and the back-end settings: database connection (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) and `SESSION_SECRET`. `.env` is git-ignored, so credentials stay on your machine.

5. **Start both servers** in two terminals:
   ```bash
   npm run start    # Express API on http://localhost:3000
   npm run react    # React app on http://localhost:5173
   ```

## Roadmap

- Security hardening: server-side role checks, stricter data filtering, upload validation
- Region-based visibility
- Subscription plans and payments
- Notifications and property alerts
- User and admin dashboards
- Landing page, About page, and database schema scripts

---

Built by **Dimitris Kourkoutas**.
