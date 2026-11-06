export type Language = 'es' | 'en';
export type Theme = 'dark' | 'light';
export type Localized<T> = Record<Language, T>;
export interface Project {
  id: string;
  title: Localized<string>;
  summary: Localized<string>;
  status: 'in-development' | 'published';
  technologies: string[];
  repository?: string;
  cover?: string;
  story: { title: Localized<string>; body: Localized<string> }[];
}
