export const sculptureShapes = ['knot', 'torus', 'bloom'] as const;
export type SculptureShape = typeof sculptureShapes[number];
export interface Orbit { yaw: number; pitch: number }
export const initialOrbit: Orbit = { yaw: .18, pitch: .12 };
const TAU = Math.PI * 2;
export function rotateOrbit(orbit: Orbit, dx: number, dy: number, width: number): Orbit {
  const sensitivity = TAU / Math.max(width, 1);
  return {
    yaw: Math.atan2(Math.sin(orbit.yaw + dx * sensitivity), Math.cos(orbit.yaw + dx * sensitivity)),
    pitch: Math.max(-1.45, Math.min(1.45, orbit.pitch + dy * sensitivity)),
  };
}
interface Point { x: number; y: number; z: number }
interface Wire { points: Point[]; family: number }
function center(u: number): Point {
  // A trefoil with three open lobes and alternating over/under crossings.
  return { x: .46 * (Math.sin(u) + 2 * Math.sin(2 * u)), y: .46 * (Math.cos(u) - 2 * Math.cos(2 * u)), z: -.46 * Math.sin(3 * u) };
}
function surface(shape: SculptureShape, u: number, v: number): Point {
  if (shape === 'bloom') {
    const latitude = v / 2, r = 1.17 * (1 + .23 * Math.cos(5 * u) * Math.sin(latitude) ** 3);
    return { x: r * Math.sin(latitude) * Math.cos(u), y: r * Math.sin(latitude) * Math.sin(u), z: r * Math.cos(latitude) };
  }
  if (shape === 'torus') {
    const r = .4 + .055 * Math.sin(3 * u);
    return { x: (1.05 + r * Math.cos(v)) * Math.cos(u), y: (1.05 + r * Math.cos(v)) * Math.sin(u), z: r * Math.sin(v) };
  }
  const p = center(u), next = center(u + .001);
  const tangent = { x: next.x - p.x, y: next.y - p.y, z: next.z - p.z };
  const length = Math.hypot(tangent.x, tangent.y, tangent.z);
  const tx = tangent.x / length, ty = tangent.y / length, tz = tangent.z / length;
  const horizontal = Math.hypot(tx, ty), nx = -ty / horizontal, ny = tx / horizontal;
  const bx = -tz * ny, by = tz * nx, bz = tx * ny - ty * nx;
  return { x: p.x + .23 * (nx * Math.cos(v) + bx * Math.sin(v)), y: p.y + .23 * (ny * Math.cos(v) + by * Math.sin(v)), z: p.z + .23 * bz * Math.sin(v) };
}
// Geometry stays independent from the canvas, so adding a shape only changes this module.
export function sculptureWires(shape: SculptureShape): Wire[] {
  const rings = shape === 'knot' ? 64 : 40;
  return [
    ...Array.from({ length: rings }, (_, i) => ({ family: i % 4 === 0 ? 1 : 0, points: Array.from({ length: 49 }, (_, j) => surface(shape, i / rings * TAU, j / 48 * TAU)) })),
    ...Array.from({ length: 10 }, (_, i) => ({ family: 1, points: Array.from({ length: 193 }, (_, j) => surface(shape, j / 192 * TAU, i / 10 * TAU)) })),
  ];
}
export interface SculptureFace { points: Point[]; family: number }
export function sculptureFaces(): SculptureFace[] {
  const rings = 96, sides = 14;
  return Array.from({ length: rings * sides }, (_, index) => {
    const i = Math.floor(index / sides), j = index % sides;
    return { family: i < rings / 3 ? 0 : 1, points: [[i,j],[i+1,j],[i+1,j+1],[i,j+1]].map(([u,v]) => surface('knot',u / rings * TAU,v / sides * TAU)) };
  });
}
export function drawSculpture(ctx: CanvasRenderingContext2D, wires: Wire[], view: Orbit & { width: number; height: number }, colors: { primary: string; secondary: string; surface: string }, faces?: SculptureFace[]) {
  const { width, height, pitch, yaw } = view;
  ctx.clearRect(0, 0, width, height);
  const scale = Math.min(width, height) * .245;
  const projected = (faces ?? wires).map(wire => {
    const points = wire.points.map(p => {
      const x = p.x * Math.cos(yaw) + p.z * Math.sin(yaw), z0 = -p.x * Math.sin(yaw) + p.z * Math.cos(yaw);
      const y = p.y * Math.cos(pitch) - z0 * Math.sin(pitch), z = p.y * Math.sin(pitch) + z0 * Math.cos(pitch);
      const perspective = 5 / (5 - z);
      return { x: width / 2 + x * scale * perspective, y: height * .49 + y * scale * perspective, z };
    });
    return { ...wire, points, depth: points.reduce((sum, p) => sum + p.z, 0) / points.length };
  }).sort((a, b) => a.depth - b.depth);
  ctx.lineJoin = 'round';
  for (const wire of projected) {
    ctx.beginPath();
    wire.points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    if (faces) {
      ctx.closePath(); ctx.globalAlpha = 1; ctx.fillStyle = colors.surface; ctx.fill();
      ctx.fillStyle = wire.family ? colors.secondary : colors.primary;
      ctx.globalAlpha = Math.max(.04, .09 + wire.depth * .035); ctx.fill();
    }
    ctx.strokeStyle = wire.family ? colors.secondary : colors.primary;
    ctx.lineWidth = faces ? .85 : wire.family ? 1.35 : 1.9;
    ctx.globalAlpha = Math.max(.55, Math.min(1, .78 + wire.depth * .15));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
