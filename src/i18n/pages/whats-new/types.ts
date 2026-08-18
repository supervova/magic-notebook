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

export type WhatsNewImageSource =
  | '2026-08-18-macos-doc'
  | '2026-08-18-macos-settings'
  | '2026-08-18-windows-doc'
  | '2026-08-18-windows-settings';

export interface WhatsNewRelease {
  date: string;
  images?: WhatsNewImageSource[];
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
