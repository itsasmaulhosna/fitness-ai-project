# Fitness Management Web Application — API Plan

## Overview

This document defines the REST API for the Fitness Management Web Application. All endpoints are implemented as **Next.js Route Handlers** under `/client/src/app/api/`.

**Base URL:** `/api`  
**Content-Type:** `application/json`  
**Authentication:** Bearer token (`Authorization: Bearer <access_token>`) or HTTP-only cookie

---

## API Conventions

### Response Envelope

All successful responses follow this structure:

```typescript
{
  success: true,
  data: T,
  meta?: {
    page?: number,
    limit?: number,
    total?: number,
    totalPages?: number,
  }
}
```

### Error Envelope

```typescript
{
  success: false,
  error: {
    code: string,       // e.g., "VALIDATION_ERROR", "UNAUTHORIZED"
    message: string,    // Human-readable message
    details?: unknown   // Field-level errors for validation
  }
}
```

### HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Successful GET, PATCH, DELETE |
| 201 | Successful POST (resource created) |
| 400 | Validation error, malformed request |
| 401 | Missing or invalid authentication |
| 403 | Authenticated but not authorized |
| 404 | Resource not found |
| 409 | Conflict (duplicate email, duplicate enrollment) |
| 422 | Unprocessable entity (business rule violation) |
| 500 | Internal server error |

### Pagination Query Parameters

```
?page=1&limit=20&sort=-createdAt
```

### Authentication Header

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

For cookie-based auth (browser clients):

```
Cookie: accessToken=...; refreshToken=...
```

---

## Authentication Endpoints

### POST `/api/auth/register`

Create a new user account.

**Auth required:** No

**Request body:**

```typescript
{
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}
```

**Response (201):**

```typescript
{
  success: true,
  data: {
    user: UserPublic,
    accessToken: string,
    expiresIn: number,  // seconds
  }
}
```

**Errors:**

| Code | Status | Condition |
|------|--------|-----------|
| VALIDATION_ERROR | 400 | Invalid email, weak password, missing fields |
| EMAIL_EXISTS | 409 | Email already registered |

---

### POST `/api/auth/login`

Authenticate existing user.

**Auth required:** No

**Request body:**

```typescript
{
  email: string,
  password: string,
}
```

**Response (200):**

```typescript
{
  success: true,
  data: {
    user: UserPublic,
    accessToken: string,
    expiresIn: number,
  }
}
```

**Errors:**

| Code | Status | Condition |
|------|--------|-----------|
| INVALID_CREDENTIALS | 401 | Wrong email or password |
| VALIDATION_ERROR | 400 | Missing fields |

**Side effect:** Sets `refreshToken` HTTP-only cookie

---

### POST `/api/auth/logout`

Invalidate session.

**Auth required:** Yes

**Request body:** None

**Response (200):**

```typescript
{
  success: true,
  data: { message: "Logged out successfully" }
}
```

**Side effect:** Clears auth cookies; optionally blacklists refresh token

---

### POST `/api/auth/refresh`

Issue new access token using refresh token.

**Auth required:** Refresh token (cookie)

**Request body:** None

**Response (200):**

```typescript
{
  success: true,
  data: {
    accessToken: string,
    expiresIn: number,
  }
}
```

**Errors:**

| Code | Status | Condition |
|------|--------|-----------|
| INVALID_TOKEN | 401 | Expired or revoked refresh token |

---

## Program Endpoints

### GET `/api/programs`

List published programs with optional filters.

**Auth required:** No

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category |
| `difficulty` | string | Filter by difficulty |
| `featured` | boolean | Featured programs only |
| `search` | string | Text search on title/description |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 12, max: 50) |
| `sort` | string | Sort field (e.g., `price`, `-createdAt`) |

**Response (200):**

```typescript
{
  success: true,
  data: ProgramSummary[],
  meta: { page, limit, total, totalPages }
}
```

**ProgramSummary:**

```typescript
{
  id: string,
  slug: string,
  title: string,
  shortDescription: string,
  imageUrl: string,
  difficulty: string,
  category: string,
  durationWeeks: number,
  price: number,
  currency: string,
}
```

---

### GET `/api/programs/[slug]`

Get full program details.

**Auth required:** No

**Response (200):**

```typescript
{
  success: true,
  data: ProgramDetail
}
```

**ProgramDetail:** Full program object including `curriculum`, `requirements`, `faq`, `instructor`

**Errors:**

| Code | Status | Condition |
|------|--------|-----------|
| NOT_FOUND | 404 | Invalid slug or unpublished program |

---

## Enrollment Endpoints

### GET `/api/enrollments`

List current user's enrollments.

**Auth required:** Yes

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filter: `active`, `completed`, `cancelled` |

**Response (200):**

```typescript
{
  success: true,
  data: EnrollmentWithProgram[]
}
```

**EnrollmentWithProgram:**

```typescript
{
  id: string,
  status: string,
  enrolledAt: string,
  progress: { currentWeek: number, percentComplete: number },
  program: ProgramSummary,
}
```

---

### POST `/api/enrollments`

Enroll in a program.

**Auth required:** Yes

**Request body:**

```typescript
{
  programSlug: string,
}
```

**Response (201):**

```typescript
{
  success: true,
  data: EnrollmentWithProgram
}
```

**Errors:**

| Code | Status | Condition |
|------|--------|-----------|
| NOT_FOUND | 404 | Program not found |
| ALREADY_ENROLLED | 409 | User already enrolled in this program |

---

## Workout Endpoints

### GET `/api/workouts`

List user's workouts.

**Auth required:** Yes

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `date` | string | ISO date (single day filter) |
| `startDate` | string | Range start |
| `endDate` | string | Range end |
| `programId` | string | Filter by program |
| `page` | number | Pagination |
| `limit` | number | Pagination |

**Response (200):**

```typescript
{
  success: true,
  data: Workout[],
  meta: { page, limit, total, totalPages }
}
```

---

### POST `/api/workouts`

Create a workout log.

**Auth required:** Yes

**Request body:**

```typescript
{
  title: string,
  date: string,           // ISO date
  durationMinutes: number,
  notes?: string,
  programId?: string,
  exercises: {
    name: string,
    sets?: number,
    reps?: number,
    weight?: number,
    durationSeconds?: number,
    notes?: string,
  }[],
}
```

**Response (201):**

```typescript
{
  success: true,
  data: Workout
}
```

---

### GET `/api/workouts/[id]`

Get single workout.

**Auth required:** Yes (owner only)

**Response (200):** `{ success: true, data: Workout }`

**Errors:** 404 if not found or not owned by user

---

### PATCH `/api/workouts/[id]`

Update workout.

**Auth required:** Yes (owner only)

**Request body:** Partial workout fields

**Response (200):** `{ success: true, data: Workout }`

---

### DELETE `/api/workouts/[id]`

Delete workout.

**Auth required:** Yes (owner only)

**Response (200):** `{ success: true, data: { message: "Workout deleted" } }`

---

## Nutrition Endpoints

### GET `/api/nutrition`

List user's meals.

**Auth required:** Yes

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `date` | string | ISO date (required for daily view) |
| `startDate` | string | Range start |
| `endDate` | string | Range end |
| `mealType` | string | Filter by meal type |

**Response (200):**

```typescript
{
  success: true,
  data: {
    meals: Meal[],
    dailyTotals: {
      calories: number,
      protein: number,
      carbs: number,
      fat: number,
    },
    targets: NutritionTargets,  // from user profile
  }
}
```

---

### POST `/api/nutrition`

Log a meal.

**Auth required:** Yes

**Request body:**

```typescript
{
  mealType: "breakfast" | "lunch" | "dinner" | "snack",
  name: string,
  date: string,
  nutrition: {
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
  },
  servingSize?: string,
  notes?: string,
}
```

**Response (201):** `{ success: true, data: Meal }`

---

### PATCH `/api/nutrition/[id]`

Update meal.

**Auth required:** Yes (owner only)

**Response (200):** `{ success: true, data: Meal }`

---

### DELETE `/api/nutrition/[id]`

Delete meal.

**Auth required:** Yes (owner only)

**Response (200):** `{ success: true, data: { message: "Meal deleted" } }`

---

## Goal Endpoints

### GET `/api/goals`

List user's goals.

**Auth required:** Yes

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `status` | string | `active`, `completed`, `archived` |

**Response (200):**

```typescript
{
  success: true,
  data: Goal[]
}
```

---

### POST `/api/goals`

Create a goal.

**Auth required:** Yes

**Request body:**

```typescript
{
  title: string,
  type: "weight" | "body_fat" | "custom",
  unit: string,
  startValue: number,
  targetValue: number,
  currentValue?: number,    // defaults to startValue
  deadline?: string,
}
```

**Response (201):** `{ success: true, data: Goal }`

---

### GET `/api/goals/[id]`

Get goal with progress history.

**Auth required:** Yes (owner only)

**Response (200):** `{ success: true, data: Goal }`

---

### PATCH `/api/goals/[id]`

Update goal (title, target, deadline, status).

**Auth required:** Yes (owner only)

**Response (200):** `{ success: true, data: Goal }`

---

### DELETE `/api/goals/[id]`

Delete or archive goal.

**Auth required:** Yes (owner only)

**Response (200):** `{ success: true, data: { message: "Goal deleted" } }`

---

### POST `/api/goals/[id]/progress`

Log progress update.

**Auth required:** Yes (owner only)

**Request body:**

```typescript
{
  value: number,
  date?: string,    // defaults to now
  note?: string,
}
```

**Response (201):**

```typescript
{
  success: true,
  data: {
    goal: Goal,           // updated with new currentValue
    progressEntry: { date, value, note }
  }
}
```

**Side effect:** Updates `goal.currentValue`; auto-completes if target reached

---

## User Endpoints

### GET `/api/users/me`

Get current user profile.

**Auth required:** Yes

**Response (200):**

```typescript
{
  success: true,
  data: UserPublic
}
```

---

### PATCH `/api/users/me`

Update current user profile.

**Auth required:** Yes

**Request body (partial):**

```typescript
{
  firstName?: string,
  lastName?: string,
  avatarUrl?: string,
  profile?: {
    height?: number,
    weight?: number,
    age?: number,
    gender?: string,
    activityLevel?: string,
  },
  nutritionTargets?: {
    calories?: number,
    protein?: number,
    carbs?: number,
    fat?: number,
  },
  preferences?: {
    units?: "metric" | "imperial",
    timezone?: string,
  },
}
```

**Response (200):** `{ success: true, data: UserPublic }`

---

### POST `/api/users/me/password`

Change password.

**Auth required:** Yes

**Request body:**

```typescript
{
  currentPassword: string,
  newPassword: string,
}
```

**Response (200):** `{ success: true, data: { message: "Password updated" } }`

**Errors:**

| Code | Status | Condition |
|------|--------|-----------|
| INVALID_PASSWORD | 401 | Current password incorrect |
| VALIDATION_ERROR | 400 | New password too weak |

---

## Dashboard Aggregation Endpoint

### GET `/api/dashboard`

Aggregated dashboard data (optional convenience endpoint).

**Auth required:** Yes

**Response (200):**

```typescript
{
  success: true,
  data: {
    user: { firstName: string },
    todayWorkout: Workout | null,
    nutritionSummary: {
      consumed: { calories, protein, carbs, fat },
      targets: NutritionTargets,
    },
    activeGoals: Goal[],       // top 2 by deadline
    enrollments: EnrollmentWithProgram[],
    recentActivity: ActivityItem[],  // last 5 workouts + meals
  }
}
```

---

## Type Definitions

### UserPublic

```typescript
{
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  avatarUrl?: string,
  profile?: UserProfile,
  nutritionTargets?: NutritionTargets,
  preferences?: UserPreferences,
  createdAt: string,
}
```

### Workout

```typescript
{
  id: string,
  title: string,
  date: string,
  durationMinutes: number,
  notes?: string,
  programId?: string,
  exercises: Exercise[],
  status: string,
  createdAt: string,
  updatedAt: string,
}
```

### Meal

```typescript
{
  id: string,
  mealType: string,
  name: string,
  date: string,
  nutrition: { calories, protein, carbs, fat },
  servingSize?: string,
  notes?: string,
  createdAt: string,
}
```

### Goal

```typescript
{
  id: string,
  title: string,
  type: string,
  unit: string,
  startValue: number,
  targetValue: number,
  currentValue: number,
  progressPercent: number,
  deadline?: string,
  status: string,
  progressLog: { date: string, value: number, note?: string }[],
  createdAt: string,
}
```

---

## Rate Limiting (Post-MVP)

| Endpoint Group | Limit |
|----------------|-------|
| Auth (login/register) | 10 req/min per IP |
| Read endpoints | 100 req/min per user |
| Write endpoints | 30 req/min per user |

---

## API Versioning

MVP uses unversioned `/api/*` paths. Future breaking changes will introduce `/api/v2/*` with deprecation notices on v1.

---

## OpenAPI / Swagger (Post-MVP)

Generate OpenAPI 3.1 spec from Zod schemas for:
- Developer documentation
- Client SDK generation
- API testing in CI

---

*Last updated: July 2026*
