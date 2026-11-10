import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { shadowOffset } from './shadow';
export function usePointerShadow() {
  const allowed = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (!allowed || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const next = shadowOffset(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setOffset(next));
  }
  function onPointerLeave() { cancelAnimationFrame(frame.current); setOffset({ x: 0, y: 0 }); }
  const style = { '--shadow-x': `${allowed ? offset.x : 0}px`, '--shadow-y': `${allowed ? offset.y : 0}px` } as CSSProperties;
  return { onPointerMove, onPointerLeave, style };
}
