import { useState } from 'react';
import { useCopy } from '../../app/Preferences';
import { projects } from '../../content/projects';
import type { Project } from '../../content/types';
import { SectionLabel, SectionHeading } from '../../components/SectionHeading';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectDetail } from '../../components/ProjectDetail';
import styles from './Projects.module.css';
export default function Projects({ id }: { id: string }) {
  const t = useCopy(), [selected, setSelected] = useState<Project | null>(null);
  return <section id={id} className="section wrap" aria-labelledby="projects-title"><SectionLabel text={t.projectsLabel} meta={t.projectsMeta}/><SectionHeading id="projects-title" title={t.projectsTitle} description={t.projectsIntro}/><div className={styles.list}>{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelected(project)}/>)}</div><div className={styles.note}><span>{projects.length === 1 ? t.projectNote : `${projects.length} ${t.totalProjects}`}</span><span>[ {String(projects.length).padStart(2, '0')} — ∞ ]</span></div>{selected && <ProjectDetail project={selected} index={projects.findIndex(project => project.id === selected.id)} onClose={() => setSelected(null)}/>}</section>;
}
