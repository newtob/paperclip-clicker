// Sprite sheet: /sprites.png (1338x784, 6 cols x 4 rows)
// Each cell is ~223x196. Duplicates and extras are skipped.

// Grid positions [col, row] for each level, mapped by visual match to level name.
// Skipped: (0,1) dup Turbo Puncher, (5,1) dup Magnetic Monster, (5,2) extra bear variant.
const SPRITE_POSITIONS: ReadonlyArray<readonly [col: number, row: number]> = [
  [0, 0], // 1: Paperclip
  [1, 0], // 2: Stapler
  [2, 0], // 3: Double Stapler
  [3, 0], // 4: Quad Stapler
  [4, 0], // 5: Stable Conveyor Stamper
  [5, 0], // 6: Turbo Hole Puncher
  [1, 1], // 7: Rocket-Powered Binder
  [2, 1], // 8: Laser Paper Slicer
  [3, 1], // 9: Tornado Cabinet Stamper
  [4, 1], // 10: Magnetic Desk Monster
  [0, 2], // 11: Rainbow Staple Cannon
  [1, 2], // 12: Atomic Sticky Note
  [2, 2], // 13: Volcano Ink Fountain
  [3, 2], // 14: Hypersonic Eraser Beam
  [4, 2], // 15: Gravity-Defying Clipboard
  [0, 3], // 16: Time-Travelling Staple Remover
  [1, 3], // 17: Interdimensional Paper Shredder
  [2, 3], // 18: Supernova Hurricane Stamp
  [3, 3], // 19: Universe-Folding Origami Crane
  [4, 3], // 20: The Almighty Bear of Paperclips (wider)
];

const COLS = 6;
const ROWS = 4;

export function createDeviceSvg(level: number): HTMLDivElement {
  const pos = SPRITE_POSITIONS[level - 1];
  if (!pos) {
    throw new Error(`No sprite for level ${String(level)}`);
  }
  const [col, row] = pos;

  const el = document.createElement('div');
  el.className = 'device-sprite';
  el.style.backgroundImage = "url('/sprites.png')";

  // The bear (level 20) spans ~2 columns in the sprite sheet
  if (level === 20) {
    // Show wider portion: 3 cols worth of width (1338/3 = 446px per unit)
    el.style.backgroundSize = `${String((COLS / 2) * 100)}% ${String(ROWS * 100)}%`;
    // Position: col 4 of 6 mapped to 3-unit grid → unit index 2
    el.style.backgroundPosition = `${String((2 / (COLS / 2 - 1)) * 100)}% ${String((row / (ROWS - 1)) * 100)}%`;
    el.classList.add('device-sprite-bear');
  } else {
    el.style.backgroundSize = `${String(COLS * 100)}% ${String(ROWS * 100)}%`;
    el.style.backgroundPosition = `${String((col / (COLS - 1)) * 100)}% ${String((row / (ROWS - 1)) * 100)}%`;
  }

  return el;
}
