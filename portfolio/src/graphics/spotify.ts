export interface SpotifyPlayback { isPaused: boolean; isBuffering: boolean }
export interface SpotifyController {
  pause(): void;
  destroy(): void;
  addListener(name: 'ready', listener: () => void): void;
  addListener(name: 'playback_update', listener: (event: { data: SpotifyPlayback }) => void): void;
}
interface SpotifyApi {
  createController(element: HTMLElement, options: { uri: string; width: string; height: number }, callback: (controller: SpotifyController) => void): void;
}
declare global { interface Window { onSpotifyIframeApiReady?: (api: SpotifyApi) => void } }
let pending: Promise<SpotifyApi> | undefined;
export function loadSpotify(): Promise<SpotifyApi> {
  if (pending) return pending;
  pending = new Promise((resolve, reject) => {
    let settled = false;
    const previous = window.onSpotifyIframeApiReady;
    const timeout = window.setTimeout(() => fail(), 12000);
    const fail = () => {
      if (settled) return;
      settled = true; window.clearTimeout(timeout); pending = undefined;
      script.remove(); window.onSpotifyIframeApiReady = previous;
      reject(new Error('Spotify unavailable'));
    };
    window.onSpotifyIframeApiReady = api => {
      if (settled) return;
      settled = true; window.clearTimeout(timeout); previous?.(api); resolve(api);
    };
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1'; script.async = true;
    script.addEventListener('error', fail, { once: true }); document.head.append(script);
  });
  return pending;
}
