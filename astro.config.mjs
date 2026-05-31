// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.magic-notebook.com',
  output: 'static',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en', 'es', 'fr', 'it', 'pt', 'ru', 'uk', 'zh', 'ja', 'ko'],
  },
});
