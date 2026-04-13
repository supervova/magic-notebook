export interface PrivacySubsection {
  list?: readonly string[];
  paragraphs?: readonly string[];
  title: string;
  trailingList?: readonly string[];
  trailingParagraphs?: readonly string[];
}

export interface PrivacySection {
  list?: readonly string[];
  open?: boolean;
  paragraphs?: readonly string[];
  subsections?: readonly PrivacySubsection[];
  title: string;
}

export interface PrivacyDictionary {
  meta: {
    desc: string;
    title: string;
  };
  page: {
    lastUpdatedLabel: string;
    lastUpdatedValue: string;
    title: string;
  };
  sections: readonly PrivacySection[];
}
