# AGENTS.md

This file provides context for AI agents working on this project.

## Project Overview

Paperclip Bear is a browser-based clicker game built with vanilla TypeScript and Vite. It targets children around age 9 for 5-10 minutes of gameplay.

## Deployment

- **Platform:** Vercel
- **Method:** GitHub integration — pushes to `main` auto-deploy to production
- **Analytics:** `@vercel/analytics` is installed for client-side page view and web vitals tracking
- **Claude Code Plugin:** `vercel/vercel-plugin` is installed for Vercel-aware AI assistance

## Tech Stack

- Vanilla TypeScript 6.0+ (no framework)
- Vite for dev server and bundling
- Biome v2+ for linting and formatting
- Vitest for testing
- pnpm / npm for package management

## Key Conventions

- See `.claude/rules/` for detailed TypeScript, tooling, and security standards
- ESM-only (`"type": "module"` in package.json)
- Strict TypeScript — no `any`, no `as` assertions, no enums
- Biome for all linting/formatting — never ESLint or Prettier
