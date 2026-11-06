import { useEffect, useRef, useState } from 'react';
import { useCopy, usePreferences } from '../app/Preferences';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { drawSculpture } from '../graphics/sculpture';
import styles from './Sculpture.module.css';
export function Sculpture() {
  const canvas = useRef<HTMLCanvasElement>(null), t = useCopy(), { theme } = usePreferences();
  const [moving, setMoving] = useState(false), [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => { if (reduced) setMoving(false); }, [reduced]);
  useEffect(() => {
    const element = canvas.current!, ctx = element.getContext('2d'); if (!ctx) return;
    const palette = getComputedStyle(document.documentElement);
    const colors = { lime: palette.getPropertyValue('--lime-ink').trim(), violet: palette.getPropertyValue('--violet-ink').trim(), foreground: palette.getPropertyValue('--foreground').trim() };
    const view = { width: 0, height: 0, x: 0, y: 0, turn: 0 };
    let frame = 0, last = 0;
    const draw = () => drawSculpture(ctx, view, colors);
    const resize = () => {
      const box = element.getBoundingClientRect(), ratio = Math.min(devicePixelRatio || 1, 2);
      view.width = box.width; view.height = box.height; element.width = Math.round(box.width * ratio); element.height = Math.round(box.height * ratio); ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw();
    };
    const move = (event: PointerEvent) => {
      if (reduced || event.pointerType === 'touch') return;
      const box = element.getBoundingClientRect(); view.x = (event.clientX - box.left) / box.width * 2 - 1; view.y = (event.clientY - box.top) / box.height * 2 - 1;
      setCoordinates({ x: view.x, y: view.y }); if (!moving) draw();
    };
    const leave = () => { view.x = 0; view.y = 0; setCoordinates({ x: 0, y: 0 }); if (!moving) draw(); };
    const animate = (time: number) => { if (last) view.turn += Math.min(time - last, 60) * .00015; last = time; draw(); frame = requestAnimationFrame(animate); };
    const visibility = () => { if (document.hidden) setMoving(false); };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    element.addEventListener('pointermove', move); element.addEventListener('pointerleave', leave); document.addEventListener('visibilitychange', visibility);
    if (moving && !reduced) frame = requestAnimationFrame(animate);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', visibility); };
  }, [theme, moving, reduced]);
  return <div className={styles.wrapper}><div className={styles.visual}><div className={styles.top}><span>MR—003</span><span aria-hidden="true">+</span></div><canvas ref={canvas} role="img" aria-label={t.artAlt}/><div className={styles.coordinates} aria-hidden="true">X {coordinates.x.toFixed(2)}<br/>Y {coordinates.y.toFixed(2)}</div><div className={styles.bottom}><span>{t.artLabel}</span><span aria-hidden="true">↗</span></div></div><div className={styles.controls}><span>{t.artHint}</span><button aria-pressed={moving} onClick={() => setMoving(value => !value)} disabled={reduced}><span aria-hidden="true">{moving ? 'Ⅱ' : '▷'}</span>{moving ? t.pause : t.animate}</button></div></div>;
}
