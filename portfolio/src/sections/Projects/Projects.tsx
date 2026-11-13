import { useEffect, useRef, useState } from 'react';
import { useCopy, usePreferences } from '../../app/Preferences';
import { projects } from '../../content/projects';
import type { Project } from '../../content/types';
import { SectionLabel, SectionHeading } from '../../components/SectionHeading';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectDetail } from '../../components/ProjectDetail';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { boundedCard, nearestCard } from '../../graphics/carousel';
import styles from './Projects.module.css';

export default function Projects({ id }: { id: string }) {
  const { language } = usePreferences();
  const t = useCopy(), [selected, setSelected] = useState<Project | null>(null);
  const [active, setActive] = useState(0), [signal, setSignal] = useState(0);
  const track = useRef<HTMLDivElement>(null), activeRef = useRef(0);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const select = (index: number) => {
    const next = boundedCard(index, projects.length), scroller = track.current!, card = scroller.children[next] as HTMLElement;
    scroller.scrollTo({ left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2, behavior: reduced ? 'instant' : 'smooth' });
  };
  useEffect(() => {
    const scroller = track.current!;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const cards = [...scroller.children] as HTMLElement[];
      const next = nearestCard(cards.map(card => card.offsetLeft + card.offsetWidth / 2), scroller.scrollLeft + scroller.clientWidth / 2);
      if (next !== activeRef.current) { activeRef.current = next; setActive(next); setSignal(value => value + 1); }
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(update); observer.observe(scroller);
    scroller.addEventListener('scroll', update, { passive: true }); update();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); scroller.removeEventListener('scroll', update); };
  }, []);
  const real = projects.filter(project => project.status !== 'placeholder' && project.status !== 'guide').length;
  const guides = projects.filter(project => project.status === 'guide').length;
  return <section id={id} className={`section wrap ${styles.section}`} aria-labelledby="projects-title">
    <SectionLabel text={t.projectsLabel} meta={t.projectsMeta}/><SectionHeading id="projects-title" title={t.projectsTitle} description={t.projectsIntro}/>
    <div className={styles.controls}><span className={styles.counter} role="status" aria-live="polite">{String(active + 1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')} <span aria-hidden="true">— {projects[active].title[language]}</span></span><div><button type="button" className="signal-button" disabled={active === 0} aria-label={t.previousProject} onClick={() => select(active - 1)}>←</button><button type="button" className="signal-button" disabled={active === projects.length - 1} aria-label={t.nextProject} onClick={() => select(active + 1)}>→</button></div></div>
    <div ref={track} className={styles.track} role="region" aria-roledescription={t.carouselRole} aria-label={t.carouselLabel} tabIndex={0} onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); select(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
      {projects.map((project, index) => <div key={project.id} className={styles.slide} data-active={active === index || undefined} role="group" aria-roledescription={t.slideRole} aria-label={`${index + 1} / ${projects.length}`} onFocusCapture={() => { if (activeRef.current !== index) select(index); }}><ProjectCard project={project} index={index} signal={index === active ? signal : 0} onOpen={() => setSelected(project)}/></div>)}
    </div>
    <div className={styles.note}><span>{real} {real === 1 ? t.projectSingular : t.projectPlural} + {guides} {t.learningGuides}</span><span>[ {String(projects.length).padStart(2,'0')} — ∞ ]</span></div>
    {selected && <ProjectDetail project={selected} index={projects.findIndex(project => project.id === selected.id)} onClose={() => setSelected(null)}/>}
  </section>;
}
