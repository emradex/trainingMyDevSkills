import { useEffect, useRef, type MouseEvent } from 'react';
import { useCopy, usePreferences } from '../app/Preferences';
import type { Project } from '../content/types';
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
    <div className={styles.top}><span>CASE / {String(index + 1).padStart(3, '0')} — V.03</span><button autoFocus onClick={onClose} aria-label={t.closeProject}>×</button></div>
    <p className={styles.status}>{project.status === 'published' ? t.published : t.development}</p><h2 id="project-detail-title">{project.title[language]}</h2><p className={styles.lead}>{project.summary[language]}</p>
    {project.story.map((item, index) => <div className={styles.row} key={index}><h3>{item.title[language]}</h3><p>{item.body[language]}</p></div>)}
    {project.repository && <a className={styles.source} href={project.repository} target="_blank" rel="noopener noreferrer">{t.sourceCode} ↗</a>}<p className={styles.foot}>{t.caseFoot}</p>
  </dialog>;
}
