# Vercel Deployment Standards

## Hosting

- This project is deployed to Vercel via GitHub integration.
- The `main` branch auto-deploys to production. PRs generate preview deployments.
- This is a static Vite site — no server-side functions or SSR.

## Analytics

- `@vercel/analytics` is installed and must be initialised in the client entry point.
- Do not remove the analytics import or initialisation call.

## Configuration

- No `vercel.json` is required — Vite is auto-detected by Vercel.
- If a `vercel.json` or `vercel.ts` is added, it must not override the auto-detected Vite framework preset unless there is a specific reason.
- Environment variables that need to differ per environment (preview vs production) must be managed via `vercel env`, not committed to the repo.

## Build

- The Vercel build command is `npm run build` (runs `vite build`).
- Output directory is `dist/`.
- Do not add framework-specific Vercel packages (e.g. `@vercel/next`) — this is not a Next.js project.

## Dependencies

- `@vercel/analytics` is a production dependency.
- `vercel/vercel-plugin` is a Claude Code plugin, not a runtime dependency.
