import { describe, expect, it } from 'vitest';
import { boundedCard, nearestCard } from '../graphics/carousel';
import { projects } from '../content/projects';
import { music } from '../content/music';
import { readFileSync } from 'node:fs';

describe('carousel boundaries and content', () => {
  it('finds the nearest card for scrolling in either direction and clamps both ends', () => {
    expect(nearestCard([350, 1050, 1750], 1080)).toBe(1);
    expect(nearestCard([350, 1050, 1750], 500)).toBe(0);
    expect(nearestCard([350, 1050, 1750], 1800)).toBe(2);
    expect(boundedCard(-5, 3)).toBe(0); expect(boundedCard(8, 3)).toBe(2);
    expect(boundedCard(0, 0)).toBe(0); expect(boundedCard(1, 1)).toBe(0);
  });
  it('keeps six sourced learning guides distinct from the personal project', () => {
    expect(projects.filter(project => project.status !== 'guide')).toHaveLength(1);
    const guides = projects.filter(project => project.status === 'guide');
    expect(guides).toHaveLength(6);
    for (const project of guides) {
      expect(project.repository).toBeUndefined();
      expect(project.guide?.sources.length).toBeGreaterThanOrEqual(2);
      for (const lang of ['es','en'] as const) {
        expect(project.guide?.parts[lang].length).toBeGreaterThan(2);
        expect(project.guide?.wiring[lang]).toBeTruthy();
        expect(project.guide?.programming[lang]).toBeTruthy();
        expect(project.guide?.steps[lang].length).toBeGreaterThan(2);
        expect(project.coverAlt?.[lang]).toBeTruthy();
      }
      for (const source of project.guide!.sources) expect(new URL(source.url).protocol).toBe('https:');
      const svg = readFileSync(new URL('../../public/' + project.cover,import.meta.url),'utf8');
      expect(svg).toContain('<svg'); expect(svg).not.toMatch(/<script|<foreignObject/i);
    }
  });
  it('keeps the Spotify link and player URI on the same approved playlist', () => {
    expect(music.playlistUrl).toBe('https://open.spotify.com/playlist/2cJBhX6prsU3cXOF2ark0l');
    expect(music.playlistUri.split(':').at(-1)).toBe(new URL(music.playlistUrl).pathname.split('/').at(-1));
  });
});
