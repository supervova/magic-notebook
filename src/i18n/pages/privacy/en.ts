import type { PrivacyDictionary } from './types';

export const en: PrivacyDictionary = {
  meta: {
    title: 'Privacy Policy - Magic Notebook',
    desc: 'Privacy Policy for the Magic Notebook desktop app.',
  },
  page: {
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Last updated:',
    lastUpdatedValue: 'May 1, 2026',
  },
  sections: [
    {
      title: '1. General Provisions',
      open: true,
      paragraphs: [
        'Magic Notebook is a desktop application for macOS and Windows used for writing and editing text files. We respect your privacy and strive to minimize data collection. This Privacy Policy describes what data is processed when you use the application.',
      ],
    },
    {
      title: '2. What Data We Collect',
      subsections: [
        {
          title: '2.1 Local Data',
          paragraphs: ['All user data (notes, files, settings):'],
          list: [
            'is stored <strong>locally on your device</strong>',
            'is not automatically transmitted to the developer',
          ],
        },
        {
          title: '2.2 Technical Data (Optional)',
          paragraphs: ['The application may collect technical data only with your consent:'],
          list: ['crash reports', 'diagnostic logs'],
          trailingParagraphs: ['This data:'],
          trailingList: [
            'does not include the content of your notes',
            'is used solely to improve the stability of the application',
          ],
        },
        {
          title: '2.3 Payment and Donation Data',
          paragraphs: [
            'Magic Notebook does not process payments directly. If you choose to support the project via:',
          ],
          list: ['Gumroad', 'Patreon', 'Ko-fi'],
          trailingParagraphs: [
            'these services process your data in accordance with their own privacy policies.',
          ],
        },
      ],
    },
    {
      title: '3. Data Sharing with Third Parties',
      paragraphs: ['We do not share your data with third parties, except for:'],
      list: [
        'donation processing services (see above)',
        'error reporting services (if enabled by the user)',
      ],
    },
    {
      title: '4. Data Storage and Security',
      list: [
        "Data is stored locally on the user's device",
        'Security measures are applied, including encryption where applicable',
        'We do not have access to your notes',
      ],
    },
    {
      title: '5. Your Rights',
      paragraphs: ['You can:'],
      list: [
        'completely delete all data by removing the application and its associated files',
        'disable the sending of diagnostic data (if enabled)',
      ],
    },
    {
      title: '6. Changes to This Policy',
      paragraphs: [
        'We may update this Privacy Policy. The current version is always available on the project website.',
      ],
    },
    {
      title: '7. Contact',
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
