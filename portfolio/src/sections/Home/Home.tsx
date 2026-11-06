import { useCopy } from '../../app/Preferences';
import { profile } from '../../content/site';
import { usePointerShadow } from '../../hooks/usePointerShadow';
import { ActionLink } from '../../components/ActionLink';
import { CvLink } from '../../components/CvLink';
import { Sculpture } from '../../components/Sculpture';
import styles from './Home.module.css';
export default function Home({ id }: { id: string }) {
  const t = useCopy(), shadow = usePointerShadow();
  return <section id={id} className={`wrap ${styles.hero}`} aria-labelledby="hero-title">
    <div className={styles.eyebrow}><span><i/>{t.heroLabel}</span><span>{profile.location.toUpperCase()} <b>[34°S / 56°W]</b></span></div>
    <div className={styles.layout}><div className={styles.identity}><span className={styles.index}>PERSONAL PORTFOLIO / 003</span><h1 {...shadow} id="hero-title">Mauro<br/>Radesca<span>.</span></h1><p className={styles.signature}>{t.signature}</p><p className={styles.role}>{t.heroRole}</p><div className={styles.actions}><ActionLink href="#proyectos" variant="primary">{t.explore}<span aria-hidden="true">↘</span></ActionLink><CvLink/></div></div><Sculpture/></div>
    <div className={styles.intro}><span>[ INTRO / 2026 ]</span><p>{t.heroBody}</p><a href="#contacto">{t.contactAction}<span aria-hidden="true">↗</span></a></div>
    <div className={styles.footer}><span>{t.heroFooter}</span><span>{t.scroll} ↓</span></div>
  </section>;
}
