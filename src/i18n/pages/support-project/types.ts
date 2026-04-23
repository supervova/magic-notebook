export interface SupportProjectMeta {
  title: string;
  desc: string;
}

export interface SupportProjectOption {
  cta: string;
  desc?: string;
  title: string;
}

export interface SupportProjectSupporters {
  cardThreshold: string;
  title: string;
}

export interface SupportProjectThanks {
  desc: string;
  shareTitle: string;
  title: string;
}

export interface SupportProjectPlatforms {
  email: string;
  facebook: string;
  koFi: string;
  linkedin: string;
  patreon: string;
  productHunt: string;
  telegram: string;
  tiktok: string;
  vk: string;
  x: string;
}

export interface SupportProjectDictionary {
  intro: string;
  meta: SupportProjectMeta;
  options: {
    donation: SupportProjectOption;
    purchase: SupportProjectOption;
    sponsorship: SupportProjectOption;
    title: string;
  };
  platforms: SupportProjectPlatforms;
  supporters: SupportProjectSupporters & {
    profileAriaLabel: string;
  };
  thanks: SupportProjectThanks;
  title: string;
  titleSuffix: string;
}
