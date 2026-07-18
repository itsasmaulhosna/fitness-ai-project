# Fitness Management Web Application — Project Overview

## Executive Summary

The Fitness Management Web Application is a modern, full-stack platform that helps users discover fitness programs, manage workouts, track nutrition, set and monitor goals, and maintain a personal health profile. The product combines a public marketing and catalog experience with a protected member area for day-to-day fitness management.

This document defines the product vision, technical foundation, and architectural direction for the project. It serves as the primary reference for stakeholders, designers, and engineers before implementation begins.

---

## Product Vision

**Mission:** Empower individuals to take control of their fitness journey through an intuitive, data-driven web application that connects program discovery with personalized tracking and progress visualization.

**Target Users:**

| Persona | Description | Primary Needs |
|---------|-------------|---------------|
| **Prospective Member** | Browsing programs before signing up | Program catalog, pricing, program details, easy registration |
| **Active Member** | Enrolled in one or more programs | Dashboard, workout logging, nutrition tracking, goal progress |
| **Returning User** | Wants quick access to daily tasks | Fast login, resume where they left off, profile management |

**Core Value Propositions:**

1. **Discover** — Browse curated fitness programs with clear descriptions, duration, and difficulty.
2. **Track** — Log workouts, meals, and body metrics in one unified dashboard.
3. **Achieve** — Set measurable goals and visualize progress over time.
4. **Manage** — Maintain profile, preferences, and subscription/enrollment status.

---

## Current Project State

As of initial planning, the repository contains:

- **Root:** `/fitness/` — monorepo-style layout with documentation and the client application.
- **Client:** `/fitness/client/` — Next.js 16 application scaffolded via `create-next-app`.
- **Implemented:** Root layout, empty home page, Tailwind CSS 4, TypeScript strict mode, Geist fonts.
- **Not yet implemented:** Authentication, MongoDB integration, API routes, protected routes, feature modules.

The application is in **Phase 0 (Planning & Foundation)**. All feature work is defined in companion documents within `/docs/`.

---

## Technology Stack

| Layer | Technology | Version (Target) | Purpose |
|-------|------------|------------------|---------|
| Framework | Next.js (App Router) | 16.x | Full-stack React framework, SSR/SSG, API routes |
| Language | TypeScript | 5.x | Type safety across frontend and backend |
| Styling | Tailwind CSS | 4.x | Utility-first responsive UI |
| Runtime UI | React | 19.x | Component model |
| Database | MongoDB | 7.x+ | Document store for users, programs, logs |
| ODM | Mongoose | Latest stable | Schema validation, queries, middleware |
| Authentication | JWT | — | Stateless token-based auth (access + refresh) |
| Password Hashing | bcrypt | — | Secure credential storage |
| Validation | Zod | — | Request/response and form validation |
| HTTP Client | Native fetch / SWR or TanStack Query | TBD | Client-side data fetching |

### Environment Variables (Planned)

```env
MONGODB_URI=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Architecture Overview

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
│  (Public Pages │ Protected Pages │ Client Components)           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────────────┐
│                    Next.js 16 Application                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ App Router   │  │ Middleware   │  │ API Routes (/api/*)      │ │
│  │ (RSC + Pages)│  │ (Auth Guard) │  │ Route Handlers         │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ Server       │  │ Auth Layer   │  │ Service / Repository     │ │
│  │ Components   │  │ (JWT verify) │  │ Layer                    │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                         MongoDB                                 │
│  users │ programs │ enrollments │ workouts │ meals │ goals       │
└─────────────────────────────────────────────────────────────────┘
```

### Architectural Principles

1. **Colocation by feature** — Group related pages, components, hooks, and types by domain (auth, workouts, nutrition, etc.).
2. **Server-first data access** — Prefer Server Components and server-side data fetching for initial page loads; use client fetching for interactive updates.
3. **Thin API routes, fat services** — Route handlers validate input and delegate to service modules; business logic does not live in route files.
4. **JWT in HTTP-only cookies** — Store refresh tokens in HTTP-only cookies; access tokens may be in memory or short-lived cookies to mitigate XSS.
5. **Progressive enhancement** — Public pages should be SEO-friendly with static or ISR where possible.
6. **Fail securely** — Protected routes and APIs return 401/403 without leaking resource existence.

---

## Route Map

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page, hero, featured programs, CTA |
| `/programs` | Programs | Searchable/filterable program catalog |
| `/programs/[slug]` | Program Details | Full program info, pricing, enroll CTA |
| `/login` | Login | Email/password login and registration link |

### Protected Routes

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Overview: today's workout, nutrition summary, goal progress |
| `/checkout` | Checkout | Program enrollment and payment flow (MVP: enrollment confirmation) |
| `/workouts` | Workouts | Workout list, logging, history |
| `/nutrition` | Nutrition | Meal logging, daily macro summary |
| `/goals` | Goals | Goal CRUD and progress charts |
| `/profile` | Profile | User settings, body metrics, preferences |

> **Note:** Workouts, Nutrition, Goals, and Profile are implied by the feature set and will be linked from the dashboard navigation even though the initial route list specified Dashboard and Checkout as protected routes.

---

## Authentication Strategy

### Flow

1. User registers or logs in via `/api/auth/register` or `/api/auth/login`.
2. Server validates credentials, issues JWT access token (short-lived) and refresh token (long-lived).
3. Tokens stored: refresh in HTTP-only cookie; access in memory or secure cookie.
4. Next.js middleware intercepts requests to protected routes, validates JWT, redirects to `/login` if invalid.
5. API routes use a shared `authenticateRequest()` utility to extract and verify the user from the Authorization header or cookie.

### Security Considerations

- Password minimum length and complexity rules
- Rate limiting on auth endpoints (future)
- CSRF protection for cookie-based auth
- Token rotation on refresh
- Logout clears cookies and optionally blacklists refresh tokens

---

## Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | LCP < 2.5s on 4G; API p95 < 300ms for reads |
| **Accessibility** | WCAG 2.1 AA target for all user-facing pages |
| **Responsive** | Mobile-first; breakpoints at sm/md/lg/xl |
| **SEO** | Public pages indexed; meta tags and Open Graph |
| **Scalability** | Stateless API; MongoDB indexed queries |
| **Maintainability** | Strict TypeScript; ESLint; consistent folder conventions |

---

## Document Index

| Document | Purpose |
|----------|---------|
| [ROADMAP.md](./ROADMAP.md) | Phased delivery timeline and milestones |
| [FEATURES.md](./FEATURES.md) | Detailed feature specifications and acceptance criteria |
| [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) | Codebase organization and naming conventions |
| [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) | MongoDB collections, fields, indexes, relationships |
| [API_PLAN.md](./API_PLAN.md) | REST API endpoints, request/response contracts |
| [UI_PLAN.md](./UI_PLAN.md) | Page layouts, components, design system, UX flows |

---

## Success Metrics (Post-Launch)

- User registration conversion from program detail page
- Daily active users logging at least one workout or meal
- Goal completion rate within target timeframe
- Average session duration on dashboard
- Checkout/enrollment completion rate

---

## Open Decisions

The following items require stakeholder input before implementation:

1. **Payment provider** — Stripe, Paddle, or enrollment-only MVP without payment?
2. **Social login** — Google/Apple OAuth in v1 or deferred?
3. **Admin panel** — Separate admin app for program CRUD or seed scripts only?
4. **Deployment target** — Vercel + MongoDB Atlas (recommended) or self-hosted?
5. **Email service** — Transactional email for password reset (Resend, SendGrid)?

---

*Last updated: July 2026*
*Status: Planning — No application features implemented*
