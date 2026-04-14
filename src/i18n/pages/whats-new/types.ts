export type WhatsNewTagTone = 'new' | 'improvement' | 'addition' | 'fix';

export interface WhatsNewMeta {
  title: string;
  desc: string;
}

export interface WhatsNewTag {
  tone: WhatsNewTagTone;
  label: string;
  shortLabel: string;
}

export interface WhatsNewItem {
  tone: WhatsNewTagTone;
  text: string;
}

export interface WhatsNewRelease {
  date: string;
  version: string;
  items: WhatsNewItem[];
}

export interface WhatsNewDictionary {
  meta: WhatsNewMeta;
  page: {
    title: string;
    versionLabel: string;
  };
  legend: WhatsNewTag[];
  releases: WhatsNewRelease[];
}
