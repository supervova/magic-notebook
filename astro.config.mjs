// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://magic-notebook.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
});
