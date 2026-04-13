export interface TermsSubsection {
  list?: readonly string[];
  paragraphs?: readonly string[];
  title: string;
  trailingList?: readonly string[];
  trailingParagraphs?: readonly string[];
}

export interface TermsSection {
  list?: readonly string[];
  open?: boolean;
  paragraphs?: readonly string[];
  subsections?: readonly TermsSubsection[];
  title: string;
  trailingList?: readonly string[];
  trailingParagraphs?: readonly string[];
}

export interface TermsDictionary {
  meta: {
    desc: string;
    title: string;
  };
  page: {
    lastUpdatedLabel: string;
    lastUpdatedValue: string;
    title: string;
  };
  sections: readonly TermsSection[];
}
