export function moirePaths(count: number) {
  const safeCount = Math.min(72, Math.max(12, Math.round(count)));
  return Array.from({ length: safeCount * 2 }, (_, index) => {
    const family = index >= safeCount ? 1 : 0, line = index % safeCount, angle = family ? -.66 : .66, cx = family ? 270 : 230, radius = 18 + line / safeCount * 172;
    const points = Array.from({ length: 81 }, (_, step) => {
      const t = step / 80 * Math.PI * 2, x = radius * Math.cos(t), y = (52 + radius * .45) * Math.sin(t) + Math.sin(t * 3) * ((safeCount - 12) / 60) * 14;
      return `${step ? 'L' : 'M'}${(cx + x * Math.cos(angle) - y * Math.sin(angle)).toFixed(2)},${(200 + x * Math.sin(angle) + y * Math.cos(angle)).toFixed(2)}`;
    });
    return { d: `${points.join(' ')}Z`, family };
  });
}
