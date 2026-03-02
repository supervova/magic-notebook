# Чек-лист миграции `web` на новый стек

- [ ] Зафиксировать baseline.
  - Снять текущие скриншоты ключевых страниц (`index`, `overview`) и критичных UI-состояний.
  - Зафиксировать Lighthouse-метрики (Perf/SEO/A11y) и размер `dist`.
  - Зафиксировать список страниц и компонентов для финального сравнения после миграции.

- [ ] Создать ветку миграции (`feat/web-astro-migration`).

- [ ] Подключить Astro (SSG), не ломая текущий Gulp-пайплайн.
  - Добавить Astro в текущий репозиторий без удаления legacy на первом шаге.
  - Настроить режим статической генерации: `output: 'static'`.
  - Сохранить рабочий Gulp-поток временно, как fallback до полного перехода.

- [ ] Добавить скрипты `dev/build/preview` для Astro в `package.json`.

- [ ] Настроить `astro.config` под GitHub Pages (`site`, `base`, `trailingSlash`).

- [ ] Перенести layout из Pug в `src/layouts/BaseLayout.astro`.
  - Перенести общую структуру из `base.pug`.
  - Перенести partials в `src/layouts` и `src/components`.

- [ ] Перенести `index` и `overview` в `.astro`.

- [ ] Включить content collections для `blog`, `roadmap`, `changelog`.
  - Использовать Markdown/MDX как основной контентный формат для этих разделов.

- [ ] Перенести Markdown/MDX-контент и проверить маршруты.

- [ ] Подключить `src/styles` как базу нового CSS-слоя.
  - Использовать существующие заготовки: tokens/reset/custom-media/mixins/utils.

- [ ] Настроить PostCSS: `postcss-import`, `postcss-nesting`, `postcss-custom-media`, `postcss-mixins`, `autoprefixer`.

- [ ] Создать `src/styles/main.css` с `@layer`-порядком (LSD).

- [ ] Сохранить существующий BEM в legacy-стилях без переименований.

- [ ] Для нового кода применять LSD-подход из `lsd-approach.md`.

- [ ] Заменить Bootstrap Carousel на Embla (aria, клавиатура, controls).

- [ ] Заменить модалки Bootstrap на нативный `dialog` (focus, Esc, backdrop).

- [ ] Удалить зависимости Bootstrap/Popper и legacy JS-инициализацию.

- [ ] Подключить PurgeCSS только для production.
  - Purge не применять в dev-режиме.

- [ ] Настроить safelist для динамических классов: `is-*`, `has-*`, utility, Embla.

- [ ] Проверить визуальные регрессии после purge.

- [ ] Обновить `scripts/deploy.sh` под `astro build`.

- [ ] Проверить деплой на `gh-pages`.
  - Проверить `CNAME`.
  - Проверить `site/base` и корректность маршрутов.
  - Проверить fallback-страницу `404`.

- [ ] Удалить Gulp/Pug/SCSS-зависимости после полного перехода.

- [ ] Обновить `README.md` (новые команды, структура, деплой).

- [ ] Сравнить итог с baseline и зафиксировать migration report.
