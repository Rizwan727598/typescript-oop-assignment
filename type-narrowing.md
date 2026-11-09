# Type Narrowing in TypeScript

I had a function that took `string | number` and I kept trying to call `.toUpperCase()` on it. TypeScript kept yelling. The fix was one `typeof` check.

That's narrowing — convincing the compiler that a value of a union type is actually one specific type at a certain point in your code.

Here's the three operators I actually use.

## 1. `typeof` — for primitives

This is the one I reach for 90% of the time. If your union is primitives like `string`, `number`, or `boolean`, this is all you need.

### Code Example

```typescript
const formatValue = (value: string | number): string => {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  return value.toFixed(2);
};
```

Inside the `if`, TypeScript knows `value` is a string. Outside, it's a number. No casting.

## 2. `instanceof` — for class instances

I don't use this much, but when I do, it's usually for handling different error types or event objects.

### Code Example

```typescript
class NetworkError {
  retry(): void {}
}

class ValidationError {
  fields(): string[] {
    return [];
  }
}

const handleError = (error: NetworkError | ValidationError): void => {
  if (error instanceof NetworkError) {
    error.retry();
  } else {
    console.log(error.fields());
  }
};
```

Note that it doesn't work on primitives — `"hello" instanceof String` is `false`. Confused me the first time.

## 3. `in` — for object shapes

Useful when two interfaces overlap but differ in one key.

### Code Example

```typescript
interface SuccessResponse {
  status: "ok";
  data: string;
}

interface ErrorResponse {
  status: "error";
  message: string;
}

const handleResponse = (res: SuccessResponse | ErrorResponse): void => {
  if ("data" in res) {
    console.log(res.data);
  } else {
    console.log(res.message);
  }
};
```

## The Gotcha Everyone Hits

`typeof null === "object"`. If `null` can be in your union, check it first with `value === null`.

And `in` throws on `null` or `undefined`, so guard those too.

## Conclusion

That's really it. Narrowing is just showing the compiler what you already know. Pick the right operator, and TypeScript gets out of your way.
