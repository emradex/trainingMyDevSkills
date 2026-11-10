import { describe, expect, it } from 'vitest';
import { translations } from '../content/translations';
import { sections, activeSections } from '../app/sections';
import { projects } from '../content/projects';
import { profile } from '../content/site';
import { shadowOffset } from '../hooks/shadow';
import { moirePaths } from '../graphics/moire';
import { readFileSync } from 'node:fs';

describe('editable content contracts', () => {
  it('keeps all visible strings translated and free of embedded markup', () => {
    expect(Object.keys(translations.es).sort()).toEqual(Object.keys(translations.en).sort());
    for (const dictionary of Object.values(translations)) for (const text of Object.values(dictionary)) { expect(text.trim().length).toBeGreaterThan(0); expect(text).not.toMatch(/<\/?[a-z][^>]*>/i); }
  });
  it('keeps stable unique anchors and excludes disabled sections from rendering and navigation', () => {
    const ids = sections.map(section => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['inicio', 'sobre-mi', 'proyectos', 'laboratorio', 'contacto']));
    expect(activeSections([{ ...sections[0], enabled: false }, sections[1]])).toEqual([sections[1]]);
    for (const section of sections) { expect(section.label.es).toBeTruthy(); expect(section.label.en).toBeTruthy(); }
  });
  it('keeps project IDs unique and every case readable in both languages', () => {
    expect(new Set(projects.map(project => project.id)).size).toBe(projects.length);
    for (const project of projects) for (const lang of ['es', 'en'] as const) { expect(project.title[lang]).toBeTruthy(); expect(project.summary[lang]).toBeTruthy(); for (const story of project.story) { expect(story.title[lang]).toBeTruthy(); expect(story.body[lang]).toBeTruthy(); } }
  });
  it('publishes only approved contact destinations and a locally hosted Spanish PDF', () => {
    expect(profile.email).toBe('mauroradesca1a@gmail.com');
    expect(profile.linkedin).toBe('https://www.linkedin.com/in/mauro-radesca-9957191b4/');
    expect(profile.github).toBe('https://github.com/emradex');
    expect(profile.resume.path).toMatch(/^cv\/[^/]+\.pdf$/); expect(profile.resume.language).toBe('es');
    const pdf = readFileSync(new URL(`../../public/${profile.resume.path}`, import.meta.url));
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(pdf.length).toBeGreaterThan(1000);
  });
});
describe('interactive graphics boundaries', () => {
  it('caps shadows at four pixels even when pointer coordinates extend beyond the element', () => {
    expect(shadowOffset(50, 50, 100, 100)).toEqual({ x: 0, y: 0 });
    expect(shadowOffset(-100, 500, 100, 100)).toEqual({ x: -4, y: 4 });
    expect(shadowOffset(0, 0, 0, 0)).toEqual({ x: 0, y: 0 });
  });
  it('draws finite paths throughout the allowed density range', () => {
    for (const density of [12, 42, 72]) { const paths = moirePaths(density); expect(paths).toHaveLength(density * 2); for (const path of paths) { expect(path.d).not.toMatch(/NaN|Infinity/); expect(path.d.endsWith('Z')).toBe(true); } }
  });
});
