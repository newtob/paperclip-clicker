import { describe, expect, it } from 'vitest';
import { BACKGROUND_COLORS } from '../colors.js';

describe('BACKGROUND_COLORS', () => {
  it('has exactly 20 colours', () => {
    expect(BACKGROUND_COLORS).toHaveLength(20);
  });

  it('all are valid hex colour strings', () => {
    const hexPattern = /^#[0-9a-f]{6}$/i;
    for (const color of BACKGROUND_COLORS) {
      expect(color).toMatch(hexPattern);
    }
  });

  it('starts with pale grey', () => {
    expect(BACKGROUND_COLORS[0]).toBe('#f0f0f0');
  });

  it('ends with magenta', () => {
    expect(BACKGROUND_COLORS[19]).toBe('#ff20ff');
  });
});
