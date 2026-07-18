# Fitness Management Web Application — Database Schema

## Overview

This document defines the MongoDB database design for the Fitness Management Web Application. The database uses **MongoDB** with **Mongoose** ODM for schema validation, middleware, and type-safe queries.

**Database name:** `fitness_app` (configurable via connection string)

---

## Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────────┐       ┌─────────────┐
│    User     │──────<│   Enrollment    │>──────│   Program   │
└─────────────┘       └─────────────────┘       └─────────────┘
      │                                                 │
      │ 1:N                                             │
      ▼                                                 │
┌─────────────┐                                         │
│   Workout   │─────────────────────────────────────────┘ (optional FK)
└─────────────┘

┌─────────────┐       ┌─────────────┐
│    User     │──────<│    Meal     │
└─────────────┘       └─────────────┘

┌─────────────┐       ┌─────────────┐
│    User     │──────<│    Goal     │
└─────────────┘       └─────────────┘
                            │
                            │ 1:N (embedded)
                            ▼
                      ┌─────────────┐
                      │GoalProgress │
                      └─────────────┘
```

---

## Collections Summary

| Collection | Description | Estimated Documents (Year 1) |
|------------|-------------|------------------------------|
| `users` | Registered user accounts and profiles | 10K |
| `programs` | Fitness program catalog | 50 |
| `enrollments` | User-program enrollment records | 25K |
| `workouts` | User workout logs | 500K |
| `meals` | User meal/nutrition logs | 1M |
| `goals` | User fitness goals with progress | 50K |
| `refreshTokens` | JWT refresh token blacklist (optional) | 100K |

---

## Collection: `users`

Stores user account credentials and profile information.

### Schema

```typescript
{
  _id: ObjectId,
  email: string,              // unique, lowercase, indexed
  passwordHash: string,       // bcrypt hash, never returned in API
  firstName: string,
  lastName: string,
  avatarUrl?: string,

  profile: {
    height?: number,          // cm (metric) — convert in UI if imperial
    weight?: number,          // kg
    age?: number,
    gender?: "male" | "female" | "other" | "prefer_not_to_say",
    activityLevel?: "sedentary" | "light" | "moderate" | "active" | "very_active",
  },

  nutritionTargets: {
    calories: number,           // default: 2000
    protein: number,            // grams, default: 150
    carbs: number,              // grams, default: 250
    fat: number,                // grams, default: 65
  },

  preferences: {
    units: "metric" | "imperial",  // default: "metric"
    timezone: string,                 // default: "UTC"
  },

  role: "user" | "admin",     // default: "user"

  createdAt: Date,
  updatedAt: Date,
}
```

### Indexes

```javascript
{ email: 1 }  // unique
```

### Validation Rules

- `email`: required, valid email format, unique
- `passwordHash`: required on create (set via registration, never from client)
- `firstName`, `lastName`: required, 1–50 characters
- `nutritionTargets.*`: positive numbers

### Notes

- Password is hashed with bcrypt (cost factor 12) before storage
- API responses use a `UserPublic` type excluding `passwordHash`
- Admin role reserved for future admin panel

---

## Collection: `programs`

Fitness programs available for enrollment.

### Schema

```typescript
{
  _id: ObjectId,
  slug: string,               // unique, URL-safe, indexed
  title: string,
  shortDescription: string,   // max 200 chars, for cards
  description: string,        // full markdown or HTML overview
  imageUrl: string,

  difficulty: "beginner" | "intermediate" | "advanced",
  category: "strength" | "cardio" | "hybrid" | "nutrition",
  durationWeeks: number,
  price: number,              // in cents (e.g., 4999 = $49.99)
  currency: string,           // default: "USD"

  curriculum: [
    {
      week: number,
      title: string,
      description: string,
      workouts: string[],     // workout template names/descriptions
    }
  ],

  requirements: string[],     // e.g., ["Dumbbells", "Yoga mat"]
  faq: [
    {
      question: string,
      answer: string,
    }
  ],

  instructor?: {
    name: string,
    bio: string,
    imageUrl?: string,
  },

  featured: boolean,          // show on home page
  published: boolean,         // visible in catalog
  sortOrder: number,          // manual ordering

  createdAt: Date,
  updatedAt: Date,
}
```

### Indexes

```javascript
{ slug: 1 }                           // unique
{ published: 1, featured: -1 }        // home page query
{ published: 1, category: 1 }         // filter by category
{ published: 1, difficulty: 1 }       // filter by difficulty
{ title: "text", shortDescription: "text" }  // full-text search (optional)
```

---

## Collection: `enrollments`

Links users to programs they have enrolled in.

### Schema

```typescript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users, indexed
  programId: ObjectId,        // ref: programs, indexed
  programSlug: string,        // denormalized for quick lookup

  status: "active" | "completed" | "cancelled",  // default: "active"
  enrolledAt: Date,
  completedAt?: Date,

  progress: {
    currentWeek: number,      // default: 1
    percentComplete: number,  // 0–100, default: 0
  },

  createdAt: Date,
  updatedAt: Date,
}
```

### Indexes

```javascript
{ userId: 1, programId: 1 }   // unique compound — prevent duplicate enrollment
{ userId: 1, status: 1 }      // user's active enrollments
{ programId: 1 }              // enrollment count per program
```

---

## Collection: `workouts`

User workout logs.

### Schema

```typescript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users, indexed
  programId?: ObjectId,       // ref: programs (optional)
  enrollmentId?: ObjectId,    // ref: enrollments (optional)

  title: string,
  date: Date,                 // workout date (indexed with userId)
  durationMinutes: number,
  notes?: string,

  exercises: [
    {
      name: string,
      sets?: number,
      reps?: number,
      weight?: number,        // kg or lbs based on user preference
      durationSeconds?: number,
      notes?: string,
    }
  ],

  status: "completed" | "in_progress",  // default: "completed"

  createdAt: Date,
  updatedAt: Date,
}
```

### Indexes

```javascript
{ userId: 1, date: -1 }       // user's workouts by date
{ userId: 1, programId: 1 }   // workouts per program
```

### Notes

- `date` stored as UTC midnight or full timestamp depending on UX needs
- Exercises embedded (not separate collection) for MVP simplicity

---

## Collection: `meals`

User nutrition/meal logs.

### Schema

```typescript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users, indexed

  mealType: "breakfast" | "lunch" | "dinner" | "snack",
  name: string,
  date: Date,                 // meal date/time

  nutrition: {
    calories: number,
    protein: number,          // grams
    carbs: number,            // grams
    fat: number,              // grams
  },

  servingSize?: string,       // e.g., "1 cup", "200g"
  notes?: string,

  createdAt: Date,
  updatedAt: Date,
}
```

### Indexes

```javascript
{ userId: 1, date: -1 }                    // daily meal queries
{ userId: 1, date: 1, mealType: 1 }        // meals grouped by type per day
```

### Aggregation Example (Daily Totals)

```javascript
db.meals.aggregate([
  { $match: { userId: ObjectId("..."), date: { $gte: startOfDay, $lte: endOfDay } } },
  { $group: {
      _id: null,
      totalCalories: { $sum: "$nutrition.calories" },
      totalProtein: { $sum: "$nutrition.protein" },
      totalCarbs: { $sum: "$nutrition.carbs" },
      totalFat: { $sum: "$nutrition.fat" },
  }}
])
```

---

## Collection: `goals`

User fitness goals with embedded progress history.

### Schema

```typescript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: users, indexed

  title: string,
  type: "weight" | "body_fat" | "custom",
  unit: string,               // e.g., "kg", "lbs", "%", "km"

  startValue: number,
  targetValue: number,
  currentValue: number,

  deadline?: Date,
  status: "active" | "completed" | "archived",  // default: "active"

  progressLog: [
    {
      date: Date,
      value: number,
      note?: string,
    }
  ],

  createdAt: Date,
  updatedAt: Date,
}
```

### Indexes

```javascript
{ userId: 1, status: 1 }      // active goals for dashboard
{ userId: 1, createdAt: -1 }  // all goals by recency
```

### Computed Fields (Application Layer)

```typescript
progressPercent = ((currentValue - startValue) / (targetValue - startValue)) * 100
isCompleted = status === "completed" || progressPercent >= 100
```

---

## Collection: `refreshTokens` (Optional)

Token blacklist for logout and security rotation.

### Schema

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  token: string,              // hashed refresh token
  expiresAt: Date,            // TTL index
  createdAt: Date,
}
```

### Indexes

```javascript
{ token: 1 }                  // unique
{ expiresAt: 1 }, { expireAfterSeconds: 0 }  // TTL — auto-delete expired
```

---

## Data Relationships

| From | To | Cardinality | Join Strategy |
|------|-----|-------------|---------------|
| User | Enrollment | 1:N | `enrollment.userId` |
| Program | Enrollment | 1:N | `enrollment.programId` |
| User | Workout | 1:N | `workout.userId` |
| Program | Workout | 1:N (optional) | `workout.programId` |
| User | Meal | 1:N | `meal.userId` |
| User | Goal | 1:N | `goal.userId` |

### Referential Integrity

MongoDB does not enforce foreign keys. Application layer must:

- Validate `programId` exists before creating enrollment
- Validate `userId` matches authenticated user on all writes
- Cascade considerations: deleting a user should delete enrollments, workouts, meals, goals (or soft-delete)

---

## Seed Data Plan

Initial seed script (`scripts/seed.ts`) will populate:

### Programs (5 sample)

| Slug | Title | Difficulty | Category | Weeks | Price |
|------|-------|------------|----------|-------|-------|
| `strength-foundation` | Strength Foundation | Beginner | Strength | 8 | $49.99 |
| `hiit-burn` | HIIT Burn Program | Intermediate | Cardio | 6 | $39.99 |
| `hybrid-athlete` | Hybrid Athlete | Advanced | Hybrid | 12 | $79.99 |
| `nutrition-reset` | 30-Day Nutrition Reset | Beginner | Nutrition | 4 | $29.99 |
| `marathon-prep` | Marathon Prep | Advanced | Cardio | 16 | $99.99 |

### Test User

```
email: demo@fitness.app
password: Demo1234!
```

---

## Migration Strategy

1. **Version 0 → 1:** Initial schema creation via Mongoose models
2. **Future migrations:** Use `migrate-mongo` or custom migration scripts in `/scripts/migrations/`
3. **Schema changes:** Additive changes preferred; breaking changes require migration script

---

## Backup & Retention

| Policy | Recommendation |
|--------|----------------|
| Backup frequency | Daily automated (MongoDB Atlas) |
| Retention | 30 days rolling |
| PII handling | Email is PII; support account deletion (GDPR) |
| Log retention | Workout/meal logs retained until user deletion |

---

## Performance Considerations

- Index all foreign key fields (`userId`, `programId`)
- Paginate list queries (default limit: 20, max: 100)
- Use projection to exclude heavy fields (e.g., `curriculum` on program list)
- Consider read replicas for analytics queries post-MVP
- Embedded arrays (`exercises`, `progressLog`) limited to reasonable sizes (<100 entries); archive if needed

---

*Last updated: July 2026*
