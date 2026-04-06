import type { GameState, Level } from './types.js';

export function createInitialState(): GameState {
  return { clips: 0, currentLevel: 1, rebirths: 0 };
}

export function getCurrentLevel(state: GameState, levels: ReadonlyArray<Level>): Level {
  const level = levels[state.currentLevel - 1];
  if (!level) {
    throw new Error(`Invalid level: ${String(state.currentLevel)}`);
  }
  return level;
}

export function handleClick(state: GameState, levels: ReadonlyArray<Level>): GameState {
  const level = getCurrentLevel(state, levels);
  const multiplier = 1 + state.rebirths;
  return { ...state, clips: state.clips + level.clipsPerClick * multiplier };
}

export function rebirth(state: GameState): GameState {
  return { clips: 0, currentLevel: 1, rebirths: state.rebirths + 1 };
}

export function canBuyNextDevice(state: GameState, levels: ReadonlyArray<Level>): boolean {
  if (state.currentLevel >= levels.length) {
    return false;
  }
  const nextLevel = levels[state.currentLevel];
  if (!nextLevel) {
    return false;
  }
  return state.clips >= nextLevel.cost;
}

export function buyNextDevice(state: GameState, levels: ReadonlyArray<Level>): GameState {
  if (!canBuyNextDevice(state, levels)) {
    return state;
  }
  const nextLevel = levels[state.currentLevel];
  if (!nextLevel) {
    return state;
  }
  return {
    clips: state.clips - nextLevel.cost,
    currentLevel: state.currentLevel + 1,
    rebirths: state.rebirths,
  };
}

export function isGameComplete(state: GameState, levels: ReadonlyArray<Level>): boolean {
  return state.currentLevel >= levels.length;
}
