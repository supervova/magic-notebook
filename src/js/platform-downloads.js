/**
 * Detects the current desktop platform from browser hints.
 * @returns {'macos' | 'windows' | 'linux' | 'unknown'} The detected platform.
 */
export const detectPlatform = () => {
  const platform =
    navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || '';
  const value = platform.toLowerCase();

  if (value.includes('win')) return 'windows';
  if (value.includes('mac')) return 'macos';
  if (value.includes('linux')) return 'linux';

  return 'unknown';
};

/**
 * Selects the visible download controls for the current platform.
 * @returns {void}
 */
export default function initPlatformDownloads() {
  const detectedPlatform = detectPlatform();
  const activePlatform = detectedPlatform === 'windows' ? 'windows' : 'macos';

  document.documentElement.dataset.platform = detectedPlatform;

  document.querySelectorAll('[data-platform-target]').forEach((element) => {
    if (!(element instanceof HTMLElement)) return;

    element.hidden = element.dataset.platformTarget !== activePlatform;
  });

  document.querySelectorAll('[data-platform-current]').forEach((element) => {
    if (!(element instanceof HTMLElement)) return;

    if (element.dataset.platformCurrent === activePlatform) {
      element.setAttribute('aria-current', 'true');
      return;
    }

    element.removeAttribute('aria-current');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      initPlatformDownloads();
    },
    { once: true }
  );
} else {
  initPlatformDownloads();
}
