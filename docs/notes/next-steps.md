# Сайт magic-notebook.com: второй этап разработки

Чистовая стартовая структура под `blog / changelog / roadmap / dev`, без лишнего boilerplate, в логике твоего проекта. Общие требования по структуре и стеку проекта у тебя уже зафиксированы в `AGENTS.md`

## Стартовая структура

```txt
web/
  .github/
    workflows/
      deploy.yml

  public/
    favicon.svg

  src/
    components/
      layout/
        site-footer.astro
        site-header.astro
      sections/
        hero-section.astro
      ui/
        container.astro

    content/
      blog/
        first-post.md
      changelog/
        first-release.md
      roadmap/
        first-milestone.md

    layouts/
      base-layout.astro
      article-layout.astro
      dev-layout.astro

    pages/
      index.astro

      blog/
        index.astro
        [slug].astro

      changelog/
        index.astro
        [slug].astro

      roadmap/
        index.astro
        [slug].astro

      dev/
        index.astro
        playground/
          landing.astro
          editor.astro

    styles/
      global.css
      tokens.css
      prose.css

    content.config.ts

  astro.config.mjs
  package.json
  postcss.config.mjs
  tsconfig.json
```

## Что делает каждая зона

### `src/pages`

Роуты сайта.

- `index.astro` — главная
- `blog/` — новости / статьи
- `changelog/` — релизы
- `roadmap/` — планы
- `dev/playground/` — твои рабочие статичные прототипы

### `src/content`

Контент-коллекции Astro.

- `blog/*.md`
- `changelog/*.md`
- `roadmap/*.md`

Это лучше, чем просто разрозненные markdown-файлы, потому что есть схема, типизация и единый способ получать записи.

### `src/layouts`

Обвязка страниц.

- `base-layout.astro` — обычные страницы
- `article-layout.astro` — статьи/релизы/roadmap entries
- `dev-layout.astro` — отдельная обвязка для playground

### `src/components`

Минимальный набор переиспользуемых блоков.

- `layout/` — header/footer
- `sections/` — секции главной
- `ui/` — очень простые primitive-компоненты

### `src/styles`

- `tokens.css` — цвета, размеры, радиусы, шрифты
- `global.css` — reset/base/layout
- `prose.css` — стили для markdown-контента

## Какие файлы создать сразу

### `src/content.config.ts`

```ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    isDraft: z.boolean().default(false),
  }),
});

const changelogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    version: z.string(),
    isDraft: z.boolean().default(false),
  }),
});

const roadmapCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    status: z.enum(['planned', 'in-progress', 'done']),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  changelog: changelogCollection,
  roadmap: roadmapCollection,
};
```

### `src/layouts/article-layout.astro`

```astro

import BaseLayout from './base-layout.astro';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;


<BaseLayout title={title} description={description}>
  <main class='site-container'>
    <article class='prose'>
      <slot />
    </article>
  </main>
</BaseLayout>
```

### `src/layouts/dev-layout.astro`

```astro

import BaseLayout from './base-layout.astro';

interface Props {
  title: string;
}

const { title } = Astro.props;


<BaseLayout title={title} description='Development playground'>
  <main class='site-container'>
    <slot />
  </main>
</BaseLayout>
```

### `src/pages/blog/index.astro`

```astro

import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/base-layout.astro';

const posts = (await getCollection('blog'))
  .filter(post => !post.data.isDraft)
  .sort((left, right) => {
    return right.data.pubDate.getTime() - left.data.pubDate.getTime();
  });


<BaseLayout title='Blog' description='Product news and writing updates'>
  <main class='site-container'>
    <h1>Blog</h1>

    <ul>
      {posts.map(post => (
        <li>
          <a href={`/blog/${post.slug}/`}>{post.data.title}</a>
        </li>
      ))}
    </ul>
  </main>
</BaseLayout>
```

### `src/pages/blog/[slug].astro`

```astro

import { getCollection, render } from 'astro:content';
import ArticleLayout from '../../layouts/article-layout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', post => !post.data.isDraft);

  return posts.map(post => {
    return {
      params: { slug: post.slug },
      props: { post }
    };
  });
}

const { post } = Astro.props;
const { Content } = await render(post);


<ArticleLayout
  title={post.data.title}
  description={post.data.description}
>
  <h1>{post.data.title}</h1>
  <Content />
</ArticleLayout>
```

### Аналогично сделать для `changelog` и `roadmap`

Логика та же, меняется только коллекция.

## Примеры контента

### `src/content/blog/first-post.md`

```md
title: 'Magic Notebook website started'
description: 'The first step of the public website.'
pubDate: 2026-03-18
isDraft: false

The website is now being built with Astro, static generation, and Markdown content collections.
```

### `src/content/changelog/first-release.md`

```md
title: 'Website setup'
description: 'Initial public website setup.'
pubDate: 2026-03-18
version: '0.1.0'
isDraft: false

Initial project setup with Astro, CSS, PostCSS, and GitHub Pages deployment.
```

### `src/content/roadmap/first-milestone.md`

```md
title: 'Public website MVP'
description: 'Core pages for launch.'
pubDate: 2026-03-18
status: 'in-progress'
isDraft: false

- Landing page
- Blog
- Changelog
- Roadmap
- Dev playground
```

## Что бы я делал дальше по шагам

1. Завести эту структуру.
2. Поднять `blog` целиком.
3. Скопировать паттерн на `changelog` и `roadmap`.
4. После этого уже делать `site-header`, `site-footer`, `hero-section`.
5. `dev/playground` использовать как твою рабочую зону вместо внешней папки.

## Команды для быстрого создания

```bash
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui
mkdir -p src/content/blog
mkdir -p src/content/changelog
mkdir -p src/content/roadmap
mkdir -p src/layouts
mkdir -p src/pages/blog
mkdir -p src/pages/changelog
mkdir -p src/pages/roadmap
mkdir -p src/pages/dev/playground
mkdir -p src/styles
touch src/content.config.ts
touch src/layouts/article-layout.astro
touch src/layouts/dev-layout.astro
touch src/pages/blog/index.astro
touch src/pages/blog/[slug].astro
touch src/pages/changelog/index.astro
touch src/pages/changelog/[slug].astro
touch src/pages/roadmap/index.astro
touch src/pages/roadmap/[slug].astro
touch src/pages/dev/index.astro
touch src/pages/dev/playground/landing.astro
touch src/pages/dev/playground/editor.astro
touch src/styles/tokens.css
touch src/styles/prose.css
```

Промежуточный коммит здесь уже уместен: **`chore: scaffold astro content structure`**
