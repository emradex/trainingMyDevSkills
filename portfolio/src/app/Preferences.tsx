import { createContext, useContext, useLayoutEffect, useState, type PropsWithChildren } from 'react';
import type { Language, Theme } from '../content/types';
import { getCopy } from '../content/translations';

function stored(key: string) { try { return localStorage.getItem(`mr-${key}`) ?? localStorage.getItem(`mr-v2-${key}`); } catch { return null; } }
function persist(key: string, value: string) { try { localStorage.setItem(`mr-${key}`, value); } catch { /* Preferences still work in memory. */ } }
interface Preferences { language: Language; theme: Theme; setLanguage: (value: Language) => void; toggleTheme: () => void; }
const Context = createContext<Preferences | null>(null);
export function PreferencesProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>(() => stored('language') === 'en' ? 'en' : 'es');
  const [theme, setTheme] = useState<Theme>(() => stored('theme') === 'light' ? 'light' : 'dark');
  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    document.title = language === 'es' ? 'Mauro Radesca — Desarrollo & IT' : 'Mauro Radesca — Development & IT';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0c' : '#f1f0e9');
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'es' ? 'Mauro Radesca. Soporte de aplicaciones, desarrollo de software y exploración creativa. Portfolio y CV de IT.' : 'Mauro Radesca. Application support, software development and creative exploration. Portfolio and IT CV.');
    persist('language', language); persist('theme', theme);
  }, [language, theme]);
  return <Context.Provider value={{ language, theme, setLanguage, toggleTheme: () => setTheme(value => value === 'dark' ? 'light' : 'dark') }}>{children}</Context.Provider>;
}
export function usePreferences() { const value = useContext(Context); if (!value) throw new Error('PreferencesProvider is missing'); return value; }
export function useCopy() { return getCopy(usePreferences().language); }
