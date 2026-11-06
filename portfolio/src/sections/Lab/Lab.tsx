import { useMemo, useState } from 'react';
import { useCopy } from '../../app/Preferences';
import { SectionLabel } from '../../components/SectionHeading';
import { moirePaths } from '../../graphics/moire';
import styles from './Lab.module.css';
export default function Lab({ id }: { id: string }) {
  const t = useCopy(), [density, setDensity] = useState(42), paths = useMemo(() => moirePaths(density), [density]);
  return <section id={id} className={styles.shell} aria-labelledby="lab-title"><div className="section wrap"><SectionLabel text={t.labLabel} meta={t.labMeta}/><div className={styles.layout}><div><span className={styles.tag}>EXPERIMENT_001</span><h2 id="lab-title">{t.labTitle}</h2><p>{t.labBody}</p><div className={styles.slider}><label htmlFor="density"><span>{t.density}</span><output htmlFor="density">{density}</output></label><input id="density" type="range" min="12" max="72" value={density} onChange={event => setDensity(Number(event.target.value))}/><div className={styles.endpoints}><span>{t.structure}</span><span>{t.noise}</span></div></div></div><div className={styles.frame}><svg viewBox="0 0 500 400" role="img" aria-label={t.moireAlt}>{paths.map((path, index) => <path key={index} d={path.d} className={path.family ? styles.lime : styles.violet}/>)}</svg><span className={styles.caption}>SIGNAL / NOISE <b>{(1 - density / 100).toFixed(2)}</b></span><span className={styles.cross} aria-hidden="true">+</span></div></div></div></section>;
}
