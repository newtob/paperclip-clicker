const CONFETTI_COLORS = [
  '#ff3060',
  '#ff8830',
  '#f0e020',
  '#40e880',
  '#60a0ff',
  '#b090ff',
  '#ff20ff',
  '#ffb820',
  '#ff5040',
  '#30d8b0',
];

const SHAPES = ['square', 'circle', 'strip'] as const;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function spawnConfetti(level: number): void {
  // Scale particle count with level: level 2 = 15, level 20 = 300
  const count = Math.round(10 + level * 15);
  const container = document.body;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';

    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    if (!color) continue;

    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const size = randomBetween(6, 14);
    const startX = randomBetween(10, 90);
    const startY = randomBetween(-5, 15);
    const drift = randomBetween(-30, 30);
    const duration = randomBetween(1200, 2500);
    const rotation = randomBetween(0, 720);
    const delay = randomBetween(0, 300);

    el.style.position = 'fixed';
    el.style.left = `${String(startX)}vw`;
    el.style.top = `${String(startY)}vh`;
    el.style.width = `${String(size)}px`;
    el.style.height = shape === 'strip' ? `${String(size * 2.5)}px` : `${String(size)}px`;
    el.style.backgroundColor = color;
    el.style.borderRadius = shape === 'circle' ? '50%' : '2px';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.opacity = '1';

    container.appendChild(el);

    const keyframes: Keyframe[] = [
      {
        transform: `translate(0, 0) rotate(0deg)`,
        opacity: 1,
      },
      {
        transform: `translate(${String(drift)}vw, 110vh) rotate(${String(rotation)}deg)`,
        opacity: 0.3,
      },
    ];

    const animation = el.animate(keyframes, {
      duration,
      delay,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards',
    });

    animation.onfinish = () => {
      el.remove();
    };
  }
}
