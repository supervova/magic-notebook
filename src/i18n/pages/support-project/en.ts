import type { SupportProjectDictionary } from './types';

export const en: SupportProjectDictionary = {
  meta: {
    title: 'Support the Project - Magic Notebook',
    desc: 'Support Magic Notebook with a donation, purchase, or sponsorship and help fund new features.',
  },
  title: 'Do a Good Thing',
  titleSuffix: '♥️ Support the Project',
  intro:
    'Magic Notebook is built by a single developer with a simple goal: to create the most comfortable writing app possible. Right now, I work on it in the evenings after my main job. If you enjoy using the app, even a small contribution can help me spend more time improving it. Next up on the roadmap: AI assistant, knowledge base features (tags, internal links), and smart tables.',
  options: {
    title: 'Ways to Support the Project',
    donation: {
      title: 'Donations',
      cta: 'Ko-fi',
      desc: 'If you’re already using the app and want to support its development.',
    },
    purchase: {
      title: 'Purchase',
      cta: 'Gumroad',
      desc: 'Magic Notebook is free, but you can choose to purchase it via Gumroad for any price you feel is fair. You’ll get: ✔️ early access to new versions, ✔️ direct downloads of builds, ✔️ faster updates, ✔️ a profile card or avatar on the website, ✔️ +100 karma',
    },
    sponsorship: {
      title: 'Sponsorship',
      cta: 'Patreon',
      desc: 'If you’re already using the app and want to support its development.',
    },
  },
  supporters: {
    title: 'A spot for your avatar and social links',
    cardThreshold:
      'A $100 purchase or donation gets you a featured card for one month. A $10 contribution gets you an avatar with a hover profile. Each extra $100 or $10 extends the placement by one more month.',
    profileAriaLabel: 'See {name} on {platform}',
  },
  thanks: {
    title: 'Thank You',
    desc: 'If you decide to support the project — thank you, it truly helps. If not, that’s completely fine too. That’s part of the Magic Notebook philosophy.',
    shareTitle: 'Share the link:',
  },
  platforms: {
    koFi: 'Ko-fi',
    patreon: 'Patreon',
    productHunt: 'Product Hunt',
    x: 'X.com',
    facebook: 'Facebook',
    vk: 'VKontakte',
    linkedin: 'LinkedIn',
    telegram: 'Telegram',
    email: 'Email',
    tiktok: 'TikTok',
  },
} as const;
