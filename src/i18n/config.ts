import { en as commonEn } from './common/en';
import { ru as commonRu } from './common/ru';
import { en as homeEn } from './pages/home/en';
import { ru as homeRu } from './pages/home/ru';
import { en as privacyEn } from './pages/privacy/en';
import { ru as privacyRu } from './pages/privacy/ru';
import { en as supportProjectEn } from './pages/support-project/en';
import { ru as supportProjectRu } from './pages/support-project/ru';
import { en as termsEn } from './pages/terms/en';
import { ru as termsRu } from './pages/terms/ru';
import { en as whatsNewEn } from './pages/whats-new/en';
import { ru as whatsNewRu } from './pages/whats-new/ru';

export const commonDictionaries = {
  en: commonEn,
  ru: commonRu,
} as const;

export const pageDictionaries = {
  home: {
    en: homeEn,
    ru: homeRu,
  },
  privacy: {
    en: privacyEn,
    ru: privacyRu,
  },
  'support-project': {
    en: supportProjectEn,
    ru: supportProjectRu,
  },
  terms: {
    en: termsEn,
    ru: termsRu,
  },
  'whats-new': {
    en: whatsNewEn,
    ru: whatsNewRu,
  },
} as const;

export type Locale = keyof typeof commonDictionaries;
export type PageName = keyof typeof pageDictionaries;

export const getCommonDictionary = <CurrentLocale extends Locale>(locale: CurrentLocale) => {
  return commonDictionaries[locale];
};

export const getPageDictionary = <
  Page extends PageName,
  CurrentLocale extends keyof (typeof pageDictionaries)[Page],
>(
  page: Page,
  locale: CurrentLocale
) => {
  return pageDictionaries[page][locale];
};

export const getDictionary = getCommonDictionary;
