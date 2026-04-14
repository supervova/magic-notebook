export interface LegalSubsection {
  list?: readonly string[];
  paragraphs?: readonly string[];
  title: string;
  trailingList?: readonly string[];
  trailingParagraphs?: readonly string[];
}

export interface LegalSection {
  list?: readonly string[];
  open?: boolean;
  paragraphs?: readonly string[];
  subsections?: readonly LegalSubsection[];
  title: string;
  trailingList?: readonly string[];
  trailingParagraphs?: readonly string[];
}

export interface LegalDictionary {
  meta: {
    desc: string;
    title: string;
  };
  page: {
    lastUpdatedLabel: string;
    lastUpdatedValue: string;
    title: string;
  };
  sections: readonly LegalSection[];
}
