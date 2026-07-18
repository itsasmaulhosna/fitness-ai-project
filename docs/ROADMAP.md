# Fitness Management Web Application — Roadmap

## Overview

This roadmap outlines a phased approach to delivering the Fitness Management Web Application from the current scaffold to a production-ready MVP and beyond. Each phase has clear deliverables, dependencies, and exit criteria.

**Estimated total MVP timeline:** 8–12 weeks (1–2 engineers)

---

## Phase 0: Planning & Foundation ✅ (Current)

**Duration:** 1 week  
**Status:** In Progress

### Deliverables

- [x] Project documentation (`/docs/`)
- [ ] Development environment setup guide
- [ ] MongoDB Atlas cluster provisioning
- [ ] Environment variable template (`.env.example`)
- [ ] Git branching strategy agreed upon

### Exit Criteria

- All planning documents reviewed and approved
- Database connection verified locally
- Team aligned on MVP scope

---

## Phase 1: Core Infrastructure

**Duration:** 1–2 weeks  
**Depends on:** Phase 0

### Goals

Establish the technical foundation that all features depend on.

### Deliverables

| Task | Priority | Details |
|------|----------|---------|
| MongoDB connection module | P0 | Singleton connection with retry logic in `lib/db.ts` |
| Mongoose models | P0 | User, Program (minimal schemas) |
| JWT auth utilities | P0 | Sign, verify, refresh token helpers |
| Auth middleware | P0 | Next.js middleware for route protection |
| API error handling | P0 | Standardized error responses and logging |
| Zod validation schemas | P1 | Shared request validation |
| Seed script | P1 | Sample programs and test user |

### Folder Setup

- Implement structure defined in [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
- Configure path aliases (`@/*`)
- Add shared UI primitives (Button, Input, Card)

### Exit Criteria

- User can register, login, logout via API
- Protected routes redirect unauthenticated users to `/login`
- Database read/write operations succeed in dev environment

---

## Phase 2: Public Experience

**Duration:** 2 weeks  
**Depends on:** Phase 1

### Goals

Ship the marketing and discovery experience for unauthenticated users.

### Deliverables

| Task | Priority | Route |
|------|----------|-------|
| Home page | P0 | `/` |
| Programs catalog | P0 | `/programs` |
| Program detail page | P0 | `/programs/[slug]` |
| Login / Register page | P0 | `/login` |
| Public layout (header, footer) | P0 | — |
| Program API (public read) | P0 | `GET /api/programs` |
| SEO metadata | P1 | All public pages |

### UI Milestones

- Responsive navigation with login CTA
- Program cards with image, title, difficulty, duration, price
- Program detail with curriculum outline and enroll button

### Exit Criteria

- Public pages render with seeded program data
- Program detail links work from catalog
- Unauthenticated enroll CTA redirects to login with return URL

---

## Phase 3: Member Dashboard & Enrollment

**Duration:** 2 weeks  
**Depends on:** Phase 2

### Goals

Enable authenticated users to enroll in programs and access their dashboard.

### Deliverables

| Task | Priority | Route |
|------|----------|-------|
| Dashboard overview | P0 | `/dashboard` |
| Checkout / enrollment flow | P0 | `/checkout` |
| Protected layout (sidebar nav) | P0 | — |
| Enrollment API | P0 | `POST /api/enrollments` |
| User profile (basic) | P1 | `/profile` |
| Dashboard widgets (placeholder) | P1 | — |

### User Stories

- As a logged-in user, I can enroll in a program from checkout
- As a logged-in user, I see my active programs on the dashboard
- As a logged-in user, I can update my name and fitness preferences

### Exit Criteria

- Full flow: browse program → login → checkout → dashboard shows enrollment
- JWT session persists across page refreshes
- Logout clears session

---

## Phase 4: Workout Management

**Duration:** 2 weeks  
**Depends on:** Phase 3

### Goals

Allow users to log, view, and manage workouts tied to their enrolled programs.

### Deliverables

| Task | Priority | Route |
|------|----------|-------|
| Workout list page | P0 | `/workouts` |
| Workout log form | P0 | `/workouts/new`, `/workouts/[id]` |
| Workout history | P0 | `/workouts` |
| Workout API (CRUD) | P0 | `/api/workouts/*` |
| Dashboard workout widget | P1 | `/dashboard` |
| Exercise library (static) | P2 | — |

### Exit Criteria

- User can create, edit, delete workout logs
- Workouts appear on dashboard for current day
- Workouts filterable by date and program

---

## Phase 5: Nutrition & Goal Tracking

**Duration:** 2 weeks  
**Depends on:** Phase 4

### Goals

Complete the core tracking features for holistic fitness management.

### Deliverables

| Task | Priority | Route |
|------|----------|-------|
| Nutrition logging | P0 | `/nutrition` |
| Daily macro summary | P0 | `/nutrition` |
| Goal CRUD | P0 | `/goals` |
| Goal progress visualization | P0 | `/goals`, `/dashboard` |
| Nutrition API | P0 | `/api/nutrition/*` |
| Goals API | P0 | `/api/goals/*` |
| Profile body metrics | P1 | `/profile` |

### Exit Criteria

- User can log meals with calories and macros
- User can create weight/body-fat/custom goals and update progress
- Dashboard displays nutrition and goal summary cards

---

## Phase 6: Polish, Testing & Launch Prep

**Duration:** 1–2 weeks  
**Depends on:** Phase 5

### Goals

Harden the application for production deployment.

### Deliverables

| Task | Priority |
|------|----------|
| End-to-end testing (Playwright) | P0 |
| API integration tests | P1 |
| Loading states and error boundaries | P0 |
| Empty states for all lists | P1 |
| Accessibility audit | P1 |
| Performance audit (Lighthouse) | P1 |
| Production deployment pipeline | P0 |
| Monitoring and error tracking (Sentry) | P2 |

### Exit Criteria

- All critical user flows pass E2E tests
- Lighthouse performance score ≥ 85 on public pages
- Deployed to staging with MongoDB Atlas production cluster

---

## Post-MVP Backlog (Phase 7+)

Prioritized for future iterations:

| Feature | Priority | Notes |
|---------|----------|-------|
| Stripe payment integration | High | Real checkout with subscriptions |
| Email notifications | High | Welcome, password reset, goal reminders |
| OAuth (Google, Apple) | Medium | Reduce registration friction |
| Admin dashboard | Medium | Program CRUD without seed scripts |
| Workout templates from programs | Medium | Pre-built workouts per program week |
| Social sharing / progress export | Low | Share goal achievements |
| Mobile PWA | Low | Offline workout logging |
| AI meal suggestions | Low | Requires external API |
| Trainer/coach role | Low | Multi-tenant expansion |

---

## Milestone Timeline (Gantt Summary)

```
Week   1    2    3    4    5    6    7    8    9   10   11   12
       ├────┤
Phase0 Planning
            ├────┤
Phase1 Infrastructure
                 ├────────┤
Phase2 Public Experience
                          ├────────┤
Phase3 Dashboard & Checkout
                                   ├────────┤
Phase4 Workouts
                                            ├────────┤
Phase5 Nutrition & Goals
                                                     ├────────┤
Phase6 Polish & Launch
```

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| MongoDB connection issues in serverless | High | Use connection pooling; `@mongodb-js/singleton` pattern |
| JWT cookie security misconfiguration | High | Security review checklist; HTTP-only + Secure + SameSite |
| Scope creep on checkout/payments | Medium | MVP enrollment-only; defer Stripe to Phase 7 |
| React 19 / Next.js 16 ecosystem gaps | Medium | Pin versions; monitor changelogs |
| Incomplete seed data blocks UI dev | Low | Parallel UI work with mock data layer |

---

## Definition of Done (Global)

A feature is considered done when:

1. Implementation matches acceptance criteria in [FEATURES.md](./FEATURES.md)
2. API contracts documented in [API_PLAN.md](./API_PLAN.md) are implemented
3. UI matches wireframes in [UI_PLAN.md](./UI_PLAN.md)
4. TypeScript compiles with no errors
5. ESLint passes
6. Manual QA on mobile and desktop viewports
7. No console errors in happy path

---

*Last updated: July 2026*
