import { BACKGROUND_COLORS } from './colors.js';
import { createDeviceSvg } from './device-svgs.js';
import { canBuyNextDevice, getCurrentLevel, isGameComplete } from './game-state.js';
import { LEVELS } from './levels.js';
import type { GameState, RendererApi } from './types.js';

export function initializeRenderer(
  container: HTMLElement,
  onClickSvg: () => void,
  onClickUpgrade: () => void,
  onClickRebirth: () => void,
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
  const initialSprite = createDeviceSvg(1);
  svgContainer.appendChild(initialSprite);

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

  // Rebirth button
  const rebirthBtn = document.createElement('button');
  rebirthBtn.className = 'rebirth-btn';
  rebirthBtn.type = 'button';
  rebirthBtn.textContent = 'Rebirth';
  rebirthBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    onClickRebirth();
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
  container.appendChild(rebirthBtn);
  container.appendChild(nextLevelEl);

  return {
    titleEl,
    levelEl,
    counterEl,
    upgradeBtn,
    rebirthBtn,
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
  const rebirthSuffix = state.rebirths > 0 ? ` · ${String(state.rebirths + 1)}x` : '';
  api.levelEl.textContent = `Level ${String(state.currentLevel)}${rebirthSuffix}`;

  // Update device name
  api.deviceNameEl.textContent = level.deviceName;

  // Update background colour
  const colorIndex = state.currentLevel - 1;
  const bgColor = BACKGROUND_COLORS[colorIndex];
  if (bgColor && !isComplete) {
    document.body.style.backgroundColor = bgColor;
  }

  // Update device sprite if level or rebirths changed
  const expectedLevel = state.currentLevel;
  const currentKey = `${String(expectedLevel)}-${String(state.rebirths)}`;
  const currentDataLevel = api.svgContainer.getAttribute('data-level');

  if (currentDataLevel !== currentKey) {
    // Clear all existing sprites
    const existingSprites = api.svgContainer.querySelectorAll('.device-sprite, .ghost-sprite');
    for (const sprite of existingSprites) {
      sprite.remove();
    }

    // Render ghost sprites for each past rebirth (offset right and up by 50px each)
    for (let i = 0; i < state.rebirths; i++) {
      const ghost = createDeviceSvg(20);
      ghost.classList.add('ghost-sprite');
      ghost.classList.remove('device-sprite');
      const offset = (i + 1) * 50;
      ghost.style.transform = `translate(${String(offset)}px, ${String(-offset)}px)`;
      ghost.style.zIndex = String(i);
      api.svgContainer.appendChild(ghost);
    }

    // Render current active sprite on top
    const newSprite = createDeviceSvg(expectedLevel);
    const scale = 1 + (expectedLevel - 1) / 19;
    newSprite.style.setProperty('--level-scale', String(scale));
    newSprite.style.zIndex = String(state.rebirths);
    api.svgContainer.appendChild(newSprite);
    api.svgContainer.setAttribute('data-level', currentKey);
  }

  // Update next level info
  const nextLevel = LEVELS[state.currentLevel];
  if (nextLevel && !isComplete) {
    api.nextLevelEl.textContent = `level ${String(nextLevel.level)} · ${formatNumber(nextLevel.cost)} · ${nextLevel.deviceName}`;
    api.nextLevelEl.style.display = '';
  } else {
    api.nextLevelEl.style.display = 'none';
  }

  // Handle rebirth button — show at level 20
  if (isComplete) {
    api.rebirthBtn.classList.add('visible');
  } else {
    api.rebirthBtn.classList.remove('visible');
  }

  // Handle upgrade button
  if (isComplete) {
    api.upgradeBtn.classList.remove('visible');
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
