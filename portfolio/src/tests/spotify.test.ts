import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
function environment() {
  const scripts: { src: string; async: boolean; remove: ReturnType<typeof vi.fn>; addEventListener: ReturnType<typeof vi.fn> }[] = [];
  const append = vi.fn();
  vi.stubGlobal('window', { setTimeout, clearTimeout });
  vi.stubGlobal('document', { head: { append }, createElement: () => { const script = { src: '', async: false, remove: vi.fn(), addEventListener: vi.fn() }; scripts.push(script); return script; } });
  return { scripts, append };
}
describe('optional Spotify loader', () => {
  it('shares one loading request and resolves only when Spotify is ready', async () => {
    vi.resetModules(); const { append } = environment();
    const { loadSpotify } = await import('../graphics/spotify');
    const first = loadSpotify(), second = loadSpotify();
    expect(first).toBe(second); expect(append).toHaveBeenCalledTimes(1);
    const api = { createController: vi.fn() };
    window.onSpotifyIframeApiReady?.(api);
    await expect(first).resolves.toBe(api);
  });
  it('rejects unavailable Spotify without retaining a broken script or promise', async () => {
    vi.resetModules(); const { scripts } = environment();
    const { loadSpotify } = await import('../graphics/spotify');
    const request = loadSpotify();
    const result = expect(request).rejects.toThrow('Spotify unavailable');
    const fail = scripts[0].addEventListener.mock.calls.find(call => call[0] === 'error')?.[1];
    fail(); await result;
    expect(scripts[0].remove).toHaveBeenCalledOnce();
    const retry = loadSpotify(); expect(retry).not.toBe(request);
    const api = { createController: vi.fn() }; window.onSpotifyIframeApiReady?.(api);
    await expect(retry).resolves.toBe(api);
  });
});
