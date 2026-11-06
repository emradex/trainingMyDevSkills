import { useRef, useState } from 'react';
import { useCopy } from '../../app/Preferences';
import { profile } from '../../content/site';
import { SectionLabel } from '../../components/SectionHeading';
import { ActionLink } from '../../components/ActionLink';
import { CvLink } from '../../components/CvLink';
import styles from './Contact.module.css';
export default function Contact({ id }: { id: string }) {
  const t = useCopy(), [result, setResult] = useState<'copied' | 'failed' | null>(null), email = useRef<HTMLAnchorElement>(null);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setResult('copied'); }
    catch {
      setResult('failed');
      const selection = window.getSelection(); if (selection && email.current) { const range = document.createRange(); range.selectNodeContents(email.current); selection.removeAllRanges(); selection.addRange(range); }
    }
  }
  return <section id={id} className="section wrap" aria-labelledby="contact-title"><SectionLabel text={t.contactLabel} meta="LET’S TALK."/><div className={styles.heading}><h2 id="contact-title">{t.contactTitle}</h2><span aria-hidden="true">↗</span></div><p className={styles.intro}>{t.contactBody}</p><div className={styles.emailGroup}><span className={styles.label}>{t.emailLabel}</span><div className={styles.emailLine}><a ref={email} className={styles.email} href={`mailto:${profile.email}`}>{profile.email}</a><button onClick={copyEmail} className={styles.copy} aria-label={t.copyEmail} title={t.copyEmail}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="1"/><path d="M16 8V3H3v13h5"/></svg></button></div><p className={styles.feedback} role="status" aria-live="polite">{result === 'copied' ? t.copied : result === 'failed' ? t.copyFailed : ''}</p></div><div className={styles.bottom}><div className={styles.socials}><ActionLink href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span aria-hidden="true">↗</span></ActionLink><ActionLink href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<span aria-hidden="true">↗</span></ActionLink></div><div className={styles.cv}><p>{t.cvIntro}</p><CvLink primary/></div></div></section>;
}
