export type Language = 'es' | 'en';
export type Theme = 'dark' | 'light';
export type Localized<T> = Record<Language, T>;
export interface Project {
  id: string;
  title: Localized<string>;
  summary: Localized<string>;
  status: 'in-development' | 'published' | 'placeholder' | 'guide';
  technologies: string[];
  repository?: string;
  cover?: string;
  coverAlt?: Localized<string>;
  attribution?: { author: string; url: string; license: string; licenseUrl: string };
  story: { title: Localized<string>; body: Localized<string> }[];
  guide?: {
    parts: Localized<string[]>;
    wiring: Localized<string>;
    programming: Localized<string>;
    steps: Localized<string[]>;
    sources: { title: string; url: string }[];
  };
}
