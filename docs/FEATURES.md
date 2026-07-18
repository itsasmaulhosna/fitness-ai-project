# Fitness Management Web Application — Features

## Document Purpose

This document defines functional requirements, user stories, and acceptance criteria for each feature area. It is the source of truth for scope during implementation and QA.

---

## Feature Matrix

| Feature Area | MVP | Public | Protected | Priority |
|--------------|-----|--------|-----------|----------|
| Home / Landing | ✅ | ✅ | — | P0 |
| Program Catalog | ✅ | ✅ | — | P0 |
| Program Details | ✅ | ✅ | — | P0 |
| Authentication (JWT) | ✅ | ✅ | — | P0 |
| Dashboard | ✅ | — | ✅ | P0 |
| Checkout / Enrollment | ✅ | — | ✅ | P0 |
| Workout Management | ✅ | — | ✅ | P0 |
| Nutrition Tracking | ✅ | — | ✅ | P0 |
| Goal Tracking | ✅ | — | ✅ | P0 |
| User Profile | ✅ | — | ✅ | P1 |
| Payment Processing | ❌ | — | — | Post-MVP |
| Admin Panel | ❌ | — | — | Post-MVP |

---

## 1. Home / Landing Page

### Description

The public entry point showcasing the platform value proposition, featured programs, testimonials, and calls to action.

### User Stories

- As a visitor, I want to understand what the platform offers within seconds.
- As a visitor, I want to browse featured programs without creating an account.
- As a visitor, I want a clear path to sign up or log in.

### Functional Requirements

- Hero section with headline, subheadline, primary CTA (Browse Programs), secondary CTA (Get Started)
- Featured programs section (max 3–6 cards from database)
- Value proposition section (3 pillars: Track, Achieve, Transform)
- Social proof section (testimonials — static content for MVP)
- Footer with links to Programs, Login, legal placeholders

### Acceptance Criteria

- [ ] Page loads without authentication
- [ ] Featured programs fetched from API or static fallback
- [ ] All CTAs navigate to correct routes
- [ ] Responsive layout from 320px to 1920px
- [ ] Page title and meta description set for SEO

---

## 2. Program Catalog

### Description

Searchable, filterable listing of all available fitness programs.

### User Stories

- As a visitor, I want to see all available programs in a grid layout.
- As a visitor, I want to filter programs by difficulty and category.
- As a visitor, I want to click a program to view full details.

### Functional Requirements

- Grid of program cards displaying: thumbnail, title, short description, difficulty, duration (weeks), price
- Filters: difficulty (Beginner, Intermediate, Advanced), category (Strength, Cardio, Hybrid, Nutrition)
- Sort: newest, price (low/high), duration
- Pagination or infinite scroll (12 programs per page)
- Empty state when no programs match filters

### Acceptance Criteria

- [ ] Programs load from `GET /api/programs`
- [ ] Filters update URL query params for shareable links
- [ ] Card click navigates to `/programs/[slug]`
- [ ] Loading skeleton displayed during fetch

---

## 3. Program Details

### Description

Full program information page enabling informed enrollment decisions.

### User Stories

- As a visitor, I want to read detailed program information before enrolling.
- As a visitor, I want to see pricing and what's included.
- As a logged-in user, I want to proceed directly to checkout.

### Functional Requirements

- Program hero: image, title, difficulty badge, duration, price
- Sections: Overview, What You'll Learn, Weekly Breakdown, Requirements, FAQ
- Instructor/coach info (name, bio — optional for MVP)
- Sticky CTA bar: "Enroll Now" (redirects to login if unauthenticated, checkout if authenticated)
- Related programs section (same category, max 3)

### Acceptance Criteria

- [ ] Page accessible at `/programs/[slug]`
- [ ] Returns 404 for invalid slug
- [ ] Enroll CTA preserves return URL through login flow
- [ ] Open Graph meta tags populated from program data

---

## 4. Authentication (JWT)

### Description

Secure user registration, login, logout, and session management using JSON Web Tokens.

### User Stories

- As a new user, I want to create an account with email and password.
- As a returning user, I want to log in and stay signed in across sessions.
- As a user, I want to log out securely.
- As a user attempting to access protected content, I want to be redirected to login.

### Functional Requirements

#### Registration

- Fields: email, password, confirm password, first name, last name
- Validation: valid email format, password ≥ 8 characters, passwords match
- Duplicate email returns 409 Conflict
- On success: issue tokens, redirect to dashboard or return URL

#### Login

- Fields: email, password
- Invalid credentials return generic error (no email enumeration)
- On success: issue access + refresh tokens

#### Session Management

- Access token expiry: 15 minutes (configurable)
- Refresh token expiry: 7 days (configurable)
- Refresh endpoint rotates tokens
- Middleware protects `/dashboard`, `/checkout`, `/workouts`, `/nutrition`, `/goals`, `/profile`

#### Logout

- Clears auth cookies
- Invalidates refresh token (optional blacklist collection)

### Acceptance Criteria

- [ ] Register creates user in MongoDB with hashed password
- [ ] Login returns valid JWT
- [ ] Protected routes redirect to `/login?redirect=/original-path`
- [ ] Expired access token refreshed automatically (client-side)
- [ ] Logout clears session; subsequent protected access redirects to login

---

## 5. Dashboard

### Description

Authenticated user's home base showing daily summary and quick actions.

### User Stories

- As a member, I want to see today's workout plan at a glance.
- As a member, I want to see my nutrition progress for the day.
- As a member, I want to track goal progress without navigating away.
- As a member, I want quick links to log workouts and meals.

### Functional Requirements

#### Layout

- Welcome header with user name and current date
- Summary cards row:
  - **Today's Workout** — scheduled or last logged workout
  - **Nutrition** — calories consumed vs. target (progress ring)
  - **Active Goals** — top 2 goals with progress bars
- Active enrollments section — program cards with progress percentage
- Quick actions: Log Workout, Log Meal, View Goals
- Recent activity feed (last 5 workouts/meals)

### Acceptance Criteria

- [ ] Only accessible when authenticated
- [ ] Data aggregated from workouts, nutrition, goals APIs
- [ ] Empty states for users with no data yet
- [ ] Quick action buttons navigate to correct forms

---

## 6. Checkout / Enrollment

### Description

Flow for enrolling in a selected fitness program. MVP focuses on enrollment confirmation without payment gateway.

### User Stories

- As a logged-in user, I want to review program details before confirming enrollment.
- As a logged-in user, I want to confirm enrollment and access program content.
- As a logged-in user, I cannot enroll twice in the same program.

### Functional Requirements

- URL: `/checkout?program=[slug]` or `/checkout/[programSlug]`
- Order summary: program name, price, duration
- User info pre-filled from profile
- Terms acceptance checkbox
- Confirm enrollment button
- Success state with redirect to dashboard
- Duplicate enrollment prevention

### Acceptance Criteria

- [ ] Unauthenticated access redirects to login with return URL
- [ ] Invalid program slug shows error
- [ ] Successful enrollment creates record in `enrollments` collection
- [ ] User sees enrolled program on dashboard
- [ ] Already-enrolled users see informational message instead of re-enrolling

---

## 7. Workout Management

### Description

Create, read, update, and delete workout logs with exercises, sets, reps, and duration.

### User Stories

- As a member, I want to log a completed workout with exercises and sets.
- As a member, I want to view my workout history by date.
- As a member, I want to edit or delete a logged workout.
- As a member, I want workouts associated with my enrolled program (optional).

### Functional Requirements

#### Workout Log

- Fields: title, date, duration (minutes), notes, program (optional dropdown)
- Exercises array: name, sets, reps, weight (optional), duration (optional)
- Quick-add from exercise library (static list for MVP)
- Save as draft vs. complete (optional — P2)

#### Workout List

- List view grouped by date (today, yesterday, this week, earlier)
- Filter by program, date range
- Click to view/edit detail

#### Workout Detail

- Read-only view with edit/delete actions
- Exercise breakdown table

### Acceptance Criteria

- [ ] CRUD operations via `/api/workouts`
- [ ] User can only access their own workouts
- [ ] Workout appears on dashboard after creation
- [ ] Delete requires confirmation modal

---

## 8. Nutrition Tracking

### Description

Daily meal logging with calorie and macronutrient tracking.

### User Stories

- As a member, I want to log meals with nutritional information.
- As a member, I want to see daily calorie and macro totals vs. my targets.
- As a member, I want to copy meals from previous days.

### Functional Requirements

#### Meal Log

- Fields: meal type (breakfast, lunch, dinner, snack), name, date/time
- Nutrition: calories, protein (g), carbs (g), fat (g)
- Optional: serving size, notes

#### Daily Summary

- Progress rings/bars for calories, protein, carbs, fat
- Targets from user profile (defaults if not set)
- Meal list for selected date with edit/delete

#### Date Navigation

- Date picker to view previous days
- "Today" quick jump button

### Acceptance Criteria

- [ ] CRUD via `/api/nutrition`
- [ ] Daily totals calculated correctly
- [ ] Dashboard nutrition widget reflects today's data
- [ ] Macro targets editable in profile

---

## 9. Goal Tracking

### Description

Set measurable fitness goals and track progress over time with visual charts.

### User Stories

- As a member, I want to create goals with a target value and deadline.
- As a member, I want to log progress updates toward my goals.
- As a member, I want to see visual progress on a chart.
- As a member, I want to mark a goal as completed or archive it.

### Functional Requirements

#### Goal Types

- Weight (kg/lbs)
- Body fat percentage
- Custom numeric (e.g., "Run 100km", "100 pushups")

#### Goal Fields

- Title, type, start value, target value, current value, unit, deadline, status (active, completed, archived)

#### Progress Updates

- Log entry: date, value, note
- Auto-update current value on log
- Progress percentage calculated: `(current - start) / (target - start) * 100`

#### Visualization

- Line chart of progress over time (last 30 entries)
- Progress bar on goal card

### Acceptance Criteria

- [ ] CRUD via `/api/goals`
- [ ] Progress log creates entry in `goalProgress` sub-collection or embedded array
- [ ] Completed goals show celebration state
- [ ] Dashboard shows top 2 active goals

---

## 10. User Profile

### Description

Manage personal information, body metrics, nutrition targets, and account settings.

### User Stories

- As a member, I want to update my name and profile photo.
- As a member, I want to set my daily calorie and macro targets.
- As a member, I want to record baseline body metrics.
- As a member, I want to change my password.

### Functional Requirements

#### Profile Sections

- **Personal Info:** first name, last name, email (read-only), avatar URL
- **Body Metrics:** height, weight, age, gender, activity level
- **Nutrition Targets:** daily calories, protein, carbs, fat
- **Preferences:** units (metric/imperial), timezone
- **Security:** change password (current + new + confirm)

#### Avatar

- URL input for MVP (file upload post-MVP)

### Acceptance Criteria

- [ ] Profile loads current user data from `GET /api/users/me`
- [ ] Updates persist via `PATCH /api/users/me`
- [ ] Password change requires current password verification
- [ ] Nutrition targets reflected in nutrition tracking page

---

## Cross-Cutting Features

### Navigation

- **Public nav:** Logo, Programs, Login / Sign Up
- **Protected nav:** Logo, Dashboard, Workouts, Nutrition, Goals, Profile, Logout
- Mobile: hamburger menu with slide-out drawer

### Notifications (MVP)

- Inline form validation errors
- Toast notifications for success/error actions
- No push/email notifications in MVP

### Error Handling

- 404 page for unknown routes
- 401 redirect to login
- 500 friendly error page
- API errors displayed via toast with user-friendly messages

### Loading States

- Skeleton loaders for lists and cards
- Button loading spinners during form submission
- Page-level loading.tsx for route transitions

---

## Out of Scope (MVP)

- Payment processing (Stripe)
- Email verification and password reset emails
- OAuth / social login
- Admin program management UI
- File uploads (avatars, program images — use URLs)
- Real-time features (WebSockets)
- Multi-language support
- Native mobile apps

---

*Last updated: July 2026*
