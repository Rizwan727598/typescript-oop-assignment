# Type Narrowing in TypeScript

I had a function that took `string | number`, and I kept trying to call `.toUpperCase()` on it. TypeScript kept showing an error. The fix was just one `typeof` check.

That's **narrowing** — convincing the compiler that a value of a union type is actually one specific type at a certain point in your code.

Here are the three operators I actually use.

## 1. `typeof` — for primitives

This is the one I reach for 90% of the time. If your union contains primitives like `string`, `number`, or `boolean`, this is usually all you need.

### Code Example

```typescript
const formatValue = (value: string | number): string => {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  return value.toFixed(2);
};
```

Inside the `if` block, TypeScript knows that `value` is a string. Outside it, TypeScript knows it's a number. No type casting is needed.

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

One thing to remember is that `instanceof` doesn't work on primitive values. For example, `"hello" instanceof String` returns `false`. This confused me the first time.

## 3. `in` — for object shapes

Useful when two interfaces have similar structures but differ in a particular property.

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

## A Few Things to Watch Out For

One thing I learned is that `typeof null` returns `"object"` instead of `"null"`. It's a JavaScript behavior, not a TypeScript issue, but it's important to remember when working with type guards.

If `null` is part of a union type, always check `value === null` before relying on `typeof`.

Another thing to watch out for is the `in` operator. It can throw an error if you use it with `null` or `undefined`, so make sure to check for those cases first.

These small checks can help prevent unexpected errors and make your code safer.

## Conclusion

That's really it. Narrowing is just showing the compiler what you already know. Pick the right operator, and TypeScript gets out of your way.
