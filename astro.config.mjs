// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://magic-nb.ru',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
});
