import { BACKGROUND_COLORS } from './colors.js';
import { createDeviceSvg } from './device-svgs.js';
import { canBuyNextDevice, getCurrentLevel, isGameComplete } from './game-state.js';
import { LEVELS } from './levels.js';
import type { GameState, RendererApi } from './types.js';

export function initializeRenderer(
  container: HTMLElement,
  onClickSvg: () => void,
  onClickUpgrade: () => void,
): RendererApi {
  // Title
  const titleEl = document.createElement('h1');
  titleEl.className = 'game-title';
  titleEl.textContent = 'paperclip-bear';

  // Level indicator
  const levelEl = document.createElement('div');
  levelEl.className = 'level-indicator';
  levelEl.textContent = 'Level 1';

  // Device name
  const deviceNameEl = document.createElement('div');
  deviceNameEl.className = 'device-name';
  deviceNameEl.textContent = 'paperclip';

  // SVG container
  const svgContainer = document.createElement('div');
  svgContainer.className = 'svg-container';
  const initialSvg = createDeviceSvg(1);
  svgContainer.appendChild(initialSvg);

  svgContainer.addEventListener('click', () => {
    onClickSvg();
    svgContainer.classList.add('squish');
    setTimeout(() => {
      svgContainer.classList.remove('squish');
    }, 100);
  });

  // Counter
  const counterEl = document.createElement('div');
  counterEl.className = 'clip-counter';
  counterEl.textContent = '0';

  // Upgrade button
  const upgradeBtn = document.createElement('button');
  upgradeBtn.className = 'upgrade-btn';
  upgradeBtn.type = 'button';
  upgradeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    onClickUpgrade();
  });

  // Next level info
  const nextLevelEl = document.createElement('div');
  nextLevelEl.className = 'next-level-info';

  container.appendChild(titleEl);
  container.appendChild(levelEl);
  container.appendChild(deviceNameEl);
  container.appendChild(svgContainer);
  container.appendChild(counterEl);
  container.appendChild(upgradeBtn);
  container.appendChild(nextLevelEl);

  return {
    titleEl,
    levelEl,
    counterEl,
    upgradeBtn,
    svgContainer,
    containerEl: container,
    deviceNameEl,
    nextLevelEl,
  };
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return String(n);
}

export function updateRenderer(api: RendererApi, state: GameState): void {
  const level = getCurrentLevel(state, LEVELS);
  const isComplete = isGameComplete(state, LEVELS);

  // Update counter
  api.counterEl.textContent = formatNumber(state.clips);

  // Update level indicator
  api.levelEl.textContent = `Level ${String(state.currentLevel)}`;

  // Update device name
  api.deviceNameEl.textContent = level.deviceName;

  // Update background colour
  const colorIndex = state.currentLevel - 1;
  const bgColor = BACKGROUND_COLORS[colorIndex];
  if (bgColor && !isComplete) {
    document.body.style.backgroundColor = bgColor;
  }

  // Update SVG if level changed
  const currentSvg = api.svgContainer.querySelector('svg');
  const expectedLevel = state.currentLevel;
  const currentDataLevel = api.svgContainer.getAttribute('data-level');

  if (currentDataLevel !== String(expectedLevel)) {
    if (currentSvg) {
      api.svgContainer.removeChild(currentSvg);
    }
    const newSvg = createDeviceSvg(expectedLevel);
    api.svgContainer.appendChild(newSvg);
    api.svgContainer.setAttribute('data-level', String(expectedLevel));
  }

  // Update next level info
  const nextLevel = LEVELS[state.currentLevel];
  if (nextLevel && !isComplete) {
    api.nextLevelEl.textContent = `level ${String(nextLevel.level)} · ${formatNumber(nextLevel.cost)} · ${nextLevel.deviceName}`;
    api.nextLevelEl.style.display = '';
  } else {
    api.nextLevelEl.style.display = 'none';
  }

  // Handle upgrade button
  if (isComplete) {
    api.upgradeBtn.classList.remove('visible');

    // Show win state
    if (!api.containerEl.querySelector('.win-message')) {
      const winMsg = document.createElement('div');
      winMsg.className = 'win-message';
      winMsg.textContent = 'You win!';
      api.containerEl.appendChild(winMsg);
      document.body.classList.add('win-state');
    }
  } else if (canBuyNextDevice(state, LEVELS)) {
    const nextLevel = LEVELS[state.currentLevel];
    if (nextLevel) {
      api.upgradeBtn.textContent = `Buy ${nextLevel.deviceName} (${formatNumber(nextLevel.cost)} clips)`;
      api.upgradeBtn.classList.add('visible');
    }
  } else {
    api.upgradeBtn.classList.remove('visible');
  }
}
