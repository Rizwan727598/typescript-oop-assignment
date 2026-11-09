# Combining Union and Intersection Types in TypeScript

## Introduction

I used to create a separate type for every user role in my projects, and my type definitions kept growing. Then I learned that TypeScript's **Union (`|`)** and **Intersection (`&`)** types solve this in a much cleaner way.

A union lets a value be _one of_ several types. An intersection combines several types into _one_.

## The Practical Use Case

Here's an example from a dashboard I built recently:

### Code Example

```typescript
interface User {
  name: string;
  email: string;
}

interface Admin {
  role: string;
  permissions: string[];
}

type UserRole = User & Admin; // Must have ALL properties

const admin: UserRole = {
  name: "Rizwan",
  email: "rizwan@example.com",
  role: "Admin",
  permissions: ["Create", "Update", "Delete"],
};

type Account = UserRole | string; // Can be EITHER

const account1: Account = admin;
const account2: Account = "Guest";
```

The intersection `UserRole` **must** contain every property from both `User` and `Admin` — miss one, and TypeScript complains. That strictness is the whole point.

The union `Account` is the opposite: it accepts either a full `UserRole` object or a plain string, so I don't need to duplicate the object shape.

## A Gotcha Worth Knowing

Intersections don't just merge objects — they also merge _constraints_. `string & number` becomes `never` (impossible), not some hybrid. This caught me off guard the first time I tried it with primitives.

## Conclusion

Union gives flexibility; intersection gives structure. I now reach for them whenever my types start feeling repetitive — it's cleaner than duplicating shapes and much safer than falling back to `any`.
