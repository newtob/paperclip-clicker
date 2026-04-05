const SVG_NS = 'http://www.w3.org/2000/svg';

function createSvgElement(tag: string): SVGElement {
  return document.createElementNS(SVG_NS, tag);
}

function setAttrs(el: SVGElement, attrs: Record<string, string>): void {
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
}

function createBaseSvg(): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  setAttrs(svg, {
    viewBox: '0 0 200 260',
    width: '200',
    height: '260',
    fill: 'none',
    stroke: '#333',
    'stroke-width': '3',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  });
  return svg;
}

// Level 1: Simple paperclip outline
function createPaperclip(): SVGSVGElement {
  const svg = createBaseSvg();
  const path = createSvgElement('path');
  setAttrs(path, {
    d: 'M80 30 L80 210 Q80 240 100 240 Q120 240 120 210 L120 50 Q120 20 100 20 Q85 20 80 30 M120 50 L120 210',
  });
  svg.appendChild(path);
  return svg;
}

// Level 2: Stapler
function createStapler(): SVGSVGElement {
  const svg = createBaseSvg();
  // Base
  const base = createSvgElement('rect');
  setAttrs(base, { x: '30', y: '160', width: '140', height: '30', rx: '5' });
  svg.appendChild(base);
  // Top jaw
  const top = createSvgElement('path');
  setAttrs(top, { d: 'M30 160 L30 140 Q30 120 50 120 L170 130 L170 160' });
  svg.appendChild(top);
  // Hinge
  const hinge = createSvgElement('circle');
  setAttrs(hinge, { cx: '170', cy: '145', r: '8' });
  svg.appendChild(hinge);
  return svg;
}

// Level 3: Double stapler (two staplers stacked)
function createDoubleStapler(): SVGSVGElement {
  const svg = createBaseSvg();
  // Top stapler
  const base1 = createSvgElement('rect');
  setAttrs(base1, { x: '30', y: '110', width: '140', height: '25', rx: '5' });
  svg.appendChild(base1);
  const top1 = createSvgElement('path');
  setAttrs(top1, { d: 'M30 110 L30 95 Q30 80 50 80 L170 90 L170 110' });
  svg.appendChild(top1);
  // Bottom stapler
  const base2 = createSvgElement('rect');
  setAttrs(base2, { x: '30', y: '180', width: '140', height: '25', rx: '5' });
  svg.appendChild(base2);
  const top2 = createSvgElement('path');
  setAttrs(top2, { d: 'M30 180 L30 165 Q30 150 50 150 L170 160 L170 180' });
  svg.appendChild(top2);
  // Connection line
  const conn = createSvgElement('line');
  setAttrs(conn, { x1: '100', y1: '135', x2: '100', y2: '150' });
  svg.appendChild(conn);
  return svg;
}

// Level 4: Quad stapler (four arranged in a grid)
function createQuadStapler(): SVGSVGElement {
  const svg = createBaseSvg();
  const offsets = [
    [20, 40],
    [110, 40],
    [20, 150],
    [110, 150],
  ];
  for (const [ox, oy] of offsets) {
    if (ox === undefined || oy === undefined) continue;
    const rect = createSvgElement('rect');
    setAttrs(rect, {
      x: String(ox),
      y: String(oy + 30),
      width: '70',
      height: '20',
      rx: '3',
    });
    svg.appendChild(rect);
    const top = createSvgElement('path');
    setAttrs(top, {
      d: `M${String(ox)} ${String(oy + 30)} L${String(ox)} ${String(oy + 15)} Q${String(ox)} ${String(oy)} ${String(ox + 15)} ${String(oy)} L${String(ox + 70)} ${String(oy + 8)} L${String(ox + 70)} ${String(oy + 30)}`,
    });
    svg.appendChild(top);
  }
  return svg;
}

// Level 5: Conveyor stamper
function createConveyorStamper(): SVGSVGElement {
  const svg = createBaseSvg();
  // Conveyor belt
  const belt = createSvgElement('rect');
  setAttrs(belt, { x: '20', y: '180', width: '160', height: '20', rx: '10' });
  svg.appendChild(belt);
  // Rollers
  for (const cx of [40, 100, 160]) {
    const roller = createSvgElement('circle');
    setAttrs(roller, { cx: String(cx), cy: '190', r: '12' });
    svg.appendChild(roller);
  }
  // Stamp arm
  const arm = createSvgElement('path');
  setAttrs(arm, { d: 'M90 60 L90 150 L110 150 L110 60 Z' });
  svg.appendChild(arm);
  // Stamp head
  const head = createSvgElement('rect');
  setAttrs(head, { x: '75', y: '145', width: '50', height: '20', rx: '3' });
  svg.appendChild(head);
  // Support frame
  const frame = createSvgElement('path');
  setAttrs(frame, { d: 'M60 60 L140 60 L140 50 L60 50 Z' });
  svg.appendChild(frame);
  return svg;
}

// Level 6: Turbo hole puncher (hole puncher with speed lines)
function createTurboHolePuncher(): SVGSVGElement {
  const svg = createBaseSvg();
  // Body
  const body = createSvgElement('rect');
  setAttrs(body, { x: '50', y: '100', width: '100', height: '80', rx: '8' });
  svg.appendChild(body);
  // Puncher handles
  const handle = createSvgElement('path');
  setAttrs(handle, { d: 'M60 100 L60 60 Q100 40 140 60 L140 100' });
  svg.appendChild(handle);
  // Punch holes
  for (const cx of [80, 120]) {
    const hole = createSvgElement('circle');
    setAttrs(hole, { cx: String(cx), cy: '190', r: '8', fill: '#333' });
    svg.appendChild(hole);
  }
  // Speed lines
  for (const y of [90, 110, 130]) {
    const line = createSvgElement('line');
    setAttrs(line, { x1: '10', y1: String(y), x2: '40', y2: String(y), 'stroke-dasharray': '5,5' });
    svg.appendChild(line);
  }
  return svg;
}

// Level 7: Rocket-powered binder
function createRocketBinder(): SVGSVGElement {
  const svg = createBaseSvg();
  // Binder body
  const binder = createSvgElement('rect');
  setAttrs(binder, { x: '55', y: '60', width: '90', height: '120', rx: '5' });
  svg.appendChild(binder);
  // Binder rings
  for (const y of [90, 120, 150]) {
    const ring = createSvgElement('circle');
    setAttrs(ring, { cx: '55', cy: String(y), r: '8' });
    svg.appendChild(ring);
  }
  // Rocket flames
  const flame = createSvgElement('path');
  setAttrs(flame, {
    d: 'M70 180 L85 230 L100 200 L115 230 L130 180',
    stroke: '#ff4400',
    'stroke-width': '4',
  });
  svg.appendChild(flame);
  // Rocket nozzle
  const nozzle = createSvgElement('path');
  setAttrs(nozzle, { d: 'M75 178 L125 178 L120 190 L80 190 Z' });
  svg.appendChild(nozzle);
  return svg;
}

// Level 8: Laser paper slicer
function createLaserSlicer(): SVGSVGElement {
  const svg = createBaseSvg();
  // Machine body
  const machine = createSvgElement('rect');
  setAttrs(machine, { x: '60', y: '40', width: '80', height: '60', rx: '10' });
  svg.appendChild(machine);
  // Laser beam
  const beam = createSvgElement('line');
  setAttrs(beam, {
    x1: '100',
    y1: '100',
    x2: '100',
    y2: '200',
    stroke: '#ff0000',
    'stroke-width': '4',
    'stroke-dasharray': '8,4',
  });
  svg.appendChild(beam);
  // Paper
  const paper = createSvgElement('rect');
  setAttrs(paper, {
    x: '40',
    y: '190',
    width: '120',
    height: '40',
    rx: '2',
    fill: '#fff',
    stroke: '#333',
  });
  svg.appendChild(paper);
  // Lens
  const lens = createSvgElement('circle');
  setAttrs(lens, { cx: '100', cy: '100', r: '12', stroke: '#ff0000' });
  svg.appendChild(lens);
  return svg;
}

// Level 9: Tornado cabinet stamper
function createTornadoCabinet(): SVGSVGElement {
  const svg = createBaseSvg();
  // Filing cabinet
  const cabinet = createSvgElement('rect');
  setAttrs(cabinet, { x: '60', y: '100', width: '80', height: '130', rx: '3' });
  svg.appendChild(cabinet);
  // Drawers
  for (const y of [115, 155, 195]) {
    const drawer = createSvgElement('rect');
    setAttrs(drawer, { x: '68', y: String(y), width: '64', height: '25', rx: '2' });
    svg.appendChild(drawer);
    const handle = createSvgElement('line');
    setAttrs(handle, {
      x1: '95',
      y1: String(y + 12),
      x2: '105',
      y2: String(y + 12),
      'stroke-width': '4',
    });
    svg.appendChild(handle);
  }
  // Tornado spiral
  const tornado = createSvgElement('path');
  setAttrs(tornado, {
    d: 'M100 90 Q130 70 110 50 Q80 30 100 20 Q130 10 120 40 Q110 60 90 55 Q70 50 85 35',
    stroke: '#666',
    'stroke-width': '2',
  });
  svg.appendChild(tornado);
  return svg;
}

// Level 10: Magnetic desk monster
function createMagneticMonster(): SVGSVGElement {
  const svg = createBaseSvg();
  // Desk
  const desk = createSvgElement('rect');
  setAttrs(desk, { x: '30', y: '170', width: '140', height: '15', rx: '3' });
  svg.appendChild(desk);
  // Desk legs
  const leg1 = createSvgElement('line');
  setAttrs(leg1, { x1: '50', y1: '185', x2: '50', y2: '230' });
  svg.appendChild(leg1);
  const leg2 = createSvgElement('line');
  setAttrs(leg2, { x1: '150', y1: '185', x2: '150', y2: '230' });
  svg.appendChild(leg2);
  // Monster body
  const body = createSvgElement('ellipse');
  setAttrs(body, { cx: '100', cy: '130', rx: '45', ry: '35' });
  svg.appendChild(body);
  // Eyes
  for (const cx of [85, 115]) {
    const eye = createSvgElement('circle');
    setAttrs(eye, { cx: String(cx), cy: '120', r: '8', fill: '#fff', stroke: '#333' });
    svg.appendChild(eye);
    const pupil = createSvgElement('circle');
    setAttrs(pupil, { cx: String(cx), cy: '120', r: '4', fill: '#333' });
    svg.appendChild(pupil);
  }
  // Magnet waves
  for (const r of [55, 65, 75]) {
    const wave = createSvgElement('path');
    setAttrs(wave, {
      d: `M${String(100 - r)} 130 Q${String(100 - r)} ${String(130 - r)} 100 ${String(130 - r)}`,
      stroke: '#88f',
      'stroke-width': '1',
      'stroke-dasharray': '4,4',
    });
    svg.appendChild(wave);
  }
  return svg;
}

// Level 11: Rainbow staple cannon
function createRainbowCannon(): SVGSVGElement {
  const svg = createBaseSvg();
  // Cannon barrel
  const barrel = createSvgElement('rect');
  setAttrs(barrel, { x: '80', y: '40', width: '40', height: '100', rx: '5' });
  svg.appendChild(barrel);
  // Cannon base
  const base = createSvgElement('ellipse');
  setAttrs(base, { cx: '100', cy: '160', rx: '50', ry: '25' });
  svg.appendChild(base);
  // Rainbow arcs shooting out
  const colors = ['#ff0000', '#ff8800', '#ffff00', '#00cc00', '#0000ff', '#8800ff'];
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (!color) continue;
    const arc = createSvgElement('path');
    setAttrs(arc, {
      d: `M${String(85 + i * 2)} 40 Q${String(70 - i * 5)} ${String(20 - i * 3)} ${String(60 - i * 8)} ${String(30 + i * 2)}`,
      stroke: color,
      'stroke-width': '3',
    });
    svg.appendChild(arc);
  }
  return svg;
}

// Level 12: Atomic sticky note
function createAtomicStickyNote(): SVGSVGElement {
  const svg = createBaseSvg();
  // Sticky note
  const note = createSvgElement('rect');
  setAttrs(note, {
    x: '50',
    y: '70',
    width: '100',
    height: '100',
    rx: '2',
    fill: '#ffff88',
    stroke: '#ccaa00',
  });
  svg.appendChild(note);
  // Folded corner
  const fold = createSvgElement('path');
  setAttrs(fold, { d: 'M130 170 L150 170 L150 150 Z', fill: '#dddd66', stroke: '#ccaa00' });
  svg.appendChild(fold);
  // Atom orbits
  for (const angle of [0, 60, 120]) {
    const orbit = createSvgElement('ellipse');
    setAttrs(orbit, {
      cx: '100',
      cy: '120',
      rx: '60',
      ry: '15',
      transform: `rotate(${String(angle)} 100 120)`,
      stroke: '#4488ff',
      'stroke-width': '1.5',
    });
    svg.appendChild(orbit);
  }
  // Nucleus
  const nucleus = createSvgElement('circle');
  setAttrs(nucleus, { cx: '100', cy: '120', r: '6', fill: '#4488ff' });
  svg.appendChild(nucleus);
  return svg;
}

// Level 13: Volcano ink fountain
function createVolcanoInk(): SVGSVGElement {
  const svg = createBaseSvg();
  // Volcano shape
  const volcano = createSvgElement('path');
  setAttrs(volcano, { d: 'M20 230 L80 80 L120 80 L180 230 Z', fill: '#884422', stroke: '#333' });
  svg.appendChild(volcano);
  // Crater
  const crater = createSvgElement('ellipse');
  setAttrs(crater, { cx: '100', cy: '80', rx: '25', ry: '10', fill: '#442200', stroke: '#333' });
  svg.appendChild(crater);
  // Ink eruption
  const ink1 = createSvgElement('path');
  setAttrs(ink1, { d: 'M90 75 Q80 30 70 20', stroke: '#0044cc', 'stroke-width': '4' });
  svg.appendChild(ink1);
  const ink2 = createSvgElement('path');
  setAttrs(ink2, { d: 'M100 70 Q100 25 105 10', stroke: '#0044cc', 'stroke-width': '4' });
  svg.appendChild(ink2);
  const ink3 = createSvgElement('path');
  setAttrs(ink3, { d: 'M110 75 Q125 35 135 25', stroke: '#0044cc', 'stroke-width': '4' });
  svg.appendChild(ink3);
  // Ink drops
  for (const [cx, cy] of [
    [65, 15],
    [108, 5],
    [140, 20],
  ]) {
    if (cx === undefined || cy === undefined) continue;
    const drop = createSvgElement('circle');
    setAttrs(drop, { cx: String(cx), cy: String(cy), r: '5', fill: '#0044cc' });
    svg.appendChild(drop);
  }
  return svg;
}

// Level 14: Hypersonic eraser beam
function createHypersonicEraser(): SVGSVGElement {
  const svg = createBaseSvg();
  // Eraser body (futuristic gun shape)
  const body = createSvgElement('path');
  setAttrs(body, { d: 'M30 130 L80 110 L160 110 L170 130 L160 150 L80 150 L30 130 Z' });
  svg.appendChild(body);
  // Beam emitter
  const emitter = createSvgElement('circle');
  setAttrs(emitter, { cx: '170', cy: '130', r: '15' });
  svg.appendChild(emitter);
  // Beam
  for (let i = 0; i < 3; i++) {
    const beam = createSvgElement('line');
    setAttrs(beam, {
      x1: '185',
      y1: String(125 + i * 5),
      x2: '200',
      y2: String(120 + i * 5),
      stroke: '#ff00ff',
      'stroke-width': '2',
    });
    svg.appendChild(beam);
  }
  // Speed lines
  for (const y of [115, 130, 145]) {
    const line = createSvgElement('line');
    setAttrs(line, { x1: '0', y1: String(y), x2: '25', y2: String(y), 'stroke-dasharray': '6,3' });
    svg.appendChild(line);
  }
  // Handle
  const handle = createSvgElement('rect');
  setAttrs(handle, { x: '70', y: '150', width: '25', height: '50', rx: '5' });
  svg.appendChild(handle);
  return svg;
}

// Level 15: Gravity-defying clipboard
function createGravityClipboard(): SVGSVGElement {
  const svg = createBaseSvg();
  // Clipboard rotated/floating
  const board = createSvgElement('rect');
  setAttrs(board, {
    x: '50',
    y: '60',
    width: '100',
    height: '140',
    rx: '5',
    transform: 'rotate(-10 100 130)',
  });
  svg.appendChild(board);
  // Clip at top
  const clip = createSvgElement('rect');
  setAttrs(clip, {
    x: '75',
    y: '50',
    width: '50',
    height: '25',
    rx: '3',
    transform: 'rotate(-10 100 130)',
  });
  svg.appendChild(clip);
  // Floating lines (paper text)
  for (const y of [100, 120, 140, 160]) {
    const line = createSvgElement('line');
    setAttrs(line, {
      x1: '65',
      y1: String(y),
      x2: '135',
      y2: String(y),
      transform: 'rotate(-10 100 130)',
      'stroke-width': '1',
    });
    svg.appendChild(line);
  }
  // Float particles
  for (const [cx, cy] of [
    [40, 200],
    [160, 210],
    [50, 220],
    [150, 230],
  ]) {
    if (cx === undefined || cy === undefined) continue;
    const dot = createSvgElement('circle');
    setAttrs(dot, { cx: String(cx), cy: String(cy), r: '3', fill: '#aaa' });
    svg.appendChild(dot);
  }
  return svg;
}

// Level 16: Time-travelling staple remover
function createTimeTravelRemover(): SVGSVGElement {
  const svg = createBaseSvg();
  // Staple remover jaws
  const jaw = createSvgElement('path');
  setAttrs(jaw, { d: 'M60 140 L100 100 L140 140 M60 140 L100 180 L140 140' });
  svg.appendChild(jaw);
  // Clock circle around it
  const clock = createSvgElement('circle');
  setAttrs(clock, { cx: '100', cy: '140', r: '60', 'stroke-dasharray': '8,4' });
  svg.appendChild(clock);
  // Clock hands
  const hand1 = createSvgElement('line');
  setAttrs(hand1, { x1: '100', y1: '140', x2: '100', y2: '95', 'stroke-width': '3' });
  svg.appendChild(hand1);
  const hand2 = createSvgElement('line');
  setAttrs(hand2, { x1: '100', y1: '140', x2: '130', y2: '140', 'stroke-width': '2' });
  svg.appendChild(hand2);
  // Time vortex spirals
  const spiral = createSvgElement('path');
  setAttrs(spiral, {
    d: 'M100 60 Q140 50 150 70 Q160 100 130 90 Q110 85 120 70',
    stroke: '#8844ff',
    'stroke-width': '1.5',
  });
  svg.appendChild(spiral);
  return svg;
}

// Level 17: Interdimensional paper shredder
function createInterdimensionalShredder(): SVGSVGElement {
  const svg = createBaseSvg();
  // Shredder body
  const body = createSvgElement('rect');
  setAttrs(body, { x: '50', y: '80', width: '100', height: '70', rx: '8' });
  svg.appendChild(body);
  // Feed slot
  const slot = createSvgElement('rect');
  setAttrs(slot, { x: '65', y: '78', width: '70', height: '6', rx: '2', fill: '#222' });
  svg.appendChild(slot);
  // Shredded strips coming out
  for (let i = 0; i < 7; i++) {
    const strip = createSvgElement('line');
    setAttrs(strip, {
      x1: String(65 + i * 10),
      y1: '150',
      x2: String(60 + i * 10),
      y2: '210',
      'stroke-width': '2',
    });
    svg.appendChild(strip);
  }
  // Portal/dimension effect
  const portal = createSvgElement('ellipse');
  setAttrs(portal, {
    cx: '100',
    cy: '50',
    rx: '40',
    ry: '20',
    stroke: '#aa44ff',
    'stroke-width': '2',
    'stroke-dasharray': '6,3',
  });
  svg.appendChild(portal);
  const inner = createSvgElement('ellipse');
  setAttrs(inner, {
    cx: '100',
    cy: '50',
    rx: '25',
    ry: '12',
    stroke: '#dd66ff',
    'stroke-width': '1.5',
  });
  svg.appendChild(inner);
  return svg;
}

// Level 18: Supernova hurricane stamp
function createSupernovaStamp(): SVGSVGElement {
  const svg = createBaseSvg();
  // Central stamp
  const stamp = createSvgElement('rect');
  setAttrs(stamp, { x: '75', y: '100', width: '50', height: '60', rx: '5' });
  svg.appendChild(stamp);
  // Handle
  const handle = createSvgElement('rect');
  setAttrs(handle, { x: '88', y: '60', width: '24', height: '40', rx: '3' });
  svg.appendChild(handle);
  // Explosion/supernova rays
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180;
    const x2 = 100 + Math.cos(angle) * 90;
    const y2 = 130 + Math.sin(angle) * 90;
    const ray = createSvgElement('line');
    setAttrs(ray, {
      x1: String(100 + Math.cos(angle) * 40),
      y1: String(130 + Math.sin(angle) * 40),
      x2: String(Math.round(x2)),
      y2: String(Math.round(y2)),
      stroke: '#ff6600',
      'stroke-width': '2',
    });
    svg.appendChild(ray);
  }
  // Swirl lines (hurricane)
  const swirl = createSvgElement('path');
  setAttrs(swirl, {
    d: 'M100 90 Q140 80 150 100 Q160 130 130 140 Q100 150 90 130 Q80 110 100 90',
    stroke: '#ffaa00',
    'stroke-width': '1.5',
    fill: 'none',
  });
  svg.appendChild(swirl);
  return svg;
}

// Level 19: Universe-folding origami crane
function createOrigamiCrane(): SVGSVGElement {
  const svg = createBaseSvg();
  // Crane body (geometric origami)
  const crane = createSvgElement('path');
  setAttrs(crane, {
    d: 'M100 50 L140 120 L180 110 L140 130 L160 200 L100 150 L40 200 L60 130 L20 110 L60 120 Z',
    'stroke-width': '2',
  });
  svg.appendChild(crane);
  // Fold lines
  const fold1 = createSvgElement('line');
  setAttrs(fold1, {
    x1: '100',
    y1: '50',
    x2: '100',
    y2: '150',
    'stroke-dasharray': '4,4',
    'stroke-width': '1',
  });
  svg.appendChild(fold1);
  const fold2 = createSvgElement('line');
  setAttrs(fold2, {
    x1: '60',
    y1: '120',
    x2: '140',
    y2: '120',
    'stroke-dasharray': '4,4',
    'stroke-width': '1',
  });
  svg.appendChild(fold2);
  // Stars around it
  for (const [cx, cy] of [
    [30, 40],
    [170, 60],
    [20, 180],
    [175, 190],
    [100, 220],
  ]) {
    if (cx === undefined || cy === undefined) continue;
    const star = createSvgElement('circle');
    setAttrs(star, {
      cx: String(cx),
      cy: String(cy),
      r: '2',
      fill: '#fff',
      stroke: '#aaa',
      'stroke-width': '1',
    });
    svg.appendChild(star);
  }
  return svg;
}

// Level 20: The almighty bear of paperclips
function createAlmightyBear(): SVGSVGElement {
  const svg = createBaseSvg();
  // Bear head
  const head = createSvgElement('circle');
  setAttrs(head, { cx: '100', cy: '100', r: '50' });
  svg.appendChild(head);
  // Ears
  for (const cx of [65, 135]) {
    const ear = createSvgElement('circle');
    setAttrs(ear, { cx: String(cx), cy: '60', r: '18' });
    svg.appendChild(ear);
  }
  // Eyes
  for (const cx of [82, 118]) {
    const eye = createSvgElement('circle');
    setAttrs(eye, { cx: String(cx), cy: '92', r: '7', fill: '#333' });
    svg.appendChild(eye);
    // Sparkle in eyes
    const sparkle = createSvgElement('circle');
    setAttrs(sparkle, { cx: String(cx + 2), cy: String(90), r: '2', fill: '#fff' });
    svg.appendChild(sparkle);
  }
  // Nose
  const nose = createSvgElement('ellipse');
  setAttrs(nose, { cx: '100', cy: '108', rx: '8', ry: '5', fill: '#333' });
  svg.appendChild(nose);
  // Mouth
  const mouth = createSvgElement('path');
  setAttrs(mouth, { d: 'M90 115 Q100 125 110 115', 'stroke-width': '2' });
  svg.appendChild(mouth);
  // Crown
  const crown = createSvgElement('path');
  setAttrs(crown, {
    d: 'M70 52 L75 30 L85 45 L100 25 L115 45 L125 30 L130 52',
    stroke: '#ffcc00',
    'stroke-width': '3',
    fill: 'none',
  });
  svg.appendChild(crown);
  // Body (small)
  const body = createSvgElement('ellipse');
  setAttrs(body, { cx: '100', cy: '190', rx: '35', ry: '40' });
  svg.appendChild(body);
  // Paperclip in paw
  const paperclip = createSvgElement('path');
  setAttrs(paperclip, {
    d: 'M120 180 L120 220 Q120 230 125 230 Q130 230 130 220 L130 185 Q130 178 125 178 Q122 178 120 180',
    'stroke-width': '2',
  });
  svg.appendChild(paperclip);
  return svg;
}

const DEVICE_CREATORS: ReadonlyArray<() => SVGSVGElement> = [
  createPaperclip,
  createStapler,
  createDoubleStapler,
  createQuadStapler,
  createConveyorStamper,
  createTurboHolePuncher,
  createRocketBinder,
  createLaserSlicer,
  createTornadoCabinet,
  createMagneticMonster,
  createRainbowCannon,
  createAtomicStickyNote,
  createVolcanoInk,
  createHypersonicEraser,
  createGravityClipboard,
  createTimeTravelRemover,
  createInterdimensionalShredder,
  createSupernovaStamp,
  createOrigamiCrane,
  createAlmightyBear,
];

export function createDeviceSvg(level: number): SVGSVGElement {
  const creator = DEVICE_CREATORS[level - 1];
  if (!creator) {
    throw new Error(`No SVG for level ${String(level)}`);
  }
  return creator();
}
