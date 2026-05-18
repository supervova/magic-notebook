interface WindowWithGtag extends Window {
  gtag?: (command: string, eventName: string, parameters?: Record<string, string>) => void;
}

/**
 * Отправляет событие клика по скачиванию.
 */
const trackDownloadClick = (platform: string, location: string): void => {
  const analyticsWindow = window as WindowWithGtag;

  if (!analyticsWindow.gtag) {
    return;
  }

  analyticsWindow.gtag('event', 'download_click', {
    platform,
    location,
  });
};

/**
 * Подключает отслеживание download-кнопок.
 */
export const setupAnalytics = (): void => {
  const elements = document.querySelectorAll<HTMLElement>(
    '[data-analytics-event="download_click"]'
  );

  elements.forEach((element) => {
    element.addEventListener('click', () => {
      const platform = element.dataset.platformTarget ?? 'unknown';

      const location = element.closest('.hero')
        ? 'hero'
        : element.closest('.comparison')
          ? 'comparison'
          : element.closest('.cta')
            ? 'cta'
            : element.closest('header')
              ? 'header'
              : 'unknown';

      trackDownloadClick(platform, location);
    });
  });
};
