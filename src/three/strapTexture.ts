import * as THREE from 'three';

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
  return `rgb(${r},${g},${b})`;
}

export function strapTexture(label: string, accent: string): THREE.CanvasTexture {
  const w = 512, h = 96;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, shade(accent, -35));
  grad.addColorStop(0.5, accent);
  grad.addColorStop(1, shade(accent, -35));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = '#ffffff';
  for (let i = -2; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 110 - 40, h);
    ctx.lineTo(i * 110 + 40, h);
    ctx.lineTo(i * 110 + 110, 0);
    ctx.lineTo(i * 110 + 30, 0);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.94)';
  ctx.font = '700 30px Inter, sans-serif';
  ctx.textBaseline = 'middle';
  const text = `  ${label.toUpperCase()}  ·  `;
  const metrics = ctx.measureText(text);
  let x = 10;
  while (x < w + metrics.width) {
    ctx.fillText(text, x, h / 2 + 1);
    x += metrics.width;
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(4, 1);
  tex.anisotropy = 8;
  return tex;
}
