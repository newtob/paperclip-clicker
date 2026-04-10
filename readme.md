# paperclip-bear

A simple clicker game where you click paperclips and upgrade through 20 increasingly wild devices, from a humble paperclip to the almighty bear of paperclips.

Targeted at 9-year-olds for 5-10 minutes of fun.

## How to Play

1. Click the paperclip to earn clips
2. When you have enough clips, buy the next device to level up
3. Each level increases clips per click and changes the background colour
4. Reach level 20 to unleash the almighty bear of paperclips (with auto-click)
5. Win the game!

## Levels

| Lvl | Device | Cost | Clips/Click |
| --- | --- | --- | --- |
| 1 | Paperclip | Start | 1 |
| 2 | Stapler | 50 | 3 |
| 3 | Double Stapler | 200 | 6 |
| 4 | Quad Stapler | 600 | 12 |
| 5 | Stable Conveyor Stamper | 2,000 | 24 |
| 6 | Turbo Hole Puncher | 5,000 | 48 |
| 7 | Rocket-Powered Binder | 10,000 | 96 |
| 8 | Laser Paper Slicer | 17,000 | 180 |
| 9 | Tornado Cabinet Stamper | 30,000 | 350 |
| 10 | Magnetic Desk Monster | 52,000 | 650 |
| 11 | Rainbow Staple Cannon | 94,000 | 1,200 |
| 12 | Atomic Sticky Note | 168,000 | 2,200 |
| 13 | Volcano Ink Fountain | 290,000 | 4,000 |
| 14 | Hypersonic Eraser Beam | 510,000 | 7,200 |
| 15 | Gravity-Defying Clipboard | 920,000 | 13,000 |
| 16 | Time-Travelling Staple Remover | 1,580,000 | 23,000 |
| 17 | Interdimensional Paper Shredder | 2,780,000 | 42,000 |
| 18 | Supernova Hurricane Stamp | 4,800,000 | 75,000 |
| 19 | Universe-Folding Origami Crane | 8,400,000 | 135,000 |
| 20 | The Almighty Bear of Paperclips | 14,700,000 | 250,000 |

## Development

### Prerequisites

- Node.js 23.6+
- Yarn 4+ (managed via Corepack — run `corepack enable` to activate)

### Setup

```bash
yarn install
```

### Running the Site

Start the dev server, then open the URL shown in the terminal (usually `http://localhost:5173`):

```bash
yarn dev
```

To preview a production build locally:

```bash
yarn build
yarn preview
```

### Commands

```bash
yarn dev                          # Start dev server
yarn build                        # Production build
yarn preview                      # Preview production build
yarn typecheck                    # TypeScript type checking
yarn lint                         # Biome linting
yarn biome check --write          # fix issues
yarn biome check --write --unsafe # fix unsafe
yarn test                         # Run tests
```

## Security

Trivy & Semgrep

- SCA: The following command was run on April 10th and found nothing: `Trivy fs .`
- SAST: Semgrep ws also run with `semgrep scan` to find nothing.

## shadcn ui

The shadcn ui componnent library is used, **Radix** was selected as it is production ready and requires less setup.
**Luma** was chosen for it's rounded corners and simpler layout.

This took:
`npm install tailwindcss @tailwindcss/vite`
`yarn dlx shadcn@latest init -t vite`.

### preset b4OWjqdse

`yarn dlx shadcn@latest init --preset b4OWjqdse --template vite`

`yarn dlx shadcn@latest add card`

## Upgrading yarn packages

yarn up something@latest will work. The project has been configured to pin dependencies with `yarn config set defaultSemverRangePrefix ""`
e.g.

- `yarn up tailwindcss@latest`

## Deployment

This project is deployed to [Vercel](https://vercel.com) via GitHub integration. Pushes to `main` trigger automatic production deployments.

### Vercel Tooling

- **Vercel Plugin** — added via `npx plugins add vercel/vercel-plugin` for Claude Code integration
- **@vercel/analytics** — client-side analytics for tracking page views and web vitals

## Tech Stack

- TypeScript 6.0+ (strict mode, ESM)
- Vite (dev server and bundler)
- Biome (linting and formatting)
- Vitest (testing)
- Vercel (hosting and deployment)
- No framework — vanilla TypeScript with DOM manipulation
