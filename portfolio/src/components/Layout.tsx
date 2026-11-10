import { useCallback, useEffect, useRef, useState, type CSSProperties, type PropsWithChildren } from 'react';
import { useCopy, usePreferences } from '../app/Preferences';
import { activeSections } from '../app/sections';
import { useActiveSection } from '../hooks/useActiveSection';
import { CvLink } from './CvLink';
import { MusicPanel } from './MusicPanel';
import type { SpotifyController } from '../graphics/spotify';
import styles from './Layout.module.css';

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; const total = document.documentElement.scrollHeight - innerHeight; setProgress(total > 0 ? Math.max(0, Math.min(1, scrollY / total)) : 0); }); };
    addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', update); removeEventListener('resize', update); };
  }, []);
  return <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true"/>;
}
export function Layout({ children }: PropsWithChildren) {
  const t = useCopy(), { language, theme, setLanguage, toggleTheme } = usePreferences();
  const header = useRef<HTMLElement>(null), controller = useRef<SpotifyController | null>(null);
  const [docked, setDocked] = useState(false), [musicOpen, setMusicOpen] = useState(false), [playing, setPlaying] = useState(false);
  const navigation = activeSections().filter(section => section.showInNavigation);
  const active = useActiveSection(navigation.map(section => section.id));
  const index = Math.max(0, navigation.findIndex(section => section.id === active));
  const closeMusic = useCallback(() => setMusicOpen(false), []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setDocked(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(header.current!); return () => observer.disconnect();
  }, []);
  const musicButton = (floating = false) => <button type="button" className={`signal-button ${styles.musicButton}`} aria-expanded={musicOpen} aria-controls="music-panel" onClick={() => setMusicOpen(value => !value)}><span aria-hidden="true">♫</span>{t.music}{floating && playing && <i className={styles.playing} aria-label={t.musicPlaying}/>}</button>;
  return <>
    <ReadingProgress/><a className={styles.skip} href="#contenido">{t.skip}</a>
    <header ref={header} className={`wrap ${styles.header}`}>
      <a className={styles.welcome} href="#inicio" aria-label={t.welcome} data-text={t.welcome}>{t.welcome}<span aria-hidden="true">↗</span></a>
      <nav className={styles.nav} aria-label={t.navLabel}>{navigation.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>{section.label[language]}</a>)}</nav>
      <div className={styles.preferences}><div className={styles.languages} role="group" aria-label={t.language}>{(['es', 'en'] as const).map(lang => <button type="button" key={lang} onClick={() => setLanguage(lang)} aria-pressed={lang === language} lang={lang}>{lang.toUpperCase()}</button>)}</div><button type="button" className={styles.theme} onClick={toggleTheme} aria-label={theme === 'dark' ? t.light : t.dark}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></svg></button></div>
      <div className={styles.headerActions}><div className={styles.cv}><CvLink/></div>{musicButton()}</div>
    </header>
    <main id="contenido" tabIndex={-1}>{children}</main>
    <footer className={`wrap ${styles.footer}`}><a className={styles.brand} href="#inicio">mauro radesca<span aria-hidden="true">↗</span></a><span>© 2026 / {t.footer}</span><a className={styles.top} href="#inicio">{t.top} ↑</a></footer>
    <div className={styles.dock} data-visible={docked || undefined} inert={!docked} aria-hidden={!docked}>
      <nav className={styles.dockNav} aria-label={t.floatingNav} style={{ '--active-index': index, '--section-count': navigation.length } as CSSProperties}>
        {navigation.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>{section.id === 'laboratorio' ? t.labShort : section.label[language]}</a>)}
      </nav>
      <div className={styles.dockMusic}>{musicButton(true)}{playing && <button type="button" className={styles.pauseMusic} onClick={() => controller.current?.pause()} aria-label={t.pauseMusic}>Ⅱ</button>}</div>
    </div>
    <MusicPanel open={musicOpen} onClose={closeMusic} onPlayback={setPlaying} controller={controller}/>
  </>;
}
