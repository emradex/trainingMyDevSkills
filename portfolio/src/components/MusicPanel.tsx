import { useEffect, useRef, useState } from 'react';
import { useCopy } from '../app/Preferences';
import { music } from '../content/music';
import { loadSpotify, type SpotifyController } from '../graphics/spotify';
import styles from './MusicPanel.module.css';

export function MusicPanel({ open, onOpen, onClose, playing, onPlayback, controller }: {
  open: boolean; onOpen: () => void; onClose: () => void; playing: boolean; onPlayback: (playing: boolean) => void;
  controller: React.MutableRefObject<SpotifyController | null>;
}) {
  const t = useCopy(), host = useRef<HTMLDivElement>(null), close = useRef<HTMLButtonElement>(null);
  const [activated, setActivated] = useState(false), [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [expanded, setExpanded] = useState(false);
  const playback = useRef(onPlayback); playback.current = onPlayback;
  const wasOpen = useRef(false);
  const launcher = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      setActivated(true); close.current?.focus({ preventScroll: true });
    } else if (wasOpen.current) launcher.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!activated) return;
    let disposed = false;
    const slot = document.createElement('div'); host.current!.append(slot);
    const timer = window.setTimeout(() => { if (!disposed) setStatus('error'); }, 15000);
    loadSpotify().then(api => {
      if (disposed) return;
      api.createController(slot, { uri: music.playlistUri, width: '100%', height: 152 }, player => {
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
  return <>
    {!open && <div className={styles.launcher}><button ref={launcher} type="button" onClick={onOpen} aria-controls="music-panel" aria-expanded={false}><span className={styles.symbol} aria-hidden="true">♫</span><span><strong>{t.music}</strong><small>Night visions</small></span>{playing && <i className={styles.playing} aria-label={t.musicPlaying}/>}<span aria-hidden="true">↗</span></button>{playing && <button className={styles.pause} type="button" onClick={() => controller.current?.pause()} aria-label={t.pauseMusic}>Ⅱ</button>}</div>}
    <aside id="music-panel" className={styles.panel} data-open={open || undefined} data-expanded={expanded || undefined} inert={!open} aria-hidden={!open} aria-label={t.musicPanel}>
    <div className={styles.head}><div><span className={styles.eyebrow}>SOUND / 01</span><h2>{t.musicSelection}</h2></div><button ref={close} type="button" onClick={onClose} aria-label={t.minimizeMusic}>−</button></div>
    {status === 'loading' && <p role="status" className={styles.message}>{t.musicLoading}</p>}
    <div ref={host} className={styles.embed}/>
    {status === 'error' && <p role="status" className={styles.message}>{t.musicUnavailable}</p>}
    <div className={styles.actions}><button type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? t.compactMusic : t.expandMusic} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button><a className={styles.external} href={music.playlistUrl} target="_blank" rel="noopener noreferrer">Spotify ↗<span className={styles.srOnly}> · {t.openSpotify}</span></a></div>
  </aside></>;
}
