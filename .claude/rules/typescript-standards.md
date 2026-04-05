---
description: Synechron TypeScript coding standards — core tooling, type safety, and architecture conventions
alwaysApply: true
---

# TypeScript Standards — Synechron

## Tooling (non-negotiable)
- **TypeScript:** v6.0+ (strict defaults, ES2025 target, ESM-first).
- **Linter/Formatter:** Biome v2+. Never generate ESLint or Prettier configs.
- **Package Manager:** pnpm with `strict-peer-dependencies=true` in `.npmrc`.
- **Test Runner:** Vitest (native ESM, TypeScript-first, Biome-compatible).
- **Runtime Validation:** Zod for all external boundaries (API inputs, env vars, parsed JSON).
- **Dependency Updates:** Renovate (grouped PRs, auto-merge patches).

## Type Safety
- `tsconfig.json` must set `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noImplicitReturns`.
- `erasableSyntaxOnly` is mandatory — the official TS docs recommend pairing it with `verbatimModuleSyntax`. It compiler-enforces the enum ban, blocks namespaces with runtime code, parameter properties, and `<>` type assertions. Enables Node.js native type stripping (v23.6+).
- `types` must be explicit (TS 6.0 defaults to `[]`). Use `"types": ["node"]` for Node.js — never rely on auto-inclusion of `@types/*`.
- Install `@total-typescript/ts-reset` — `JSON.parse`, `.json()`, and `.catch(e)` must resolve to `unknown`, not `any`.
- Never use `any`. Use `unknown` with narrowing or Zod schemas.
- Never use `as` type assertions (except `as const`). Use type predicates or schema validation.
- Never use non-null assertions (`!`). Narrow with conditionals or optional chaining.
- Use `import ... with { type: "json" }` for JSON imports — `assert` syntax is deprecated in TS 6.0.

## Architecture
- `type` over `interface` for all object shapes and unions.
- Ban `enum` — enforced at the compiler level via `erasableSyntaxOnly`. Use `as const` objects:
```typescript
const Status = { Active: 'active', Inactive: 'inactive' } as const;
type Status = (typeof Status)[keyof typeof Status];
```
- Prefer `readonly` properties and `ReadonlyArray<T>` for data objects.
- Use `undefined` for absent values. Reserve `null` for external API contracts only.
- Prefer named exports. Default exports break refactoring and auto-imports.
- Model state with discriminated unions, not boolean flags:
```typescript
type Request =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: ResponseData }
  | { status: 'error'; error: AppError };
```

## Error Handling
- Never swallow errors. Empty `catch` blocks are forbidden.
- Use typed `Error` subclasses with `cause` chaining:
```typescript
class AppError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
  }
}
```
- Await every Promise or explicitly handle with `.catch()` — no floating promises (enforced by Biome `noFloatingPromises`).
