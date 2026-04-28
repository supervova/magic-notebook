export const en = {
  meta: {
    title: 'Magic Notebook - The calm writing app',
    desc: 'Magic Notebook is a desktop writing app for bloggers, journalists, and authors.',
  },
  hero: {
    eyebrow: 'Text editor',
    title: 'Write your way. Write better',
    desc: 'A calm app for people who just want to write. <span class="text-brand">✔︎</span> No cluttered interfaces. <span class="text-brand">✔︎</span> No complicated systems. <span class="text-brand">✔︎</span> No cloud services. Just open a folder and start writing.',
    alt: 'Anna, your AI assistant',
    linkPrimary: 'Download',
    linkSecondary: 'Watch',
    linkSecondaryPlaceholder: "It's free and",
    linkSecondaryComingSoon: 'Release — May 15',
  },
  carousel: {
    labels: {
      aria: 'Features',
      counter: 'Slide:',
      goTo: 'Go to slide',
      next: 'Next slide',
      pagination: 'Slide navigation',
      prev: 'Previous slide',
    },

    slide01: {
      title: 'Write. Don’t learn software',
      desc: 'A simple writing app for notes, articles and documents.',
    },
    slide02: {
      title: 'Open a folder and start writing',
      desc: 'No sign-up, no setup, no complicated systems.',
    },
    slide03: {
      title: 'Formatting made easy',
      desc: 'Headings, lists, tables, links and images - everything you need.',
    },
    slide04: {
      title: 'Your texts are just files',
      desc: 'DOCX, Markdown and TXT in your regular folders.',
    },
    slide05: {
      title: 'Make it yours',
      desc: 'Light or dark theme, interface language and developer mode.',
    },
    slide06: {
      title: 'Autosave, no stress',
      desc: 'Nothing gets lost - all changes are saved automatically.',
    },
  },
  why: {
    title: 'Why Magic Notebook exists?',
    list: [
      'Online editors force you to store your texts in the cloud.',
      'Word is overloaded with formatting and printing tools (who even needs that anymore?)',
      'Note-taking apps require learning Markdown or complex systems.',
      'And if AI writes everything for you, you lose the ability to express your own thoughts.',
    ],
    offer:
      'Magic Notebook is a simple alternative. <strong>Open a folder</strong> → <strong>create a file</strong> → <strong>start writing</strong>.',
    alt: 'A lifestyle photo of a person writing in Magic Notebook on a laptop, lying on a bed',
  },
  features: {
    title: 'What’s included?',
    desc: 'What you get right after installation',
    product: {
      title: 'What makes it different',
      list: [
        'Fast and lightweight',
        'Clean, distraction-free interface',
        'Works with real files on your computer: DOCX, Markdown and TXT',
        'Automatic saving.',
      ],
    },
    audience: {
      title: 'Made for people who write',
      desc: 'Bloggers, marketers, copywriters, journalists, students, book authors, and anyone who needs a simple writing tool.',
    },
  },
  cta: {
    title: 'Start writing, the app is free',
    supportPrefix: 'And if you want to help,',
    support: 'you’re always welcome ✨',
  },
  tadaTodo: {
    title: 'Who built this and what’s coming next',
    vladimir: {
      title: 'Magic Notebook is created<br>by a single developer, ',
      desc: 'who wanted a simpler writing app. No team. No venture capital. Just a tool made with care.',
      alt: 'Vladimir, developer of Magic Notebook',
    },
    anna: {
      title: 'Here’s what’s next: ',
      list: [
        '👩🏻 AI writing assistant. ',
        '🏷️ Knowledge tools: tags, links, favorites, bookmarks. ',
        '👨🏻‍💻👩‍💻 Collaboration and version control.',
      ],
      alt: 'Anna, AI assistant of Magic Notebook',
    },
  },
  comparison: {
    title: 'Compare for yourself',
    desc: 'Every tool has its place',
    caption: 'Comparing Magic Notebook, Word, Google Docs and Notion',
    features: {
      th: 'Criterion',
      cleanInterface: 'Simple interface',
      realFiles: 'Works with regular files',
      noCloud: 'No cloud required',
      longTexts: 'Good for long texts',
      price: 'Price',
    },
    download: 'Download',
    downloadApp: 'Download Application',
    prices: {
      free: 'Free',
      word: '~$6-$10/m.',
      notion: '$0-$15/m.',
    },
  },
} as const;
