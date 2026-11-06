import styles from './SectionHeading.module.css';
export function SectionLabel({ text, meta }: { text: string; meta?: string }) { return <div className={styles.label}><span>{text}</span>{meta && <span>{meta}</span>}</div>; }
export function SectionHeading({ id, title, description }: { id: string; title: string; description?: string }) { return <div className={styles.heading}><h2 id={id}>{title}</h2>{description && <p>{description}</p>}</div>; }
