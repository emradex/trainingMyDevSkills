export const patternShapes = ['rosette', 'orbits', 'moire'] as const;
export type PatternShape = typeof patternShapes[number];
export interface PatternOptions { shape: PatternShape; density: number; deformation: number }
export const initialPattern: PatternOptions = { shape: 'rosette', density: 24, deformation: 48 };
const TAU = Math.PI * 2;
export function patternPaths({ shape, density, deformation }: PatternOptions) {
  const count = Math.min(72, Math.max(12, Math.round(density)));
  const amount = Math.min(100, Math.max(0, deformation)) / 100;
  return Array.from({ length: count * 2 }, (_, index) => {
    const family = index >= count ? 1 : 0, line = index % count, progress = line / Math.max(count - 1, 1);
    const points = Array.from({ length: 241 }, (_, step) => {
      const t = step / 240 * TAU;
      let x: number, y: number;
      if (shape === 'moire') {
        const angle = (family ? -1 : 1) * (.35 + amount * .65), radius = 18 + progress * 172;
        const localX = radius * Math.cos(t), localY = (52 + radius * .45) * Math.sin(t) + Math.sin(t * 3) * amount * 14;
        x = (family ? 20 : -20) + localX * Math.cos(angle) - localY * Math.sin(angle);
        y = localX * Math.sin(angle) + localY * Math.cos(angle);
      } else if (shape === 'rosette') {
        const petals = 5 + Math.round(amount * 4), phase = family * .45 + progress * amount * .75;
        const radius = (36 + progress * 138) * (.72 + (.17 + amount * .11) * Math.cos(petals * t + phase));
        const angle = t + family * Math.PI / petals;
        x = radius * Math.cos(angle); y = radius * Math.sin(angle);
      } else {
        const radius = 40 + progress * 132, phase = family * Math.PI / 2 + amount * Math.PI;
        x = radius * Math.sin(3 * t + phase + progress * amount);
        y = radius * Math.sin(2 * t + family * .5) * (.7 + amount * .2);
      }
      return `${step ? 'L' : 'M'}${(250 + x).toFixed(2)},${(200 + y).toFixed(2)}`;
    });
    return { d: `${points.join(' ')}Z`, family };
  });
}
// Original experiment remains available as a separate shape.
export function moirePaths(count: number) { return patternPaths({ shape: 'moire', density: count, deformation: (count - 12) / 60 * 100 }); }
