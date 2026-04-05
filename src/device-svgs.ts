export function createDeviceSvg(level: number): HTMLImageElement {
  const img = document.createElement('img');
  img.className = 'device-sprite';
  img.src = `/${String(level)}.png`;
  img.alt = `Level ${String(level)} device`;
  img.draggable = false;
  return img;
}
