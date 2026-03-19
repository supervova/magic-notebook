# Сайт magic-notebook.com: с нуля до первой страницы

- [x] 1. Очисть старый локальный репозиторий

Оставь только `.git`, `.gitignore` и др. вещи, которые еще могут пригодиться.

- [ ] 2. Создай проект Astro

Проще всего — официальным генератором:

```bash
pnpm create astro@latest .
```

Когда мастер задаст вопросы, выбери:

- **Template:** `Empty`
- **Install dependencies:** `Yes`
- **Initialize git:** `No`
  (потому что ты уже сделал `git init` вручную)

Официальная документация Astro рекомендует именно `create astro` для старта нового проекта.

- [ ] 3. Добавь настройки линтеров и зависимости

Забери всё, что нужно с `/Users/supervova/Sites/01-boilerplate/web/package.json`

- [ ] 4. Приведи проект к нужной структуре

Создай каталоги:

```bash
mkdir -p src/pages/dev/playground
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/content/blog
mkdir -p src/content/changelog
mkdir -p src/content/roadmap
mkdir -p src/layouts
mkdir -p src/styles
mkdir -p .github/workflows
```

- [ ] 5. Настрой PostCSS

Создай `postcss.config.mjs`:

```js
export default {
  plugins: {
    'postcss-preset-env': {},
  },
};
```

Этого достаточно для старта. Vite подхватит PostCSS автоматически через конфиг. Это стандартный путь работы Vite-проектов с PostCSS. ([GitHub][2])

- [ ] 6. Настрой Astro под GitHub Pages

Создай или отредактируй `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/magic-notebook-site/',
  output: 'static',
});
```

Важно:

- `site` — твой будущий URL
- `base` нужен, если сайт будет лежать в репозитории вида `username.github.io/repo-name`
- если репозиторий будет называться `YOUR_GITHUB_USERNAME.github.io`, то `base` не нужен

Для GitHub Pages Astro использует статическую сборку и официальный гайд рекомендует именно такой сценарий.

- [ ] 7. Создай базовые стили

Забери всё что нужно в `/Users/supervova/Sites/01-boilerplate/web/`

- [ ] 8. Создай layout

`src/layouts/base-layout.astro`

```astro

import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
}

const {
  title,
  description = 'Magic Notebook website'
} = Astro.props;


<!doctype html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1'
    />
    <title>{title}</title>
    <meta name='description' content={description} />
  </head>

  <body>
    <div class='site-shell'>
      <slot />
    </div>
  </body>
</html>
```

- [ ] 9. Создай первую страницу

`src/pages/index.astro`

```astro

import BaseLayout from '../layouts/base-layout.astro';


<BaseLayout
  title='Magic Notebook'
  description='A writing-first notebook for bloggers, journalists, and authors.'
>
  <main class='site-container'>
    <section class='hero'>
      <div class='hero__box'>
        <p class='hero__eyebrow'>Magic Notebook</p>

        <h1 class='hero__title'>
          Write clearly.
          <br />
          Shape ideas faster.
        </h1>

        <p class='hero__text'>
          Magic Notebook is a desktop writing app for bloggers, journalists,
          and authors. Focus on text, structure, and flow — without fighting
          the interface.
        </p>

        <div class='hero__actions'>
          <a class='hero__button is-primary' href='/blog'>
            Read updates
          </a>

          <a class='hero__button is-secondary' href='/roadmap'>
            View roadmap
          </a>
        </div>
      </div>
    </section>
  </main>
</BaseLayout>
```

- [ ] 10. Запусти локально

```bash
pnpm dev
```

По умолчанию Astro поднимает dev-сервер для локальной разработки. ([docs.astro.build][1])

- [ ] 11. Проверь production build

```bash
pnpm build
pnpm preview
```

Сайт должен собраться в папку `dist/`. Для статического деплоя Astro использует prerendered output. ([docs.astro.build][4])

- [ ] 12. Добавь workflow для GitHub Pages

Создай `.github/workflows/deploy.yml`:

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

Astro поддерживает официальный GitHub Action для деплоя на GitHub Pages и прямо рекомендует этот способ. По умолчанию у action Node 22, что совпадает с твоим локальным стеком. ([docs.astro.build][3])

- [ ] 13. Первый коммит и пуш

```bash
git add .
git commit -m "init astro site"
git branch -M main
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/magic-notebook-site.git
git push -u origin main
```

После этого в GitHub:

- открой **Settings → Pages**
- убедись, что источник публикации — **GitHub Actions**

GitHub Pages поддерживает кастомные workflow через Actions. ([GitHub Docs][5])

- [ ] 14. Что получится на выходе

На этом этапе у тебя уже есть:

- Astro-проект с нуля
- Git-репозиторий
- CSS + PostCSS
- первая страница
- готовый деплой на GitHub Pages
- база под ранее согласованную структуру

[Далее →](next-steps.md)
