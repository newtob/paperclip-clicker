import type { Level } from './types.js';

export const LEVELS: ReadonlyArray<Level> = [
  { level: 1, deviceName: 'paperclip', cost: 0, clipsPerClick: 1 },
  { level: 2, deviceName: 'stapler', cost: 25, clipsPerClick: 3 },
  { level: 3, deviceName: 'double stapler', cost: 100, clipsPerClick: 6 },
  { level: 4, deviceName: 'quad stapler', cost: 300, clipsPerClick: 12 },
  { level: 5, deviceName: 'stable conveyor stamper', cost: 1_000, clipsPerClick: 24 },
  { level: 6, deviceName: 'turbo hole puncher', cost: 2_500, clipsPerClick: 48 },
  { level: 7, deviceName: 'rocket-powered binder', cost: 5_000, clipsPerClick: 96 },
  { level: 8, deviceName: 'laser paper slicer', cost: 8_500, clipsPerClick: 180 },
  { level: 9, deviceName: 'tornado cabinet stamper', cost: 15_000, clipsPerClick: 350 },
  { level: 10, deviceName: 'magnetic desk monster', cost: 26_000, clipsPerClick: 650 },
  { level: 11, deviceName: 'rainbow staple cannon', cost: 47_000, clipsPerClick: 1_200 },
  { level: 12, deviceName: 'atomic sticky note', cost: 84_000, clipsPerClick: 2_200 },
  { level: 13, deviceName: 'volcano ink fountain', cost: 145_000, clipsPerClick: 4_000 },
  { level: 14, deviceName: 'hypersonic eraser beam', cost: 255_000, clipsPerClick: 7_200 },
  { level: 15, deviceName: 'gravity-defying clipboard', cost: 460_000, clipsPerClick: 13_000 },
  { level: 16, deviceName: 'time-travelling staple remover', cost: 790_000, clipsPerClick: 23_000 },
  {
    level: 17,
    deviceName: 'interdimensional paper shredder',
    cost: 1_390_000,
    clipsPerClick: 42_000,
  },
  { level: 18, deviceName: 'supernova hurricane stamp', cost: 2_400_000, clipsPerClick: 75_000 },
  {
    level: 19,
    deviceName: 'universe-folding origami crane',
    cost: 4_200_000,
    clipsPerClick: 135_000,
  },
  {
    level: 20,
    deviceName: 'the almighty bear of paperclips',
    cost: 7_350_000,
    clipsPerClick: 250_000,
  },
] as const;
