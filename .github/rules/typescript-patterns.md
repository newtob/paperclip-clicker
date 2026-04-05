---
description: TypeScript code patterns and anti-patterns with concrete examples
globs: "**/*.ts,**/*.tsx"
alwaysApply: false
---

# TypeScript Patterns

## Function Signatures
- Explicit return types on all exported functions.
- For expected failures, prefer a `Result` type over thrown exceptions:
```typescript
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
```

## Type Narrowing (never use `as`)
```typescript
// BAD — runtime crash waiting to happen
const user = data as User;

// GOOD — validated at the boundary
const user = UserSchema.parse(data);

// GOOD — type predicate for domain logic
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

## Discriminated Unions over Boolean Flags
```typescript
// BAD — ambiguous states, easy to mishandle
type Request = { isLoading: boolean; isError: boolean; data?: Data; error?: Error };

// GOOD — each state is explicit and exhaustively checkable
type Request =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: AppError };
```

## Immutable Parameters
```typescript
// BAD — mutates caller's data
function process(items: string[]) {
  items.push('new');
}

// GOOD — returns new data, input is readonly
function process(items: ReadonlyArray<string>): string[] {
  return [...items, 'new'];
}
```

## Async Error Handling
```typescript
// BAD — swallowed error, untyped catch
try { await fetchData(); } catch (e) {}

// GOOD — logged, re-thrown with cause chain
try {
  await fetchData();
} catch (error) {
  logger.error('Data fetch failed', { error });
  throw new AppError('Data fetch failed', { cause: error });
}
```

## Imports (NodeNext)
- With `module: "NodeNext"`, ESM imports **must** include `.js` extensions — even for `.ts` source files. The TS docs state this is the only correct approach for Node.js:
```typescript
// BAD — will crash at runtime under NodeNext ESM
import { helper } from './utils';

// GOOD — required by Node.js module resolution
import { helper } from './utils.js';

// GOOD — JSON imports require the `with` attribute
import config from './config.json' with { type: 'json' };
```
- Ensure `package.json` has `"type": "module"` for ESM projects.
- Use `import type` for type-only imports (enforced by `verbatimModuleSyntax`):
```typescript
import type { User } from './types.js';
```

## Module Boundaries
- Validate all external data at entry points using Zod.
- Co-locate schema with its inferred type — never hand-duplicate:
```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});
type User = z.infer<typeof UserSchema>;
```

## Environment Variables
- Validate at startup, not scattered through code. Use Zod or `@t3-oss/env-core`:
```typescript
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});
export const env = EnvSchema.parse(process.env);
```

## Naming Conventions
- Files: `kebab-case.ts` (e.g. `user-service.ts`).
- Types/Classes: `PascalCase`. Schemas: `PascalCaseSchema` (e.g. `UserSchema`).
- Functions/variables: `camelCase`. Constants: `UPPER_SNAKE_CASE`.
- Boolean variables: prefix with `is`, `has`, `should` (e.g. `isActive`).
