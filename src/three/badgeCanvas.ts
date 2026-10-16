import * as THREE from 'three';

const W = 620;
const H = 860;

function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function base(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#0d0f12';
  rounded(ctx, 0, 0, W, H, 36);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 2;
  rounded(ctx, 6, 6, W - 12, H - 12, 32);
  ctx.stroke();
}

export function drawHackerRankBadge(name: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  base(ctx);

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 36px Inter, sans-serif';
  ctx.fillText('HackerRank', 56, 108);
  ctx.fillStyle = '#2ec866';
  ctx.fillRect(298, 78, 14, 30);

  ctx.font = 'italic 700 58px Georgia, serif';
  ctx.fillStyle = '#39d353';
  ctx.fillText('Orchestrate', 56, 210);

  ctx.font = '700 20px Inter, sans-serif';
  ctx.fillStyle = '#e8a33d';
  ctx.fillText('O C T O B E R   E D I T I O N', 56, 252);
  ctx.strokeStyle = 'rgba(232,163,61,0.5)';
  ctx.beginPath(); ctx.moveTo(300, 246); ctx.lineTo(W - 56, 246); ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 44px Inter, sans-serif';
  wrapText(ctx, name, 56, 420, W - 160, 50);

  ctx.beginPath();
  ctx.arc(80, 500, 22, 0, Math.PI * 2);
  ctx.fillStyle = '#39d353';
  ctx.fill();
  ctx.strokeStyle = '#0d0f12';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(70, 500); ctx.lineTo(78, 508); ctx.lineTo(92, 490);
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 22px Inter, sans-serif';
  ctx.fillText('I AM ATTENDING', 118, 508);

  ctx.save();
  ctx.translate(W - 36, H - 70);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '700 16px Inter, sans-serif';
  ctx.fillText('P A R T I C I P A N T', 0, 0);
  ctx.restore();

  return canvas;
}

export function drawCursorBadge(name: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  base(ctx);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 30px Inter, sans-serif';
  ctx.fillText('▲ CURSOR', 48, 96);
  ctx.textAlign = 'right';
  ctx.font = '600 16px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('AI HACKATHON', W - 48, 84);
  ctx.fillText('MYANMAR', W - 48, 104);
  ctx.textAlign = 'left';

  const cx = W / 2, cy = 330, r = 130;
  const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  grad.addColorStop(0, '#5b5f66');
  grad.addColorStop(0.5, '#cfd3d8');
  grad.addColorStop(1, '#3a3d42');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx + r * 0.87, cy + r * 0.5);
  ctx.lineTo(cx - r * 0.87, cy + r * 0.5);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#0d0f12';
  ctx.beginPath();
  ctx.moveTo(cx, cy - r * 0.42);
  ctx.lineTo(cx + r * 0.37, cy + r * 0.21);
  ctx.lineTo(cx - r * 0.37, cy + r * 0.21);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 56px Inter, sans-serif';
  ctx.fillText('Builder', 56, 560);

  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 2;
  rounded(ctx, 48, 610, W - 96, 86, 18);
  ctx.stroke();
  ctx.fillStyle = '#f2f2f2';
  ctx.font = '600 32px Inter, sans-serif';
  ctx.fillText(name, 72, 665);

  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '500 16px Inter, sans-serif';
  ctx.fillText('cursormyanmar.com', 56, H - 40);

  return canvas;
}

export function drawHackathonBadge(opts: { event: string; team: string; name: string; accent: string }): HTMLCanvasElement {
  const { event, team, name, accent } = opts;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  base(ctx);

  ctx.fillStyle = accent;
  rounded(ctx, 0, 0, W, 14, 0);
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '700 20px Inter, sans-serif';
  ctx.fillText('H A C K A T H O N', 56, 90);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 46px Inter, sans-serif';
  wrapText(ctx, event, 56, 160, W - 112, 54);

  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(56, 300); ctx.lineTo(W - 56, 300); ctx.stroke();

  ctx.beginPath();
  ctx.arc(W / 2, 460, 110, 0, Math.PI * 2);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.font = '700 46px Inter, sans-serif';
  ctx.textAlign = 'center';
  const initials = team.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  ctx.fillText(initials, W / 2, 476);
  ctx.textAlign = 'left';

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '700 18px Inter, sans-serif';
  ctx.fillText('T E A M', 56, 630);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 40px Inter, sans-serif';
  ctx.fillText(team, 56, 678);

  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 2;
  rounded(ctx, 48, 720, W - 96, 86, 18);
  ctx.stroke();
  ctx.fillStyle = '#f2f2f2';
  ctx.font = '600 30px Inter, sans-serif';
  ctx.fillText(name, 72, 775);

  return canvas;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let yy = y;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, yy);
      line = word + ' ';
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, yy);
}

export interface HackathonBadgeInfo { event: string; team: string; accent: string }

export function badgeTexture(
  variant: 'hackerrank' | 'cursor' | 'hackathon',
  name: string,
  hackathon?: HackathonBadgeInfo
): THREE.CanvasTexture {
  const canvas = variant === 'hackerrank'
    ? drawHackerRankBadge(name)
    : variant === 'cursor'
    ? drawCursorBadge(name)
    : drawHackathonBadge({ event: hackathon!.event, team: hackathon!.team, name, accent: hackathon!.accent });
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
