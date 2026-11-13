import { useEffect, useRef, type MouseEvent } from 'react';
import { useCopy, usePreferences } from '../app/Preferences';
import type { Project } from '../content/types';
import { assetUrl } from '../content/site';
import styles from './ProjectDetail.module.css';
export function ProjectDetail({ project, index, onClose }: { project: Project; index: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null), { language } = usePreferences(), t = useCopy();
  useEffect(() => {
    const element = dialog.current!, opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element.showModal();
    return () => { element.close(); if (opener?.isConnected) opener.focus({ preventScroll: true }); };
  }, []);
  function backdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="project-detail-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={backdrop}>
    <div className={styles.top}><span>{project.guide ? 'LEARN' : 'CASE'} / {String(index + 1).padStart(3, '0')} — V.03</span><button autoFocus onClick={onClose} aria-label={t.closeProject}>×</button></div>
    <p className={styles.status}>{project.status === 'guide' ? t.guideLabel : project.status === 'placeholder' ? t.placeholder : project.status === 'published' ? t.published : t.development}</p><h2 id="project-detail-title">{project.title[language]}</h2><p className={styles.lead}>{project.summary[language]}</p>
    {project.guide && <>
      {project.cover && <figure className={styles.reference}><img src={assetUrl(project.cover)} alt={project.coverAlt?.[language] ?? project.title[language]}/><figcaption>{t.diagramNote}</figcaption></figure>}
      <p className={styles.disclaimer}>{t.guideNotice}</p>
      <div className={styles.row}><h3>{t.guideParts}</h3><ul>{project.guide.parts[language].map(part => <li key={part}>{part}</li>)}</ul></div>
      <div className={styles.row}><h3>{t.guideWiring}</h3><p>{project.guide.wiring[language]}</p></div>
      <div className={styles.row}><h3>{t.guideProgramming}</h3><p>{project.guide.programming[language]}</p></div>
      <div className={styles.row}><h3>{t.guideSteps}</h3><ol>{project.guide.steps[language].map(step => <li key={step}>{step}</li>)}</ol></div>
      <div className={styles.row}><h3>{t.guideSources}</h3><ul className={styles.sources}>{project.guide.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a></li>)}</ul></div>
    </>}
    {project.status === 'placeholder' && project.cover && <figure className={styles.reference}><img src={assetUrl(project.cover)} alt={project.coverAlt?.[language] ?? project.title[language]}/>{project.attribution && <figcaption>{project.attribution.author} · <a href={project.attribution.licenseUrl} target="_blank" rel="noopener noreferrer">{project.attribution.license}</a> · <a href={project.attribution.url} target="_blank" rel="noopener noreferrer">{t.sourceImage} ↗</a></figcaption>}</figure>}
    {project.story.map((item, index) => <div className={styles.row} key={index}><h3>{item.title[language]}</h3><p>{item.body[language]}</p></div>)}
    {project.repository && <a className={styles.source} href={project.repository} target="_blank" rel="noopener noreferrer">{t.sourceCode} ↗</a>}<p className={styles.foot}>{project.guide ? t.guideFoot : project.status === 'placeholder' ? t.placeholderFoot : t.caseFoot}</p>
  </dialog>;
}
