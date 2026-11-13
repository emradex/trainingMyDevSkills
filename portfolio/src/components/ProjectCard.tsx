import { useCopy, usePreferences } from '../app/Preferences';
import type { Project } from '../content/types';
import { assetUrl } from '../content/site';
import { usePointerShadow } from '../hooks/usePointerShadow';
import styles from './ProjectCard.module.css';

function Preview({ project, index }: { project: Project; index: number }) {
  const t = useCopy();
  return project.cover ? <img className={styles.cover} src={assetUrl(project.cover)} alt="" loading="lazy" decoding="async"/> : <>
    <span className={styles.number}>CASE / {String(index + 1).padStart(3, '0')}</span>
    <span className={styles.browser}><span className={styles.browserTop}>● ● ● <b>mauro radesca ↗</b></span><span className={styles.browserBody}><span>Mauro<br/>Radesca<span className={styles.dot}>.</span><small>{t.signature}</small></span><span className={styles.orbit}/></span><span className={styles.browserFooter}>DEVELOPMENT + IT / V.03</span></span>
    <span className={styles.stamp}>PERSONAL EDITION / 2026</span>
  </>;
}
export function ProjectCard({ project, index, onOpen, signal = 0 }: { project: Project; index: number; onOpen: () => void; signal?: number }) {
  const t = useCopy(), { language } = usePreferences(), shadow = usePointerShadow();
  const placeholder = project.status === 'placeholder', guide = project.status === 'guide';
  return <button {...shadow} type="button" className={styles.card} onClick={onOpen} aria-haspopup="dialog">
    <span className={styles.visual} aria-hidden="true">
      <Preview project={project} index={index}/>
      {signal > 0 && <span key={signal} className={styles.interference}>{[0,1,2].map(layer => <span key={layer} className={styles.slice}><Preview project={project} index={index}/></span>)}</span>}
    </span>
    <span className={styles.info}><span className={styles.status}><i/>{guide ? t.guideLabel : placeholder ? t.placeholder : project.status === 'published' ? t.published : t.development}</span><span className={styles.title}>{project.title[language]}</span><span className={styles.summary}>{project.summary[language]}</span><span className={styles.tech}>{project.technologies.join(' / ')}</span><span className={styles.cta}>{guide ? t.readGuide : placeholder ? t.viewImage : t.process}<span aria-hidden="true">↗</span></span></span>
  </button>;
}
