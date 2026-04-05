---
description: Pre-commit hooks, CI/CD security gates, and dependency management configuration
alwaysApply: true
---

# Security Pipeline

## Pre-Commit Hooks (Husky + lint-staged)

Setup: `pnpm add -D husky lint-staged && pnpm exec husky init`

### .husky/pre-commit
```bash
pnpm exec lint-staged
pnpm exec gitleaks protect --staged --redact
```

### lint-staged config (package.json)
```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["biome check --write --unsafe"],
    "*.{json,css,md}": ["biome format --write"]
  }
}
```

### .husky/pre-push
```bash
pnpm exec tsc --noEmit
pnpm exec vitest run
```

## CI/CD Gates (GitHub Actions)

Every PR must pass before merge:

| Gate | Tool | Purpose |
|------|------|---------|
| Lint + Format | `biome ci` | Zero tolerance on style/lint violations |
| Type Check | `tsc --noEmit` | Full type integrity |
| Unit Tests | `vitest run --coverage` | Correctness + coverage threshold |
| SAST | Semgrep | Vulnerability pattern detection |
| SCA | Trivy (`fs` mode) | Dependency CVE scanning against `pnpm-lock.yaml` |
| Secrets | TruffleHog | Deep repo scan for credential leaks |
| Licence | Trivy licence scan | OSS licence compliance |

## Renovate (renovate.json)
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended", "group:allNonMajor", ":automergeMinor"],
  "packageRules": [
    { "matchDepTypes": ["devDependencies"], "automerge": true },
    { "matchPackagePatterns": ["@biomejs/*"], "groupName": "biome", "pinVersions": true }
  ]
}
```

## Secrets Management
- Never commit `.env` files. Add `.env*` to `.gitignore` (allow `.env.example` with dummy values).
- Use `@t3-oss/env-core` or Zod to validate environment variables at startup — fail fast, not at runtime.
- CI secrets go in GitHub Actions secrets / vault, never in workflow YAML.
