import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useCopy, usePreferences } from '../app/Preferences';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { drawSculpture, initialOrbit, rotateOrbit, sculptureShapes, sculptureWires, type SculptureShape } from '../graphics/sculpture';
import { ChoiceGroup } from './ChoiceGroup';
import styles from './Sculpture.module.css';

export function Sculpture() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const orbit = useRef({ ...initialOrbit });
  const ghost = useRef<HTMLCanvasElement>(null);
  const [glitch, setGlitch] = useState(0);
  const invalidate = useRef(() => {});
  const playing = useRef(false);
  const t = useCopy(), { theme } = usePreferences(), hintId = useId();
  const [shape, setShape] = useState<SculptureShape>('knot');
  const [moving, setMoving] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [angles, setAngles] = useState({ ...initialOrbit });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const wires = useMemo(() => sculptureWires(shape), [shape]);
  useEffect(() => { if (reduced) setMoving(false); }, [reduced]);
  useEffect(() => { playing.current = moving; setAngles({ ...orbit.current }); invalidate.current(); }, [moving]);

  useEffect(() => {
    const element = canvas.current!, ctx = element.getContext('2d');
    if (!ctx) return;
    const palette = getComputedStyle(document.documentElement);
    const colors = { primary: palette.getPropertyValue('--art-primary').trim(), secondary: palette.getPropertyValue('--art-secondary').trim() };
    const size = { width: 0, height: 0 };
    let frame = 0, last = 0, lastLabel = 0;
    let inView = false;
    const visible = () => inView && !document.hidden;
    const draw = () => drawSculpture(ctx, wires, { ...size, ...orbit.current }, colors);
    const requestDraw = () => { if (!frame && visible()) frame = requestAnimationFrame(animate); };
    invalidate.current = requestDraw;
    const resize = () => {
      const box = element.getBoundingClientRect(), ratio = Math.min(devicePixelRatio || 1, 2);
      size.width = box.width; size.height = box.height;
      element.width = Math.round(box.width * ratio); element.height = Math.round(box.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); requestDraw();
    };
    let drag: { id: number; x: number; y: number } | null = null;
    const down = (event: PointerEvent) => {
      if (event.button !== 0 || !event.isPrimary) return;
      playing.current = false; setMoving(false);
      element.focus({ preventScroll: true });
      element.setPointerCapture(event.pointerId);
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
      element.dataset.dragging = 'true';
    };
    const move = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      orbit.current = rotateOrbit(orbit.current, event.clientX - drag.x, event.clientY - drag.y, size.width);
      drag.x = event.clientX; drag.y = event.clientY;
      setAngles({ ...orbit.current }); requestDraw();
    };
    const end = () => { drag = null; delete element.dataset.dragging; };
    const key = (event: KeyboardEvent) => {
      const offsets: Record<string, [number, number]> = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
      if (event.key !== 'Home' && !offsets[event.key]) return;
      event.preventDefault(); playing.current = false; setMoving(false);
      orbit.current = event.key === 'Home' ? { ...initialOrbit } : rotateOrbit(orbit.current, ...offsets[event.key], 360);
      setAngles({ ...orbit.current }); requestDraw();
    };
    const animate = (time: number) => {
      frame = 0;
      if (!visible()) { last = 0; return; }
      if (playing.current && !reduced && last && time - last < 32) { frame = requestAnimationFrame(animate); return; }
      if (last && playing.current && !reduced) orbit.current = rotateOrbit(orbit.current, Math.min(time - last, 60) / 48000 * 500, 0, 500);
      last = time; draw();
      if (playing.current && time - lastLabel > 150) { setAngles({ ...orbit.current }); lastLabel = time; }
      if (playing.current && !reduced) frame = requestAnimationFrame(animate); else last = 0;
    };
    const visibility = () => { cancelAnimationFrame(frame); frame = 0; last = 0; if (visible()) requestDraw(); };
    const intersection = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; visibility(); });
    intersection.observe(element);
    const observer = new ResizeObserver(resize);
    observer.observe(element); resize();
    element.addEventListener('pointerdown', down); element.addEventListener('pointermove', move);
    element.addEventListener('pointerup', end); element.addEventListener('pointercancel', end); element.addEventListener('lostpointercapture', end);
    element.addEventListener('keydown', key); document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect(); intersection.disconnect(); cancelAnimationFrame(frame); invalidate.current = () => {};
      if (drag && element.hasPointerCapture(drag.id)) element.releasePointerCapture(drag.id);
      end();
      element.removeEventListener('pointerdown', down); element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerup', end); element.removeEventListener('pointercancel', end); element.removeEventListener('lostpointercapture', end);
      element.removeEventListener('keydown', key); document.removeEventListener('visibilitychange', visibility);
    };
  }, [theme, reduced, wires]);

  const reset = () => { playing.current = false; setMoving(false); orbit.current = { ...initialOrbit }; setAngles({ ...initialOrbit }); invalidate.current(); };
  const changeShape = (value: SculptureShape) => {
    if (value === shape) return;
    const source = canvas.current, target = ghost.current;
    if (source && target && !reduced) { target.width = source.width; target.height = source.height; target.getContext('2d')?.drawImage(source, 0, 0); setGlitch(value => value + 1); }
    setShape(value);
  };
  const labels = { knot: t.knot, torus: t.torus, bloom: t.bloom };
  return <div className={styles.wrapper}>
    <div className={styles.toolbar}><span className={styles.label}>{t.form}</span><ChoiceGroup label={t.form} value={shape} choices={sculptureShapes.map(value => ({ value, label: labels[value] }))} onChange={changeShape}/></div>
    <div className={styles.visual}>
      <div className={styles.top}><span>MR—004 / {labels[shape]}</span><span aria-hidden="true">+</span></div>
      <canvas ref={canvas} tabIndex={0} role="img" aria-label={`${t.artAlt}: ${labels[shape]}`} aria-describedby={hintId} aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home"/>
      <canvas ref={ghost} className={styles.ghost} aria-hidden="true" style={{ animationName: glitch ? (glitch % 2 ? styles.interferenceA : styles.interferenceB) : undefined }}/>
      <div className={styles.coordinates} aria-hidden="true">↔ {Math.round(angles.yaw * 180 / Math.PI)}°<br/>↕ {Math.round(angles.pitch * 180 / Math.PI)}°</div>
      <div className={styles.bottom}><span>{t.artLabel}</span><span aria-hidden="true">↗</span></div>
    </div>
    <p id={hintId} className={styles.hint}>{t.artHint}</p>
    <div className={styles.controls}>
      <button type="button" onClick={reset}><span aria-hidden="true">↺</span>{t.resetView}</button>
      <button type="button" aria-pressed={moving} onClick={() => setMoving(value => !value)} disabled={reduced}><span aria-hidden="true">{moving ? 'Ⅱ' : '▷'}</span>{moving ? t.pause : t.animate}</button>
    </div>
    {reduced && <p className={styles.hint}>{t.reducedArt}</p>}
  </div>;
}
