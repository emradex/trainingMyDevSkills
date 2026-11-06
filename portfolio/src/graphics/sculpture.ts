export interface SculptureView { width: number; height: number; x: number; y: number; turn: number; }
interface Point { x: number; y: number; z: number }
const TAU = Math.PI * 2;
function surface(u: number, v: number, view: SculptureView): Point {
  const radius = .4 + .055 * Math.sin(u * 3);
  const x = (1.05 + radius * Math.cos(v)) * Math.cos(u), y = (1.05 + radius * Math.cos(v)) * Math.sin(u), z = radius * Math.sin(v);
  const ax = .85 + view.y * .4, ay = -.2 + view.x * .55 + view.turn, az = -.48;
  const y1 = y * Math.cos(ax) - z * Math.sin(ax), z1 = y * Math.sin(ax) + z * Math.cos(ax);
  const x1 = x * Math.cos(ay) + z1 * Math.sin(ay), z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
  const x2 = x1 * Math.cos(az) - y1 * Math.sin(az), y2 = x1 * Math.sin(az) + y1 * Math.cos(az);
  const perspective = 4.8 / (4.8 - z2), scale = Math.min(view.width * .265, view.height * .30);
  return { x: view.width * .5 + x2 * scale * perspective, y: view.height * .49 + y2 * scale * perspective, z: z2 };
}
export function drawSculpture(ctx: CanvasRenderingContext2D, view: SculptureView, colors: { lime: string; violet: string; foreground: string }) {
  ctx.clearRect(0, 0, view.width, view.height);
  const paths: { points: Point[]; color: string; z: number; thin?: boolean }[] = [];
  for (let ring = 0; ring < 48; ring++) {
    const points = Array.from({ length: 65 }, (_, step) => surface(ring / 48 * TAU, step / 64 * TAU, view));
    paths.push({ points, color: ring > 26 && ring < 44 ? colors.violet : colors.lime, z: points.reduce((sum, point) => sum + point.z, 0) / points.length });
  }
  for (let ring = 0; ring < 9; ring++) {
    const points = Array.from({ length: 113 }, (_, step) => surface(step / 112 * TAU, ring / 9 * TAU, view));
    paths.push({ points, color: ring % 3 === 0 ? colors.violet : colors.lime, z: points.reduce((sum, point) => sum + point.z, 0) / points.length, thin: true });
  }
  paths.sort((a, b) => a.z - b.z);
  for (const path of paths) {
    ctx.beginPath(); path.points.forEach((point, index) => index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y));
    ctx.strokeStyle = path.color; ctx.globalAlpha = path.thin ? .4 : Math.max(.3, Math.min(1, .62 + path.z * .28)); ctx.lineWidth = path.thin ? .65 : .9; ctx.stroke();
  }
  ctx.globalAlpha = .9; ctx.fillStyle = colors.foreground;
  for (const u of [0, Math.PI * .65, Math.PI * 1.3]) { const point = surface(u, 0, view); ctx.fillRect(point.x - 2, point.y - 2, 4, 4); }
  ctx.globalAlpha = 1;
}
