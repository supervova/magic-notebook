import type { TermsDictionary } from './types';

export const en: TermsDictionary = {
  meta: {
    title: 'Terms and Conditions - Magic Notebook',
    desc: 'Terms and Conditions for the Magic Notebook desktop app.',
  },
  page: {
    title: 'Terms and Conditions',
    lastUpdatedLabel: 'Last updated:',
    lastUpdatedValue: 'April 27, 2026',
  },
  sections: [
    {
      title: '1. General Provisions',
      open: true,
      paragraphs: [
        'Magic Notebook is free software for creating and editing text content. By using the application, you agree to these Terms.',
      ],
    },
    {
      title: '2. License',
      paragraphs: [
        'You are granted a limited, non-exclusive, non-transferable right to use the application for personal or professional purposes. You may not:',
      ],
      list: [
        'distribute the application without permission',
        'modify or decompile it (where prohibited by law)',
        'use the application for illegal activities',
      ],
    },
    {
      title: '3. Disclaimer of Warranties',
      paragraphs: ['The application is provided "as is". We do not guarantee:'],
      list: [
        'that it is free of errors',
        'uninterrupted operation',
        'data preservation under all circumstances',
      ],
      trailingParagraphs: [
        'However, we strive for maximum reliability and continuously work to improve the application.',
      ],
    },
    {
      title: '4. Limitation of Liability',
      paragraphs: ['The developer is not responsible for:'],
      list: [
        'data loss',
        'any direct or indirect damages',
        'consequences of using or being unable to use the application',
      ],
    },
    {
      title: '5. Updates',
      paragraphs: ['The application may receive updates:'],
      list: ['bug fixes', 'new features', 'behavioral changes'],
      trailingParagraphs: ['We are not obligated to support older versions.'],
    },
    {
      title: '6. Donations and Project Support',
      paragraphs: [
        'Magic Notebook is distributed free of charge. You may voluntarily support the project via:',
      ],
      list: ['Gumroad', 'Patreon', 'Ko-fi'],
      trailingParagraphs: [
        'Donations are voluntary and do not grant additional rights or guarantees unless explicitly stated.',
      ],
    },
    {
      title: '7. Termination',
      paragraphs: ['You may stop using the application at any time by removing it.'],
    },
    {
      title: '8. Changes to the Terms',
      paragraphs: [
        'We may update these Terms. Continued use of the application constitutes acceptance of the updated version.',
      ],
    },
    {
      title: '9. Contact',
      paragraphs: [
        'For questions, please use <a href="https://github.com/supervova/magic-notebook/issues">GitHub Issues</a>.',
      ],
      list: [
        'Click the <strong>New Issue</strong> button in the top right corner.',
        'Choose the appropriate type: Bug Report, Feature Request, or Question.',
        'Write your message and click <strong>Create</strong>.',
        'Requests are handled in the order they are received.',
      ],
    },
  ],
};
