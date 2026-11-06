import { useMemo, useState } from 'react';
import { useCopy } from '../../app/Preferences';
import { SectionLabel } from '../../components/SectionHeading';
import { ChoiceGroup } from '../../components/ChoiceGroup';
import { initialPattern, patternPaths, patternShapes } from '../../graphics/moire';
import styles from './Lab.module.css';

export default function Lab({ id }: { id: string }) {
  const t = useCopy(), [options, setOptions] = useState({ ...initialPattern });
  const paths = useMemo(() => patternPaths(options), [options]);
  const labels = { rosette: t.rosette, orbits: t.orbits, moire: t.moire };
  const vary = () => setOptions(current => ({
    shape: patternShapes[(patternShapes.indexOf(current.shape) + 1) % patternShapes.length],
    density: 16 + Math.floor(Math.random() * 21), deformation: Math.floor(Math.random() * 101),
  }));
  return <section id={id} className={styles.shell} aria-labelledby="lab-title"><div className="section wrap">
    <SectionLabel text={t.labLabel} meta={t.labMeta}/>
    <div className={styles.layout}>
      <div>
        <span className={styles.tag}>EXPERIMENT_002</span><h2 id="lab-title">{t.labTitle}</h2><p>{t.labBody}</p>
        <div className={styles.choices}><ChoiceGroup label={t.pattern} value={options.shape} choices={patternShapes.map(value => ({ value, label: labels[value] }))} onChange={shape => setOptions(current => ({ ...current, shape }))}/></div>
        <div className={styles.slider}>
          <label htmlFor="density"><span>{t.density}</span><output htmlFor="density">{options.density}</output></label>
          <input id="density" type="range" min="12" max="72" value={options.density} onChange={event => setOptions(current => ({ ...current, density: Number(event.target.value) }))}/>
          <div className={styles.endpoints}><span>{t.structure}</span><span>{t.noise}</span></div>
        </div>
        <div className={styles.slider}>
          <label htmlFor="deformation"><span>{t.deformation}</span><output htmlFor="deformation">{options.deformation}</output></label>
          <input id="deformation" type="range" min="0" max="100" value={options.deformation} onChange={event => setOptions(current => ({ ...current, deformation: Number(event.target.value) }))}/>
        </div>
        <div className={styles.actions}><button type="button" onClick={vary}>↗ {t.vary}</button><button type="button" onClick={() => setOptions({ ...initialPattern })}>↺ {t.resetPattern}</button></div>
      </div>
      <div className={styles.frame}>
        <svg viewBox="0 0 500 400" role="img" aria-label={`${t.moireAlt}: ${labels[options.shape]}`}>{paths.map((path, index) => <path key={index} d={path.d} className={path.family ? styles.primary : styles.secondary}/>)}</svg>
        <span className={styles.caption}>{labels[options.shape]} / {options.density * 2} {t.lines}</span><span className={styles.cross} aria-hidden="true">+</span>
      </div>
    </div>
  </div></section>;
}
