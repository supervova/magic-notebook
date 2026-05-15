import { de as commonDe } from './common/de';
import { en as commonEn } from './common/en';
import { es as commonEs } from './common/es';
import { fr as commonFr } from './common/fr';
import { it as commonIt } from './common/it';
import { ja as commonJa } from './common/ja';
import { ko as commonKo } from './common/ko';
import { pt as commonPt } from './common/pt';
import { ru as commonRu } from './common/ru';
import { uk as commonUk } from './common/uk';
import { zh as commonZh } from './common/zh';
import { en as contactUsEn } from './pages/contact-us/en';
import { ru as contactUsRu } from './pages/contact-us/ru';
import { de as homeDe } from './pages/home/de';
import { en as homeEn } from './pages/home/en';
import { es as homeEs } from './pages/home/es';
import { fr as homeFr } from './pages/home/fr';
import { it as homeIt } from './pages/home/it';
import { ja as homeJa } from './pages/home/ja';
import { ko as homeKo } from './pages/home/ko';
import { pt as homePt } from './pages/home/pt';
import { ru as homeRu } from './pages/home/ru';
import { uk as homeUk } from './pages/home/uk';
import { zh as homeZh } from './pages/home/zh';
import { en as privacyEn } from './pages/privacy/en';
import { ru as privacyRu } from './pages/privacy/ru';
import { de as supportProjectDe } from './pages/support-project/de';
import { en as supportProjectEn } from './pages/support-project/en';
import { es as supportProjectEs } from './pages/support-project/es';
import { fr as supportProjectFr } from './pages/support-project/fr';
import { it as supportProjectIt } from './pages/support-project/it';
import { ja as supportProjectJa } from './pages/support-project/ja';
import { ko as supportProjectKo } from './pages/support-project/ko';
import { pt as supportProjectPt } from './pages/support-project/pt';
import { ru as supportProjectRu } from './pages/support-project/ru';
import { uk as supportProjectUk } from './pages/support-project/uk';
import { zh as supportProjectZh } from './pages/support-project/zh';
import { en as termsEn } from './pages/terms/en';
import { ru as termsRu } from './pages/terms/ru';
import { de as whatsNewDe } from './pages/whats-new/de';
import { en as whatsNewEn } from './pages/whats-new/en';
import { es as whatsNewEs } from './pages/whats-new/es';
import { fr as whatsNewFr } from './pages/whats-new/fr';
import { it as whatsNewIt } from './pages/whats-new/it';
import { ja as whatsNewJa } from './pages/whats-new/ja';
import { ko as whatsNewKo } from './pages/whats-new/ko';
import { pt as whatsNewPt } from './pages/whats-new/pt';
import { ru as whatsNewRu } from './pages/whats-new/ru';
import { uk as whatsNewUk } from './pages/whats-new/uk';
import { zh as whatsNewZh } from './pages/whats-new/zh';

export const supportedLocales = [
  'en',
  'ru',
  'de',
  'es',
  'fr',
  'it',
  'pt',
  'uk',
  'ja',
  'ko',
  'zh',
] as const;

export const commonDictionaries = {
  en: commonEn,
  ru: commonRu,
  de: commonDe,
  es: commonEs,
  fr: commonFr,
  it: commonIt,
  pt: commonPt,
  uk: commonUk,
  ja: commonJa,
  ko: commonKo,
  zh: commonZh,
} as const;

export const pageDictionaries = {
  'contact-us': {
    en: contactUsEn,
    ru: contactUsRu,
  },
  home: {
    en: homeEn,
    ru: homeRu,
    de: homeDe,
    es: homeEs,
    fr: homeFr,
    it: homeIt,
    pt: homePt,
    uk: homeUk,
    ja: homeJa,
    ko: homeKo,
    zh: homeZh,
  },
  privacy: {
    en: privacyEn,
    ru: privacyRu,
  },
  'support-project': {
    en: supportProjectEn,
    ru: supportProjectRu,
    de: supportProjectDe,
    es: supportProjectEs,
    fr: supportProjectFr,
    it: supportProjectIt,
    pt: supportProjectPt,
    uk: supportProjectUk,
    ja: supportProjectJa,
    ko: supportProjectKo,
    zh: supportProjectZh,
  },
  terms: {
    en: termsEn,
    ru: termsRu,
  },
  'whats-new': {
    en: whatsNewEn,
    ru: whatsNewRu,
    de: whatsNewDe,
    es: whatsNewEs,
    fr: whatsNewFr,
    it: whatsNewIt,
    pt: whatsNewPt,
    uk: whatsNewUk,
    ja: whatsNewJa,
    ko: whatsNewKo,
    zh: whatsNewZh,
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
