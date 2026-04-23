import type { ImageMetadata } from 'astro';

import imgAnnie from '../assets/img/pages/support-project/avatar-placeholder-annie.png';
import imgFemale from '../assets/img/pages/support-project/avatar-placeholder-female.png';
import imgMale from '../assets/img/pages/support-project/avatar-placeholder-male.png';
import imgMaleSurprise from '../assets/img/pages/support-project/avatar-placeholder-male-surprise.png';
import imgCorporate from '../assets/img/pages/support-project/avatar-placeholder-brand.png';

export type SupportMethodId = 'donation' | 'purchase' | 'sponsorship';
export type SocialPlatformId =
  | 'email'
  | 'facebook'
  | 'linkedin'
  | 'productHunt'
  | 'telegram'
  | 'tiktok'
  | 'vk'
  | 'x';

export interface SupportProjectProfile {
  avatar: ImageMetadata;
  href: string;
  name: string;
  platform: Exclude<SocialPlatformId, 'email' | 'vk'>;
}

export interface SupportProjectShareLink {
  platform: Exclude<SocialPlatformId, 'tiktok'>;
}

export const supportProjectLinks: Record<SupportMethodId, string> = {
  donation: 'https://ko-fi.com/',
  purchase: 'https://gumroad.com/',
  sponsorship: 'https://patreon.com/MagicNotebook',
};

export const supportProjectMethodOrder: SupportMethodId[] = ['donation', 'purchase', 'sponsorship'];
export const supportProjectPrimaryMethod: SupportMethodId = 'purchase';

export const supportProjectSupporters = {
  cards: [
    {
      avatar: imgMaleSurprise,
      href: 'https://x.com/supervova',
      name: 'John Doe',
      platform: 'x',
    },
    {
      avatar: imgCorporate,
      href: 'https://www.facebook.com/magicNotebookApp/',
      name: 'Corporate Sponsor',
      platform: 'facebook',
    },
    {
      avatar: imgAnnie,
      href: 'https://www.tiktok.com/',
      name: 'Anna',
      platform: 'tiktok',
    },
    {
      avatar: imgMale,
      href: 'https://t.me/VladimirNikishin',
      name: 'Richard Roe',
      platform: 'telegram',
    },
  ],
  avatars: [
    {
      avatar: imgFemale,
      href: 'https://www.facebook.com/magicNotebookApp/',
      name: 'Jane Doe',
      platform: 'facebook',
    },
    {
      avatar: imgMale,
      href: 'https://www.linkedin.com/in/nikishin/',
      name: 'Richard Roe',
      platform: 'linkedin',
    },
    {
      avatar: imgFemale,
      href: 'https://www.facebook.com/magicNotebookApp/',
      name: 'Jane Doe',
      platform: 'facebook',
    },
    {
      avatar: imgMale,
      href: 'https://www.linkedin.com/in/nikishin/',
      name: 'Richard Roe',
      platform: 'linkedin',
    },
    {
      avatar: imgFemale,
      href: 'https://www.facebook.com/magicNotebookApp/',
      name: 'Jane Doe',
      platform: 'facebook',
    },
    {
      avatar: imgMale,
      href: 'https://www.linkedin.com/in/nikishin/',
      name: 'Richard Roe',
      platform: 'linkedin',
    },
    {
      avatar: imgFemale,
      href: 'https://www.facebook.com/magicNotebookApp/',
      name: 'Jane Doe',
      platform: 'facebook',
    },
    {
      avatar: imgMale,
      href: 'https://www.linkedin.com/in/nikishin/',
      name: 'Richard Roe',
      platform: 'linkedin',
    },
  ],
} as const satisfies {
  avatars: SupportProjectProfile[];
  cards: SupportProjectProfile[];
};

export const supportProjectShareOrder: SupportProjectShareLink[] = [
  { platform: 'productHunt' },
  { platform: 'facebook' },
  { platform: 'x' },
  { platform: 'vk' },
  { platform: 'linkedin' },
  { platform: 'telegram' },
  { platform: 'email' },
];
