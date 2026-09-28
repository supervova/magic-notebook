// @ts-check
import sitemap from '@astrojs/sitemap';
import { URL } from 'node:url';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.magic-notebook.com',
  output: 'static',
  integrations: [
    sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/checkout-sandbox') }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en', 'es', 'fr', 'it', 'pt', 'ru', 'uk', 'zh', 'ja', 'ko'],
  },
});
