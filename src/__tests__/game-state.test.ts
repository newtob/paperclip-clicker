import { describe, expect, it } from 'vitest';
import {
  buyNextDevice,
  canBuyNextDevice,
  createInitialState,
  getCurrentLevel,
  handleClick,
  isGameComplete,
} from '../game-state.js';
import { LEVELS } from '../levels.js';

describe('createInitialState', () => {
  it('starts at level 1 with 0 clips', () => {
    const state = createInitialState();
    expect(state.clips).toBe(0);
    expect(state.currentLevel).toBe(1);
  });
});

describe('getCurrentLevel', () => {
  it('returns the correct level data', () => {
    const state = { clips: 0, currentLevel: 3 };
    const level = getCurrentLevel(state, LEVELS);
    expect(level.deviceName).toBe('double stapler');
    expect(level.clipsPerClick).toBe(6);
  });

  it('throws for invalid level', () => {
    const state = { clips: 0, currentLevel: 99 };
    expect(() => getCurrentLevel(state, LEVELS)).toThrow('Invalid level');
  });
});

describe('handleClick', () => {
  it('adds 1 clip at level 1', () => {
    const state = createInitialState();
    const next = handleClick(state, LEVELS);
    expect(next.clips).toBe(1);
    expect(next.currentLevel).toBe(1);
  });

  it('adds clips-per-click for the current level', () => {
    const state = { clips: 100, currentLevel: 2 };
    const next = handleClick(state, LEVELS);
    expect(next.clips).toBe(103); // stapler = 3 per click
  });

  it('does not mutate original state', () => {
    const state = createInitialState();
    const next = handleClick(state, LEVELS);
    expect(state.clips).toBe(0);
    expect(next.clips).toBe(1);
  });
});

describe('canBuyNextDevice', () => {
  it('returns false when not enough clips', () => {
    const state = { clips: 20, currentLevel: 1 };
    expect(canBuyNextDevice(state, LEVELS)).toBe(false);
  });

  it('returns true at exact cost', () => {
    const state = { clips: 25, currentLevel: 1 };
    expect(canBuyNextDevice(state, LEVELS)).toBe(true);
  });

  it('returns true with more than enough clips', () => {
    const state = { clips: 50, currentLevel: 1 };
    expect(canBuyNextDevice(state, LEVELS)).toBe(true);
  });

  it('returns false at max level', () => {
    const state = { clips: 999_999_999, currentLevel: 20 };
    expect(canBuyNextDevice(state, LEVELS)).toBe(false);
  });
});

describe('buyNextDevice', () => {
  it('deducts cost and advances level', () => {
    const state = { clips: 35, currentLevel: 1 };
    const next = buyNextDevice(state, LEVELS);
    expect(next.clips).toBe(10); // 35 - 25
    expect(next.currentLevel).toBe(2);
  });

  it('returns same state if cannot afford', () => {
    const state = { clips: 10, currentLevel: 1 };
    const next = buyNextDevice(state, LEVELS);
    expect(next).toBe(state);
  });

  it('returns same state at max level', () => {
    const state = { clips: 999_999_999, currentLevel: 20 };
    const next = buyNextDevice(state, LEVELS);
    expect(next).toBe(state);
  });
});

describe('isGameComplete', () => {
  it('returns false before max level', () => {
    const state = { clips: 0, currentLevel: 19 };
    expect(isGameComplete(state, LEVELS)).toBe(false);
  });

  it('returns true at max level', () => {
    const state = { clips: 0, currentLevel: 20 };
    expect(isGameComplete(state, LEVELS)).toBe(true);
  });
});
