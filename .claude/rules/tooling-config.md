---
description: Configuration standards for biome.json, tsconfig.json, and Renovate
globs: "biome.json,biome.jsonc,tsconfig*.json,renovate.json"
alwaysApply: false
---

# Tooling Configuration Standards

## biome.json
- Schema must reference Biome v2+ (`https://biomejs.dev/schemas/2.x.x/schema.json`).
- Set `"root": true` at the top level.
- Use `assist.actions.source.organizeImports` — the v1 `organizeImports` key was removed in v2.
- Define `files.ignore` for `dist/`, `build/`, `coverage/`, `.next/`.
- Enable linter domains for cross-file analysis:
  - `project: "recommended"` — catches undeclared dependencies, import cycles, private imports.
  - `test: "recommended"` — catches focused/skipped tests, duplicate hooks.
  - `types: "all"` — enables type-aware rules (`noFloatingPromises`, `noMisusedPromises`).
  - Framework domains (`react`, `next`, `solid`, `vue`) auto-detect from `package.json` — configure explicitly only when overriding.
- Required error-level rules beyond `recommended`:
  - `correctness`: `noUnusedVariables`, `noUnusedImports`
  - `suspicious`: `noExplicitAny`, `noArrayIndexKey`
  - `style`: `noNonNullAssertion`, `useConst`
  - `performance`: `noAccumulatingSpread`
  - `nursery`: `noFloatingPromises`, `noMisusedPromises`

## tsconfig.json (TypeScript 6.0+)
- TS 6.0 defaults `strict: true`, `module: "esnext"`, `target: "es2025"`, `types: []` — set all explicitly for clarity.
- **`types` must be set explicitly** (TS 6.0 breaking change). Use `["node"]` for Node.js, add `"jest"` or framework types as needed. Never use `["*"]` in production.
- Required flags beyond strict: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `forceConsistentCasingInFileNames`.
- `erasableSyntaxOnly` + `verbatimModuleSyntax` must be paired (per official TS docs). Together they enforce the enum ban and enable Node.js type stripping.
- `module`/`moduleResolution`: `NodeNext` for Node.js; `ESNext`/`Bundler` for frontend with Vite/webpack.
- `DOM.Iterable` lib is no longer needed — TS 6.0 folds it into `DOM`.
- `baseUrl` is deprecated in TS 6.0 — use explicit paths in `paths` entries instead.
- Do not exclude test files from the root tsconfig — tests must be type-checked.
- Use a separate `tsconfig.build.json` extending the base with `"exclude": ["**/*.test.ts", "**/*.spec.ts"]` for emit-only builds.

## renovate.json
- Extend `config:recommended`.
- Group non-major updates. Auto-merge minor/patch for devDependencies.
- Pin Biome and TypeScript to exact versions.
