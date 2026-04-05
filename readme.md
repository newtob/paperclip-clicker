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
- npm

### Setup

```bash
npm install
```

### Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run typecheck  # TypeScript type checking
npm run lint       # Biome linting
npm run test       # Run tests
```

## Tech Stack

- TypeScript 6.0+ (strict mode, ESM)
- Vite (dev server and bundler)
- Biome (linting and formatting)
- Vitest (testing)
- No framework - vanilla TypeScript with DOM manipulation
