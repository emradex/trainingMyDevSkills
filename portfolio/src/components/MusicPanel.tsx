import { useEffect, useRef, useState } from 'react';
import { useCopy } from '../app/Preferences';
import { music } from '../content/music';
import { loadSpotify, type SpotifyController } from '../graphics/spotify';
import styles from './MusicPanel.module.css';

export function MusicPanel({ open, onClose, onPlayback, controller }: {
  open: boolean; onClose: () => void; onPlayback: (playing: boolean) => void;
  controller: React.MutableRefObject<SpotifyController | null>;
}) {
  const t = useCopy(), host = useRef<HTMLDivElement>(null), close = useRef<HTMLButtonElement>(null);
  const [activated, setActivated] = useState(false), [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const playback = useRef(onPlayback); playback.current = onPlayback;
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (open) {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setActivated(true); close.current?.focus({ preventScroll: true });
    } else if (opener.current?.isConnected) { opener.current.focus({ preventScroll: true }); opener.current = null; }
  }, [open]);
  useEffect(() => {
    if (!activated) return;
    let disposed = false;
    const slot = document.createElement('div'); host.current!.append(slot);
    const timer = window.setTimeout(() => { if (!disposed) setStatus('error'); }, 15000);
    loadSpotify().then(api => {
      if (disposed) return;
      api.createController(slot, { uri: music.playlistUri, width: '100%', height: 352 }, player => {
        if (disposed) { player.destroy(); return; }
        controller.current = player;
        player.addListener('ready', () => { if (!disposed) { clearTimeout(timer); setStatus('ready'); } });
        player.addListener('playback_update', event => { if (!disposed) playback.current(!event.data.isPaused); });
      });
    }).catch(() => { if (!disposed) { clearTimeout(timer); setStatus('error'); } });
    return () => { disposed = true; clearTimeout(timer); controller.current?.destroy(); controller.current = null; slot.remove(); };
  }, [activated, controller]);
  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open, onClose]);
  return <aside id="music-panel" className={styles.panel} data-open={open || undefined} inert={!open} aria-hidden={!open} aria-label={t.musicPanel}>
    <div className={styles.head}><div><span className={styles.eyebrow}>SOUND / 01</span><h2>{t.musicSelection}</h2></div><button ref={close} type="button" onClick={onClose} aria-label={t.minimizeMusic}>−</button></div>
    <p className={styles.note}>{t.musicNote}</p>
    {status === 'loading' && <p role="status" className={styles.message}>{t.musicLoading}</p>}
    <div ref={host} className={styles.embed}/>
    {status === 'error' && <p role="status" className={styles.message}>{t.musicUnavailable}</p>}
    <a className={styles.external} href={music.playlistUrl} target="_blank" rel="noopener noreferrer">{t.openSpotify} ↗</a>
  </aside>;
}
