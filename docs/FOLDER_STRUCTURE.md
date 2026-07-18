# Fitness Management Web Application — Folder Structure

## Overview

This document defines the planned directory layout for the Fitness Management Web Application. The Next.js application lives in `/client/` at the repository root. All paths below are relative to `/client/` unless noted.

The structure follows Next.js App Router conventions with feature-based organization for components, hooks, and services.

---

## Repository Root

```
fitness/
├── client/                    # Next.js 16 application
├── docs/                      # Project documentation (this folder)
│   ├── PROJECT_OVERVIEW.md
│   ├── ROADMAP.md
│   ├── FEATURES.md
│   ├── FOLDER_STRUCTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_PLAN.md
│   └── UI_PLAN.md
├── .gitignore
└── README.md                  # Root readme with setup instructions
```

---

## Client Application Structure

```
client/
├── public/
│   ├── images/
│   │   ├── programs/          # Program thumbnails (or CDN URLs)
│   │   └── placeholders/
│   └── icons/
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (public)/          # Route group: no auth required
│   │   │   ├── layout.tsx     # Public layout (header + footer)
│   │   │   ├── page.tsx       # Home (/)
│   │   │   ├── programs/
│   │   │   │   ├── page.tsx   # Program catalog (/programs)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Program details
│   │   │   └── login/
│   │   │       └── page.tsx   # Login & register
│   │   │
│   │   ├── (protected)/       # Route group: auth required
│   │   │   ├── layout.tsx     # Protected layout (sidebar nav)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx   # ?program=slug query param
│   │   │   ├── workouts/
│   │   │   │   ├── page.tsx   # Workout list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── nutrition/
│   │   │   │   └── page.tsx
│   │   │   ├── goals/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/               # API Route Handlers
│   │   │   ├── auth/
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts
│   │   │   │   └── refresh/
│   │   │   │       └── route.ts
│   │   │   ├── programs/
│   │   │   │   ├── route.ts           # GET list
│   │   │   │   └── [slug]/
│   │   │   │       └── route.ts         # GET single
│   │   │   ├── enrollments/
│   │   │   │   └── route.ts
│   │   │   ├── workouts/
│   │   │   │   ├── route.ts           # GET, POST
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts         # GET, PATCH, DELETE
│   │   │   ├── nutrition/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── goals/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       └── progress/
│   │   │   │           └── route.ts
│   │   │   └── users/
│   │   │       └── me/
│   │   │           └── route.ts
│   │   │
│   │   ├── layout.tsx         # Root layout (fonts, globals)
│   │   ├── globals.css        # Tailwind imports + CSS variables
│   │   ├── loading.tsx        # Global loading UI
│   │   ├── error.tsx          # Global error boundary
│   │   └── not-found.tsx      # 404 page
│   │
│   ├── components/
│   │   ├── ui/                # Primitive UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── progress.tsx
│   │   │   └── select.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── public-header.tsx
│   │   │   ├── public-footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── page-header.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── auth-guard.tsx
│   │   │
│   │   ├── programs/
│   │   │   ├── program-card.tsx
│   │   │   ├── program-grid.tsx
│   │   │   ├── program-filters.tsx
│   │   │   ├── program-hero.tsx
│   │   │   └── program-curriculum.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── welcome-header.tsx
│   │   │   ├── summary-card.tsx
│   │   │   ├── workout-widget.tsx
│   │   │   ├── nutrition-widget.tsx
│   │   │   ├── goals-widget.tsx
│   │   │   └── activity-feed.tsx
│   │   │
│   │   ├── workouts/
│   │   │   ├── workout-list.tsx
│   │   │   ├── workout-card.tsx
│   │   │   ├── workout-form.tsx
│   │   │   └── exercise-row.tsx
│   │   │
│   │   ├── nutrition/
│   │   │   ├── meal-list.tsx
│   │   │   ├── meal-form.tsx
│   │   │   ├── macro-summary.tsx
│   │   │   └── date-picker.tsx
│   │   │
│   │   ├── goals/
│   │   │   ├── goal-list.tsx
│   │   │   ├── goal-card.tsx
│   │   │   ├── goal-form.tsx
│   │   │   └── progress-chart.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── profile-form.tsx
│   │   │   ├── body-metrics-form.tsx
│   │   │   ├── nutrition-targets-form.tsx
│   │   │   └── change-password-form.tsx
│   │   │
│   │   └── checkout/
│   │       ├── order-summary.tsx
│   │       └── enrollment-form.tsx
│   │
│   ├── lib/
│   │   ├── db.ts              # MongoDB connection singleton
│   │   ├── auth/
│   │   │   ├── jwt.ts         # Sign, verify tokens
│   │   │   ├── password.ts    # bcrypt hash/compare
│   │   │   ├── cookies.ts     # Set/clear auth cookies
│   │   │   └── middleware.ts  # authenticateRequest helper
│   │   ├── api/
│   │   │   ├── response.ts    # Standardized API responses
│   │   │   └── errors.ts      # AppError class, error codes
│   │   └── utils/
│   │       ├── cn.ts          # clsx + tailwind-merge
│   │       ├── format.ts      # Date, number formatting
│   │       └── constants.ts   # App-wide constants
│   │
│   ├── models/                # Mongoose schemas
│   │   ├── user.model.ts
│   │   ├── program.model.ts
│   │   ├── enrollment.model.ts
│   │   ├── workout.model.ts
│   │   ├── meal.model.ts
│   │   └── goal.model.ts
│   │
│   ├── services/              # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── program.service.ts
│   │   ├── enrollment.service.ts
│   │   ├── workout.service.ts
│   │   ├── nutrition.service.ts
│   │   ├── goal.service.ts
│   │   └── user.service.ts
│   │
│   ├── hooks/                 # Client-side React hooks
│   │   ├── use-auth.ts
│   │   ├── use-toast.ts
│   │   └── use-media-query.ts
│   │
│   ├── types/                 # Shared TypeScript types
│   │   ├── auth.types.ts
│   │   ├── program.types.ts
│   │   ├── workout.types.ts
│   │   ├── nutrition.types.ts
│   │   ├── goal.types.ts
│   │   └── api.types.ts
│   │
│   ├── validations/           # Zod schemas
│   │   ├── auth.schema.ts
│   │   ├── program.schema.ts
│   │   ├── workout.schema.ts
│   │   ├── nutrition.schema.ts
│   │   ├── goal.schema.ts
│   │   └── user.schema.ts
│   │
│   └── middleware.ts          # Next.js edge middleware (route protection)
│
├── scripts/
│   └── seed.ts                # Database seed script
│
├── .env.example
├── .env.local                 # Local secrets (gitignored)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

---

## Directory Conventions

### App Router (`src/app/`)

| Convention | Rule |
|------------|------|
| Route groups | `(public)` and `(protected)` organize layouts without affecting URLs |
| Page files | Always `page.tsx` — one default export per route |
| Loading | `loading.tsx` co-located with routes that fetch data |
| API routes | `route.ts` exports named HTTP method handlers (`GET`, `POST`, etc.) |
| Dynamic segments | `[slug]`, `[id]` for parameterized routes |

### Components (`src/components/`)

| Convention | Rule |
|------------|------|
| File naming | kebab-case: `program-card.tsx` |
| Export | Named export for components: `export function ProgramCard()` |
| UI primitives | Generic, reusable — no business logic in `ui/` |
| Feature components | Domain-specific — may use hooks and call APIs |
| Server vs Client | Add `"use client"` only when needed (interactivity, hooks) |

### Library Code (`src/lib/`, `src/services/`, `src/models/`)

| Layer | Responsibility |
|-------|----------------|
| `models/` | Mongoose schema definitions only |
| `services/` | Business logic, database queries, orchestration |
| `lib/auth/` | Token and password utilities (no HTTP) |
| `lib/api/` | HTTP response helpers used by route handlers |
| `validations/` | Zod schemas shared by API routes and forms |

### Types (`src/types/`)

- Shared interfaces used across client and server
- API request/response types
- Do not duplicate Mongoose document types — derive or extend as needed

---

## Path Aliases

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

**Usage examples:**

```typescript
import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import type { Program } from "@/types/program.types";
```

---

## File Naming Reference

| Item | Convention | Example |
|------|------------|---------|
| React components | kebab-case.tsx | `workout-form.tsx` |
| Utilities | kebab-case.ts | `format-date.ts` |
| Models | kebab-case.model.ts | `user.model.ts` |
| Services | kebab-case.service.ts | `auth.service.ts` |
| Types | kebab-case.types.ts | `workout.types.ts` |
| Schemas (Zod) | kebab-case.schema.ts | `auth.schema.ts` |
| API routes | route.ts | `src/app/api/auth/login/route.ts` |
| Hooks | use-kebab-case.ts | `use-auth.ts` |

---

## Middleware Placement

`src/middleware.ts` runs on the Edge runtime and matches protected route patterns:

```typescript
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout/:path*",
    "/workouts/:path*",
    "/nutrition/:path*",
    "/goals/:path*",
    "/profile/:path*",
  ],
};
```

---

## Environment Files

| File | Purpose | Committed |
|------|---------|-----------|
| `.env.example` | Template with all required keys | Yes |
| `.env.local` | Local development secrets | No |
| `.env.production` | Production overrides (if not using platform env) | No |

---

## Planned Dependencies (To Add)

```json
{
  "dependencies": {
    "mongoose": "^8",
    "bcryptjs": "^2",
    "jsonwebtoken": "^9",
    "zod": "^3",
    "clsx": "^2",
    "tailwind-merge": "^2",
    "date-fns": "^4",
    "recharts": "^2"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2",
    "@types/jsonwebtoken": "^9",
    "tsx": "^4"
  }
}
```

---

## Migration from Current Scaffold

The existing project has a flat `src/app/` structure. Migration steps:

1. Create route groups `(public)` and `(protected)` and move `page.tsx` into `(public)/`
2. Add `src/middleware.ts` for auth
3. Create `lib/`, `models/`, `services/`, `components/` directories
4. Install planned dependencies
5. Add `.env.example` with MongoDB and JWT variables
6. Implement folder structure incrementally per [ROADMAP.md](./ROADMAP.md) phases

---

*Last updated: July 2026*
