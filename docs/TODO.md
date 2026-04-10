# TODO

## Мой исходный план

- [x] [Собрать boilerplate](/Users/supervova/Sites/vladimir-nikishin/mn/web/docs/notes/getting-started.md)
- [x] перевод на английский

- [ ] Главная страница.
  - [x] Дизайн-макеты мобильной и планшетной версии.
  - [x] Экспортировать картинки и иконки
  - [x] Настроить значения шрифтовых переменных
  - [ ] Стилизация
    - [x] topnav
    - [x] Герой
    - [x] Карусель
    - [x] Why?
    - [x] Benefits
    - [x] Duo
    - [x] Comparison
    - [x] CTA
    - [x] Подвал
    - [x] Сделать [intersection observer + .animate.animate-move-in](/Users/supervova/notes/👨🏻‍💻 development/frontend/styles/animation/01-on-scroll-tldr.md)

    - [x] разрезать на разделы;
    - [x] `./index.astro` и `ru/index.astro`.

  - [ ] новое видео, 45–60 сек. Cкринкасты + немного (из-за короткого хронометража) [приемов юмористических влогов](../docs/marketing/how-to/youtube-vlog-best-practices.md).
    - [ ] Сценарий написать вместе с ChatGPT
    - AI-generated: Анна улыбается, потирает руки открывает ноутбук
    - сделать скринкасты по сценариям предложенным ChatGPT и смонтировать
    - AI-generated: Анна улыбается и, подняв указательный палец вверх, говорит, что, если вы разрабочик можете включить режим Markdown
  - [ ] Залить видос на YouTube, Dribbble и Behance

- [ ] Страница /whats-new [1](https://desktop.github.com/release-notes/), [2](https://antigravity.google/changelog). Последние release notes за год, как в Github, но написанные для non-tech savvy
- [ ] Страница Privacy policy 👩🏻‍💼Privacy and Terms
- [ ] Страница [Support the Project](../docs/monetization/03--support-the-project.md). Примеры: [Zen](https://zen-browser.app/donate/), [Bulma](https://bulma.io/become-a-bulma-sponsor/), [Prettier](https://github.com/sponsors/prettier). [Текст ChatGPT](../../app/docs/website/content/ru/support-the-project.md) (на мой взгляд, слишком многословный)
- [ ] переезд на magic-notebook.com
- [ ] Добавить [release notes](magic-notebook.com/changelog) в диалог About

- [ ] [подключение платформ сбыта и монетизации до релиза](../docs/monetization/before-release.md)
  - [ ] Разовые донаты – ko-fi.com
  - [ ] Запустить проект на Producthunt.



## Astro-boilerplate

- [x] 1. Создать проект

  ```bash
  mkdir magic-notebook-site
  cd magic-notebook-site
  git init
  pnpm create astro@latest .
  ```

  Выбрать:

  - `Empty`
  - `Yes` для install dependencies
  - `No` для initialize git

- [x] Установить зависимости

- [x] Создать структуру каталогов

  ```bash
  mkdir -p .github/workflows
  mkdir -p public
  mkdir -p src/components/sections
  mkdir -p src/content/release-notes
  mkdir -p src/content/become-a-sponsor
  mkdir -p src/i18n
  mkdir -p src/layouts
  mkdir -p src/pages/ru
  mkdir -p src/pages/dev/playground
  mkdir -p src/styles
  ```

- [x] Удалить лишнее из шаблона Astro

  ```bash
  rm -rf src/components
  rm -f src/pages/index.astro
  ```

  Если каких-то файлов или папок нет, это нормально.

- [x] Создать базовые файлы

  ```bash
  touch src/layouts/base.astro

  touch src/i18n/en.ts
  touch src/i18n/ru.ts
  touch src/i18n/config.ts

  touch src/components/sections/hero.astro

  touch src/pages/index.astro
  touch src/pages/ru/index.astro
  touch src/pages/dev/index.astro
  touch src/pages/dev/playground/home.astro
  ```

- [x] Заполнить `astro.config.mjs`

  ```js
  import { defineConfig } from 'astro/config';

  export default defineConfig({
    site: 'https://magic-nb.ru',
    output: 'static',
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'ru'],
    },
  });
  ```

- [x] Добавить стили из 01-boilerplate

- [x] Заполнить `src/layouts/base.astro`

  ```astro
  ---
  import '../styles/main.css';

  interface Props {
    title: string;
    description: string;
    lang: 'en' | 'ru';
  }

  const { title, description, lang } = Astro.props;
  ---

  <!doctype html>
  <html lang={lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
      <title>{title}</title>
      <meta name='description' content={description} />
    </head>

    <body>
      <slot />
    </body>
  </html>
  ```

- [x] Заполнить словари

  ### `src/i18n/en.ts`

  ```ts
  export const en = {
    lang: 'en',
    home: {
      title: 'Magic Notebook - The calm writing app',
      text: 'Magic Notebook is a desktop writing app for bloggers, journalists, and authors.',
      hero: {
        linkPrimary: 'Download for free',
        linkSecondary: 'Watch video',
      },
    },
  } as const;
  ```

  ### `src/i18n/ru.ts`

  То жде самое, с переводом.


  ### `src/i18n/config.ts`

  ```ts
  import { en } from './en';
  import { ru } from './ru';

  export const dictionaries = {
    en,
    ru,
  } as const;

  export type Locale = keyof typeof dictionaries;

  export const getDictionary = (locale: Locale) => {
    return dictionaries[locale];
  };
  ```

- [x] Заполнить секцию `src/components/sections/hero.astro`

  ```astro
  ---
  interface HeroCopy {
    title: string;
    text: string;
    primaryLink: string;
    secondaryLink: string;
  }

  interface Props {
    copy: HeroCopy;
    locale: 'en' | 'ru';
  }

  const { copy, locale } = Astro.props;

  const blogHref = locale === 'ru' ? '/ru/blog/' : '/blog/';
  const roadmapHref = locale === 'ru' ? '/ru/roadmap/' : '/roadmap/';
  ---

  <section class='hero'>
    <div class='hero__box'>
      <h1 class='hero__title'>{copy.title}</h1>
      <p class='hero__text'>{copy.text}</p>

      <div class='hero__actions'>
        <a class='hero__button is-primary' href={blogHref}>
          {copy.primaryLink}
        </a>

        <a class='hero__button is-secondary' href={roadmapHref}>
          {copy.secondaryLink}
        </a>
      </div>
    </div>
  </section>
  ```

- [x] Создать шаблон главной страницы

  `src/templates/home.astro`

  ```astro
  ---
  import HeroSection from '../components/sections/hero.astro';
  import BaseLayout from '../layouts/base.astro';
  import type { Locale } from '../i18n/config';
  import type { dictionaries } from '../i18n/config';

  interface Props {
    locale: Locale;
    dictionary: (typeof dictionaries)[Locale];
  }

  const { locale, dictionary } = Astro.props;
  ---

  <BaseLayout
    title={dictionary.home.title}
    description={dictionary.home.desc}
    lang={locale}
  >
    <main>
      <HeroSection copy={dictionary.home} locale={locale} />
    </main>
  </BaseLayout>
  ```

- [x] Создать первые EN- и RU-страницы

  `src/pages/index.astro`

  ```astro
  ---
  import HomePage from '../templates/home.astro';
  import { getDictionary } from '../i18n/config';

  const locale = 'en';
  const dictionary = getDictionary(locale);
  ---

  <HomePage locale={locale} dictionary={dictionary} />
  ```

  Русская версия аналогична, меняется только `local`.

- [x]  Создать dev-страницы

  ### `src/pages/playground/index.astro`

  ```astro
  ---
  import BaseLayout from '../../layouts/base.astro';
  ---

  <BaseLayout
    title='Dev'
    description='Development pages'
    lang='en'
  >
    <main class='site-container'>
      <h1>Dev</h1>
      <ul>
        <li>
          <a href='/dev/playground/home/'>Home prototype</a>
        </li>
      </ul>
    </main>
  </BaseLayout>
  ```

  ### `src/pages/dev/playground/home.astro`

  ```astro
  ---
  import HeroSection from '../../../components/sections/hero.astro';
  import BaseLayout from '../../../layouts/base.astro';
  import { getDictionary } from '../../../i18n/config';

  const dictionary = getDictionary('en');
  ---

  <BaseLayout
    title='Home prototype'
    description='Landing page prototype'
    lang='en'
  >
    <main>
      <HeroSection copy={dictionary.home} locale='en' />
    </main>
  </BaseLayout>
  ```

- [x] Запустить проект

  ```bash
  pnpm dev
  ```

  Проверить:

  - `/`
  - `/ru/`
  - `/playground/home/`

- [x] Проверить production build

  ```bash
  pnpm build
  pnpm preview
  ```

- [x] Создать workflow для GitHub Pages

  ```bash
  touch .github/workflows/deploy.yml
  ```

  ↓

  ```yaml
  name: Deploy to GitHub Pages

  on:
    push:
      branches:
        - main

  permissions:
    contents: read
    pages: write
    id-token: write

  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout
          uses: actions/checkout@v4

        - name: Deploy Astro site
          uses: withastro/action@v4
          with:
            path: .
            node-version: 22
            package-manager: pnpm
  ```

- [x] Первый коммит

  ```bash
  git add .
  git commit -m "init astro website foundation"
  ```

### Что у тебя получится после этого

- Astro-проект с нуля
- CSS + PostCSS
- EN и RU главная без дублирования верстки
- dev/playground внутри проекта
- база для `blog / changelog / roadmap`
- готовность к GitHub Pages

Следующий логичный шаг: завести `src/content.config.ts` и первую контент-коллекцию `blog`.

