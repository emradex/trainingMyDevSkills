export function shadowOffset(x: number, y: number, width: number, height: number) {
  const bounded = (value: number) => Math.max(-4, Math.min(4, value));
  return { x: bounded(width > 0 ? (x / width - .5) * 8 : 0), y: bounded(height > 0 ? (y / height - .5) * 8 : 0) };
}
