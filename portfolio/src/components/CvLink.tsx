import { useCopy } from '../app/Preferences';
import { assetUrl, profile } from '../content/site';
import { ActionLink } from './ActionLink';
export function CvLink({ primary = false }: { primary?: boolean }) {
  const t = useCopy();
  return <ActionLink href={assetUrl(profile.resume.path)} download={profile.resume.downloadName} variant={primary ? 'primary' : 'outline'} aria-label={`${t.cv} — ${t.cvLanguage}`}><span>{t.cv}<small>{t.cvLanguage}</small></span><span aria-hidden="true">↓</span></ActionLink>;
}
