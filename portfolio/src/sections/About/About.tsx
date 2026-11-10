import { useCopy } from '../../app/Preferences';
import { SectionLabel } from '../../components/SectionHeading';
import styles from './About.module.css';
export default function About({ id }: { id: string }) {
  const t = useCopy();
  const principles = [[t.principle1, t.principle1Body], [t.principle2, t.principle2Body], [t.principle3, t.principle3Body]];
  return <section id={id} className="section wrap" aria-labelledby="about-title"><SectionLabel text={t.aboutLabel} meta="↙"/><div className={styles.layout}><h2 id="about-title">{t.aboutTitle}</h2><div className={styles.copy}><p className={styles.lead}>{t.aboutLead}</p><p>{t.aboutBody}</p><span className={styles.focus}>{t.focus}</span></div></div><div className={styles.principles}>{principles.map(([title, description], index) => <div key={title}><span>[0{index + 1}]</span><h3>{title}</h3><p>{description}</p></div>)}</div></section>;
}
