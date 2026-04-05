import { spawnConfetti } from './confetti.js';
import { buyNextDevice, handleClick, isGameComplete } from './game-state.js';
import { LEVELS } from './levels.js';
import { initializeRenderer, updateRenderer } from './renderer.js';
import { injectStyles } from './styles.js';

injectStyles();

const appEl = document.getElementById('app');
if (!appEl) {
  throw new Error('Missing #app element');
}
const app: HTMLElement = appEl;

let state = { clips: 0, currentLevel: 1 };
let autoClickInterval: ReturnType<typeof setInterval> | undefined;

function startAutoClick(): void {
  if (autoClickInterval !== undefined) return;

  // Auto-click at 3333/second — batch ~100 clicks per 30ms tick for smooth updates
  const clicksPerTick = 100;
  autoClickInterval = setInterval(() => {
    for (let i = 0; i < clicksPerTick; i++) {
      state = handleClick(state, LEVELS);
    }
    updateRenderer(api, state);
  }, 30);

  const label = document.createElement('div');
  label.className = 'auto-click-label';
  label.textContent = 'auto-clicking at 3,333/sec';
  app.appendChild(label);
}

const api = initializeRenderer(
  app,
  () => {
    state = handleClick(state, LEVELS);
    updateRenderer(api, state);
  },
  () => {
    const previousLevel = state.currentLevel;
    state = buyNextDevice(state, LEVELS);
    updateRenderer(api, state);

    if (state.currentLevel > previousLevel) {
      spawnConfetti(state.currentLevel);
    }

    // Start auto-click at level 20
    if (state.currentLevel === 20 && !isGameComplete(state, LEVELS)) {
      startAutoClick();
    }
  },
);

updateRenderer(api, state);
