import { useCopy, usePreferences } from '../app/Preferences';
import type { Project } from '../content/types';
import { assetUrl } from '../content/site';
import { usePointerShadow } from '../hooks/usePointerShadow';
import styles from './ProjectCard.module.css';
export function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const t = useCopy(), { language } = usePreferences(), shadow = usePointerShadow();
  return <button {...shadow} className={styles.card} onClick={onOpen} aria-haspopup="dialog">
    <span className={styles.visual} aria-hidden="true">{project.cover ? <img className={styles.cover} src={assetUrl(project.cover)} alt="" loading="lazy"/> : <><span className={styles.number}>CASE / {String(index + 1).padStart(3, '0')}</span><span className={styles.browser}><span className={styles.browserTop}>● ● ● <b>mauro radesca ↗</b></span><span className={styles.browserBody}><span>Mauro<br/>Radesca<span className={styles.dot}>.</span><small>{t.signature}</small></span><span className={styles.orbit}/></span><span className={styles.browserFooter}>DEVELOPMENT + IT / V.03</span></span><span className={styles.stamp}>PERSONAL EDITION / 2026</span></>}</span>
    <span className={styles.info}><span className={styles.status}><i/>{project.status === 'published' ? t.published : t.development}</span><span className={styles.title}>{project.title[language]}</span><span className={styles.summary}>{project.summary[language]}</span><span className={styles.tech}>{project.technologies.join(' / ')}</span><span className={styles.cta}>{t.process}<span aria-hidden="true">↗</span></span></span>
  </button>;
}
