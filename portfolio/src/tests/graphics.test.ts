import { describe, expect, it } from 'vitest';
import { initialOrbit, rotateOrbit, sculptureShapes, sculptureWires } from '../graphics/sculpture';
import { patternPaths, patternShapes } from '../graphics/moire';

describe('direct rotation', () => {
  it('keeps a complete turn equivalent and clamps pitch at both poles', () => {
    const turned = rotateOrbit(initialOrbit, 500, 0, 500);
    expect(turned.yaw).toBeCloseTo(initialOrbit.yaw);
    expect(turned.pitch).toBe(initialOrbit.pitch);
    expect(rotateOrbit(initialOrbit, 0, 10000, 320).pitch).toBe(1.45);
    expect(rotateOrbit(initialOrbit, 0, -10000, 320).pitch).toBe(-1.45);
    expect(rotateOrbit(initialOrbit, 0, 0, 0)).toEqual(initialOrbit);
    expect(initialOrbit).toEqual({ yaw: -.4, pitch: .65 });
  });
  it('keeps all sculpture variants finite and inside a common viewing volume', () => {
    for (const shape of sculptureShapes) {
      const wires = sculptureWires(shape);
      expect(wires.length).toBeGreaterThan(40);
      for (const wire of wires) for (const point of wire.points) {
        expect(Number.isFinite(point.x + point.y + point.z)).toBe(true);
        expect(Math.hypot(point.x, point.y, point.z)).toBeLessThan(1.65);
      }
    }
  });
});

describe('playable patterns', () => {
  it('keeps every pattern within its SVG frame even at control extremes', () => {
    for (const shape of patternShapes) for (const density of [12, 72]) for (const deformation of [0, 100]) {
      const paths = patternPaths({ shape, density, deformation });
      expect(paths).toHaveLength(density * 2);
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const path of paths) {
        expect(path.d).not.toMatch(/NaN|Infinity/);
        const points = [...path.d.matchAll(/[ML](-?[\d.]+),(-?[\d.]+)/g)];
        expect(points.length).toBe(241);
        for (const point of points) {
          minX = Math.min(minX, Number(point[1])); maxX = Math.max(maxX, Number(point[1]));
          minY = Math.min(minY, Number(point[2])); maxY = Math.max(maxY, Number(point[2]));
        }
      }
    }
  });
});
