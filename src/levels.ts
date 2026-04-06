import type { Level } from './types.js';

export const LEVELS: ReadonlyArray<Level> = [
  { level: 1, deviceName: 'paperclip', cost: 0, clipsPerClick: 1 },
  { level: 2, deviceName: 'stapler', cost: 20, clipsPerClick: 3 },
  { level: 3, deviceName: 'double stapler', cost: 80, clipsPerClick: 6 },
  { level: 4, deviceName: 'quad stapler', cost: 250, clipsPerClick: 12 },
  { level: 5, deviceName: 'stable conveyor stamper', cost: 650, clipsPerClick: 24 },
  { level: 6, deviceName: 'turbo hole puncher', cost: 2_000, clipsPerClick: 48 },
  { level: 7, deviceName: 'rocket-powered binder', cost: 3_000, clipsPerClick: 96 },
  { level: 8, deviceName: 'laser paper slicer', cost: 6_500, clipsPerClick: 180 },
  { level: 9, deviceName: 'tornado cabinet stamper', cost: 12_000, clipsPerClick: 350 },
  { level: 10, deviceName: 'magnetic desk monster', cost: 22_000, clipsPerClick: 650 },
  { level: 11, deviceName: 'rainbow staple cannon', cost: 40_000, clipsPerClick: 1_200 },
  { level: 12, deviceName: 'atomic sticky note', cost: 70_000, clipsPerClick: 2_200 },
  { level: 13, deviceName: 'volcano ink fountain', cost: 120_000, clipsPerClick: 4_000 },
  { level: 14, deviceName: 'hypersonic eraser beam', cost: 220_000, clipsPerClick: 7_200 },
  { level: 15, deviceName: 'gravity-defying clipboard', cost: 440_000, clipsPerClick: 13_000 },
  { level: 16, deviceName: 'time-travelling staple remover', cost: 700_000, clipsPerClick: 23_000 },
  {
    level: 17,
    deviceName: 'interdimensional paper shredder',
    cost: 1_200_000,
    clipsPerClick: 42_000,
  },
  { level: 18, deviceName: 'supernova hurricane stamp', cost: 2_000_000, clipsPerClick: 75_000 },
  {
    level: 19,
    deviceName: 'universe-folding origami crane',
    cost: 3_000_000,
    clipsPerClick: 135_000,
  },
  {
    level: 20,
    deviceName: 'the almighty bear of paperclips',
    cost: 7_350_000,
    clipsPerClick: 250_000,
  },
] as const;
