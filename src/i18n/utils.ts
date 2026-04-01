import type { Locale } from './config';

/**
 * Returns a localized pathname using the default-language URL strategy.
 */
export const getLocalizedPath = (locale: Locale, path = '/') => {
  if (path === '/') {
    return locale === 'en' ? '/' : `/${locale}/`;
  }

  const normalizedPath = `/${path.replace(/^\/+|\/+$/g, '')}/`;

  return locale === 'en' ? normalizedPath : `/${locale}${normalizedPath}`;
};
