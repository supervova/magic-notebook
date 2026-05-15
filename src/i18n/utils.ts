import { supportedLocales } from './config';
import type { Locale } from './config';

const localizedPageLocales = {
  '/': supportedLocales,
  'contact-us': ['en', 'ru'],
  privacy: ['en', 'ru'],
  'support-project': supportedLocales,
  terms: ['en', 'ru'],
  'whats-new': supportedLocales,
} as const satisfies Record<string, readonly Locale[]>;

type LocalizedPageKey = keyof typeof localizedPageLocales;

const localeNames = {
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
  uk: 'Українська',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
} as const satisfies Record<Locale, string>;

const getPathKey = (path = '/') => {
  if (path === '/') return '/';

  return path.replace(/^\/+|\/+$/g, '');
};

const isLocalizedPage = (locale: Locale, pathKey: string) => {
  if (!(pathKey in localizedPageLocales)) return false;

  return (localizedPageLocales[pathKey as LocalizedPageKey] as readonly Locale[]).includes(locale);
};

/**
 * Returns a localized pathname using the default-language URL strategy.
 */
export const getLocalizedPath = (locale: Locale, path = '/') => {
  const pathKey = getPathKey(path);
  const safeLocale = isLocalizedPage(locale, pathKey) ? locale : 'en';

  if (pathKey === '/') return safeLocale === 'en' ? '/' : `/${safeLocale}/`;

  const normalizedPath = `/${pathKey}/`;

  return safeLocale === 'en' ? normalizedPath : `/${safeLocale}${normalizedPath}`;
};

export const getLocalizedAlternates = (path = '/') => {
  const pathKey = getPathKey(path);
  const locales: readonly Locale[] =
    pathKey in localizedPageLocales ? localizedPageLocales[pathKey as LocalizedPageKey] : ['en'];

  return Object.fromEntries(locales.map((locale) => [locale, getLocalizedPath(locale, pathKey)])) as Partial<
    Record<Locale, string>
  >;
};

export const getLocaleName = (locale: Locale) => localeNames[locale];

export const getPathWithoutLocale = (pathname: string) => {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  const [firstSegment, ...restSegments] = segments;

  if (supportedLocales.includes(firstSegment as Locale)) {
    return restSegments.join('/') || '/';
  }

  return segments.join('/') || '/';
};
