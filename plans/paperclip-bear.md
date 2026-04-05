# paperclip-bear: Implementation Plan

## Context

Build a simple web clicker game called "paperclip-bear" targeted at 9-year-olds for 5-10 minutes of fun. The repo already has `tsconfig.json` (TS 6.0+, strict, ESM) and `biome.json` (Biome v2+) configured. The game uses TypeScript with vite. No framework should be used, just vanilla typescript + vite.

Create the entire game, including documentation in the `readme.md`.

---

## Project Structure

```
paperclip-clicker/
  package.json          (new)
  .npmrc                (new - strict-peer-dependencies=true)
  index.html            (new - Vite entry)
  vite.config.ts        (new)
  src/
    main.ts             (entry point - wires state + renderer)
    types.ts            (Level, GameState types)
    levels.ts           (20-level device table, as const)
    colors.ts           (20 background hex colours, as const)
    game-state.ts       (pure state functions: click, buy, win check)
    renderer.ts         (DOM setup, event binding, visual updates)
    paperclip-svg.ts    (programmatic SVG creation)
    styles.ts           (inject <style> element with all CSS)
    __tests__/
      game-state.test.ts
      levels.test.ts
      colors.test.ts
```

---

## Screen layout

The simple web game's single screen starts with a styalised outline of a single paperclip. The screen includes a title "paperclip-bear" on top, center aligned, and the number of paperclips at the bottom, starting at 0. On level 1, each click of the paperclip adds one to the scope.

The level number is at the top right corner.

The game screen should be optimised for 1080p and mobile screen resolution: 1792 by 828.

## Full 20-Level Device Table

| Lvl | Device | Cost | Clips/Click |
| ----- | -------- | ------ | ------------- |
| 1 | paperclip | 0 (start) | 1 |
| 2 | stapler | 50 | 3 |
| 3 | double stapler | 200 | 6 |
| 4 | quad stapler | 600 | 12 |
| 5 | stable conveyor stamper | 2,000 | 24 |
| 6 | turbo hole puncher | 5,000 | 48 |
| 7 | rocket-powered binder | 10,000 | 96 |
| 8 | laser paper slicer | 17,000 | 180 |
| 9 | tornado cabinet stamper | 30,000 | 350 |
| 10 | magnetic desk monster | 52,000 | 650 |
| 11 | rainbow staple cannon | 94,000 | 1,200 |
| 12 | atomic sticky note | 168,000 | 2,200 |
| 13 | volcano ink fountain | 290,000 | 4,000 |
| 14 | hypersonic eraser beam | 510,000 | 7,200 |
| 15 | gravity-defying clipboard | 920,000 | 13,000 |
| 16 | time-travelling staple remover | 1,580,000 | 23,000 |
| 17 | interdimensional paper shredder | 2,780,000 | 42,000 |
| 18 | supernova hurricane stamp | 4,800,000 | 75,000 |
| 19 | universe-folding origami crane | 8,400,000 | 135,000 |
| 20 | the almighty bear of paperclips | 14,700,000 | 250,000 |

Each level requires ~50-125 clicks at current rate. At 2-3 clicks/sec, total playtime is ~6-8 minutes.

Each level's central image needs created in the style of the game. Starting with a simple outline, each levels central image of the device needs to get wilder and more powerful.

The final level, 20, auto clicks at a rate of 3333/second.

---

## Background Colour Progression (pale grey -> rainbow)

```
 1: #f0f0f0  (pale grey)        11: #30d8b0  (teal)
 2: #e8e8f0  (grey-blue hint)   12: #40e880  (green)
 3: #e0e0f8  (light lavender)   13: #80f040  (lime)
 4: #d8d0ff  (soft violet)      14: #c0f030  (yellow-green)
 5: #d0c0ff  (light purple)     15: #f0e020  (yellow)
 6: #c8b0ff  (medium purple)    16: #ffb820  (amber)
 7: #b090ff  (blue-violet)      17: #ff8830  (orange)
 8: #8080ff  (blue)             18: #ff5040  (red-orange)
 9: #60a0ff  (sky blue)         19: #ff3060  (hot pink)
10: #40c0e0  (cyan)             20: #ff20ff  (magenta)
```

Background transitions smoothly via CSS `transition: background-color 300ms ease`.
The final level, 20, should be based on magenta but include a multicolour explosion to prepresent the biggest and most epic level.

---

## Architecture

### State (pure, no DOM)
- `GameState = { readonly clips: number; readonly currentLevel: number }`
- `game-state.ts` exports pure functions: `createInitialState`, `handleClick`, `canBuyNextDevice`, `buyNextDevice`, `isGameComplete`, `getCurrentLevel`
- All return new `GameState` (immutable updates)

### Rendering (DOM only)
- `renderer.ts` creates DOM structure: title -> SVG -> upgrade button -> counter
- `RendererApi` type holds element references (no repeated DOM queries)
- `updateRenderer()` syncs DOM to current state: counter text, background colour, upgrade button visibility/label, win state

### Wiring (main.ts)
- Single mutable `let state: GameState` -- the only mutable binding
- Click SVG -> `state = handleClick(state, LEVELS)` -> `updateRenderer()`
- Click upgrade -> `state = buyNextDevice(state, LEVELS)` -> `updateRenderer()`
- Win state shows "You win!" message with colour-cycling CSS animation

### SVG
- Programmatic SVG creation (no innerHTML) -- stylised paperclip outline
- Hover: `transform: scale(1.1)` with 150ms transition
- Click: brief "squish" animation via toggled CSS class

---

## Dependencies

```json
{
  "type": "module",
  "devDependencies": {
    "vite": "^6",
    "typescript": "^6",
    "@biomejs/biome": "^2",
    "vitest": "^3",
    "zod": "^3",
    "@total-typescript/ts-reset": "^0.6"
  }
}
```

---

## Implementation Order

1. Scaffolding: `package.json`, `.npmrc`, `vite.config.ts`, `index.html` -> `pnpm install`
2. Types: `types.ts`
3. Data: `levels.ts`, `colors.ts`
4. Logic: `game-state.ts`
5. Tests: `game-state.test.ts`, `levels.test.ts`, `colors.test.ts`
6. Visuals: `paperclip-svg.ts`, `styles.ts`
7. Rendering: `renderer.ts`
8. Entry: `main.ts`
9. Manual play-test and tuning

---

## Verification

1. `pnpm typecheck` -- `tsc --noEmit`, zero errors
2. `pnpm lint` -- `biome check .`, zero violations
3. `pnpm test` -- Vitest unit tests:
   - game-state: click increments, buy deducts cost + advances level, win at level 20
   - levels: exactly 20 entries, costs strictly increasing, clips/click strictly increasing
   - colors: exactly 20 entries, all valid hex `#rrggbb`
4. `pnpm dev` -- manual play-through: title visible, SVG clickable, counter works, upgrades appear at thresholds, background transitions, win state at level 20, ~6-8 min total
5. `pnpm build` + `pnpm preview` -- production bundle works
