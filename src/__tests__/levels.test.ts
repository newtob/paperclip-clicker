import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { LEVELS } from '../levels.js';

const LevelSchema = z.object({
  level: z.number().int().positive(),
  deviceName: z.string().min(1),
  cost: z.number().int().nonnegative(),
  clipsPerClick: z.number().int().positive(),
});

describe('LEVELS', () => {
  it('has exactly 20 levels', () => {
    expect(LEVELS).toHaveLength(20);
  });

  it('each level matches the schema', () => {
    for (const level of LEVELS) {
      expect(() => LevelSchema.parse(level)).not.toThrow();
    }
  });

  it('level numbers are sequential 1-20', () => {
    for (let i = 0; i < LEVELS.length; i++) {
      expect(LEVELS[i]?.level).toBe(i + 1);
    }
  });

  it('level 1 has cost 0', () => {
    expect(LEVELS[0]?.cost).toBe(0);
  });

  it('costs are strictly increasing after level 1', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      const current = LEVELS[i];
      const previous = LEVELS[i - 1];
      if (current && previous) {
        expect(current.cost).toBeGreaterThan(previous.cost);
      }
    }
  });

  it('clips per click is strictly increasing', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      const current = LEVELS[i];
      const previous = LEVELS[i - 1];
      if (current && previous) {
        expect(current.clipsPerClick).toBeGreaterThan(previous.clipsPerClick);
      }
    }
  });

  it('all device names are unique', () => {
    const names = LEVELS.map((l) => l.deviceName);
    expect(new Set(names).size).toBe(names.length);
  });
});
