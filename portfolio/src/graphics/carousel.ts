export function nearestCard(positions: number[], center: number) {
  return positions.reduce((nearest, position, index) => Math.abs(position - center) < Math.abs(positions[nearest] - center) ? index : nearest, 0);
}
export function boundedCard(index: number, count: number) { return Math.max(0, Math.min(Math.max(0,count - 1), index)); }
