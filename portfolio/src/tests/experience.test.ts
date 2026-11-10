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
  it('keeps test images distinct from real projects, with local assets and credits', () => {
    const references = projects.filter(project => project.status === 'placeholder');
    expect(projects.filter(project => project.status !== 'placeholder')).toHaveLength(1);
    expect(references).toHaveLength(2);
    for (const reference of references) {
      expect(reference.repository).toBeUndefined();
      expect(reference.attribution?.url).toMatch(/^https:\/\/commons.wikimedia.org\//);
      expect(reference.attribution?.licenseUrl).toMatch(/^https:\/\/creativecommons.org\//);
      expect(reference.coverAlt?.es).toBeTruthy(); expect(reference.coverAlt?.en).toBeTruthy();
      const jpeg = readFileSync(new URL(`../../public/${reference.cover}`,import.meta.url));
      expect(jpeg[0]).toBe(0xff); expect(jpeg[1]).toBe(0xd8);
    }
  });
  it('keeps the Spotify link and player URI on the same approved playlist', () => {
    expect(music.playlistUrl).toBe('https://open.spotify.com/playlist/2cJBhX6prsU3cXOF2ark0l');
    expect(music.playlistUri.split(':').at(-1)).toBe(new URL(music.playlistUrl).pathname.split('/').at(-1));
  });
});
