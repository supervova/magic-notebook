import type { WhatsNewDictionary } from './types';

export const en: WhatsNewDictionary = {
  meta: {
    title: 'What’s New - Magic Notebook',
    desc: 'Release notes for Magic Notebook.',
  },
  page: {
    title: 'What’s New',
    versionLabel: 'version',
  },
  legend: [
    {
      tone: 'new',
      label: 'new',
      shortLabel: 'N',
    },
    {
      tone: 'improvement',
      label: 'improvement',
      shortLabel: 'I',
    },
    {
      tone: 'fix',
      label: 'fix',
      shortLabel: 'F',
    },
  ],
  releases: [
    {
      date: 'October 1, 2026',
      version: '1.3.1',
      items: [
        { tone: 'new', text: 'Added a version for the Mac App Store.' },
        { tone: 'fix', text: 'Minor fixes and interface improvements.' },
      ],
    },
    {
      date: 'August 19, 2026',
      version: '1.3.0',
      items: [
        {
          tone: 'new',
          text: 'Added compact mode: the app can be minimized to the system tray near the clock, so it’s always close at hand.',
        },
      ],
      images: [
        '2026-08-18-macos-settings',
        '2026-08-18-macos-doc',
        '2026-08-18-windows-settings',
        '2026-08-18-windows-doc',
      ],
    },
    {
      date: 'August 4, 2026',
      version: '1.2.0',
      items: [
        { tone: 'new', text: 'Collapse sections of large documents by subheading.' },
        { tone: 'new', text: 'Added a code-editor-inspired theme.' },
        { tone: 'improvement', text: 'You can now open documents from any accessible folder.' },
        {
          tone: 'improvement',
          text: 'The toolbar hides while reading and returns when needed.',
        },
        { tone: 'improvement', text: 'The app is now faster and more responsive.' },
        { tone: 'improvement', text: 'Improved Windows integration.' },
      ],
    },
    {
      date: 'June 26, 2026',
      version: '1.1.3',
      items: [
        { tone: 'new', text: 'Magic Notebook is now available for Windows.' },
        {
          tone: 'improvement',
          text: 'Creating files from the sidebar is now faster and more reliable.',
        },
        { tone: 'fix', text: 'Fixed a few small issues.' },
      ],
    },
    {
      date: 'May 15, 2026',
      version: '1.1.1',
      items: [
        {
          tone: 'new',
          text: 'Edit your notes in a clean, intuitive visual editor.',
        },
        {
          tone: 'new',
          text: 'Work with Word, Markdown, or plain text files.',
        },
        {
          tone: 'new',
          text: 'Format text using headings, lists, links, and other familiar elements.',
        },
        {
          tone: 'new',
          text: 'Add tables, images, and code blocks to your notes.',
        },
        {
          tone: 'new',
          text: 'Paste content from other sources - web pages, AI chats - with tables and images preserved.',
        },
        {
          tone: 'new',
          text: 'Search within the current document.',
        },
        {
          tone: 'new',
          text: 'Changes are saved automatically.',
        },
        {
          tone: 'new',
          text: 'Open folders on your computer and work with files directly in the app.',
        },
        {
          tone: 'new',
          text: 'Create notes and folders, rename them, and move them easily between sections.',
        },
        {
          tone: 'new',
          text: 'Quickly find files with sorting and name-based search.',
        },
        {
          tone: 'new',
          text: 'Open a file in Finder directly from the app.',
        },
        {
          tone: 'new',
          text: 'Customize the app: language, light or dark theme, developer mode.',
        },
        {
          tone: 'new',
          text: 'If something isn’t clear, open a short help article.',
        },
        {
          tone: 'new',
          text: 'If you’re a developer, switch between visual mode and Markdown view while working.',
        },
      ],
    },
  ],
};
