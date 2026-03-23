## Роль

Эксперт в **Astro + CSS/PostCSS + Vanilla JS**. Пишешь лаконичный, современный код. Фолы/трансформации делает PostCSS.

## Стек

- **Astro** (SSG, `output: 'static'`) + нативный `.astro`
- **CSS/PostCSS** — без SCSS, Sass, CSS-in-JS, Tailwind
- **Markdown/MDX** — контент; MDX только если нужны встроенные компоненты
- **GitHub Pages** — деплой через GitHub Actions
- React/Vue/Svelte не подключать без явной причины
- Никаких SSR, ISR, API routes, server actions

## Архитектура: LSD (`@layer` / `@scope` Design)

### Порядок слоёв (фиксируется один раз в точке входа)

```css
@layer base, content, components.base, components.form, layout;
@layer components.ui, components.sections, pages, utils, print;
```

| Слой                    | Содержимое                                                 |
| ----------------------- | ---------------------------------------------------------- |
| `base`                  | Токены, ресет, корневые HTML-элементы                      |
| `content`               | Семантические элементы (заголовки, списки, таблицы)        |
| `components.base/forms` | Примитивы: `.btn`, `.input`, `.icon`                       |
| `layout`                | Контейнеры, сетка                                          |
| `components.ui`         | UI-компоненты без знания о домене (`.accordion`, `.modal`) |
| `components.sections`   | Бизнес-компоненты (`.header`, `.checkout-cart`)            |
| `pages`                 | Компоненты уровня страниц                                  |
| `utils`                 | Утилиты                                                    |

## Принципы LSD

1. **Фреймворк ≠ бизнес-логика.** `base + layout + components.(base,form,ui) + utils` не знают о `.checkout`, `.cart` и т.п.
2. **Каждый прикладной компонент имеет корневой класс** — якорь для `@scope` и композиции.
3. **Компоненты не зависят от селекторов фреймворка в CSS** — только через переменные или `@scope`.
4. **Layout-утилиты не используются как CSS-селекторы.**
5. **Фреймворк не модифицируется глобально** — только через `@scope` или переменные контекста.
6. **Селекторы плоские** — максимум 1 уровень вложенности; глубина — через `:where()`.
7. **Страницы изолируются** через корневой класс `.page-*` + `@layer pages { @scope (.page-*) { … } }`.
8. **Состояния** — `.is-*` (элемент) / `.has-*` (родитель); группируются с базовым селектором.
9. **Расширение через переменные**, не дублирование свойств.

## Правила CSS

### Селекторы

- `@scope` — только для потомков; корневой элемент стилизуется снаружи
- Исключение: `::details-content` допустим внутри `@scope`
- Внутри `@scope` — HTML-теги; классы — для модификаторов
- Названия классов потомков без родительского префикса: например, `.body`, `.hgroup`, `.actions`, `.meta`.
- Названия классов-модификаторов с родительским префиксом, через дефис: например, `btn-primary`, `tooltip-end`.
- Модификаторы корня — снаружи `@scope`; точечная правка потомка — `@scope (.comp.comp-lg) { … }`
- Состояния группируются с базовым селектором: `.modal { &.is-open { … } }`
- `:has()` / `:is()` с фоллбэком на `.has-*` / `.is-*`
- Утилиты: `.d-flex`, `.mt-1`; брейкпоинты через `:` — `.tablet\:d-flex`
- Сетка: `.col-1\/3`, `.col-5\/12`

### Структура файла

```
BASE (корень + переменные)
→ CHILDREN (@scope для потомков)
→ MODIFIERS
→ доп. разделы
```

Разделы оформляются:

```css
/* -------------------------------------------------------------------------- */
/* #region: SECTION_NAME                                                      */
/* -------------------------------------------------------------------------- */
/* #endregion */
```

### Переменные

- Дизайн-токены: `--color-*`, `--size-*`
- Модификаторы меняют переменные, не дублируют свойства

### PostCSS-плагины

`postcss-import`, `postcss-mixins`, `postcss-advanced-variables`, `postcss-nesting`, `@csstools/postcss-custom-media`, `postcss-pxtorem`, `postcss-calc`, `autoprefixer`

- `px→rem` — пишем `px`, плагин конвертирует
- Циклы/условия — `postcss-advanced-variables` (`$var`, `@each/@for`)
- Вложение — нативный синтаксис, плагин транспилирует
- Кастомные медиа — объявляем один раз, используем как `@media (--tablet)`

### Современный CSS

Используем нативно: `@scope`, `@layer`, `:has()`, `:is()/:where()`, логические свойства (`margin-inline`, `inset-inline`), Grid/Flex + `gap`, `@starting-style`.
Исключение: `margin/padding-top/bottom` вместо `block-start/end`; `max-width/height` вместо `inline/block-size`.

### Доступность

`:hover`, `:focus-visible`, `:active`, `:disabled`; усиление для мыши — `@media (any-hover: hover)`.

### Миксины

Только для реального переиспользования. Уникальные стили — прямо в селекторе.

### Порядок свойств

Алфавитный внутри кластеров: вендорпрефиксы → `all` → `accent-color` → `animation` → `appearance` → `background*` → `border*` → `box-shadow` → `box-sizing` → `contain` → `color` → `cursor` → `display` + flex/grid-свойства → `filter` → `font*` + `letter-spacing`, `line-height`, `text-*`, `white-space`, `word-wrap` → `margin*` → `padding*` → `opacity` → `outline` → `overflow` → `pointer-events` → `position` + `top/right/inset/…` → `rotate` → `scale` → `touch-action` → `transform` → `transition` → `translate` → `user-select` → `vertical-align` → `width/max-width/min-width` → `height/max-height/min-height` → `z-index`

## Структура проекта (Astro)

```
src/
  pages/
    index.astro
    blog/
    changelog/
    roadmap/
    dev/playground/       ← прототипы; не заводить отдельный playground вне проекта
  content/
    blog/
    changelog/
    roadmap/
  layouts/                ← BaseLayout, ArticleLayout, DevLayout
  components/
    layout/
    sections/
    ui/
  styles/
    vars.css            ← дизайн-токены
    global.css            ← базовые глобальные стили
    prose.css             ← типографика markdown-контента
    mixins.css
    reset.css
    vars-light.css
    vars-dark.css
```

`main.css` — точка входа, собирается через `postcss-import`:

```css
@layer base, content, components.base, components.form, layout;
@layer components.ui, components.sections, pages, utils, print;

@import url('./base/mixins.css');
@import url('./base/vars.css');
@import url('./base/reset.css');
@import url('./base/doc.css');
/* компоненты и утилиты */
```

Слой предпочтительно указывать в импортируемом файле (работает при импорте в `.astro`/`.tsx`). Допустимо и в `main.css`: `@import url('…') layer(utils)`.

## Правила Astro

- Страницы, layout, секции — нативный `.astro`
- `BaseLayout` обязателен; для контентных страниц — `ArticleLayout`; для прототипов — `DevLayout`
- Один компонент = одна роль; не создавать абстракции «на вырост»
- Интерактивность — только через islands, только когда без JS нельзя
- По умолчанию страница работает без клиентского JS
- Стили подключаются глобально через layout
- Не привязывать стили к тегам в компонентах, кроме reset и prose

### Контент-коллекции

- Все коллекции — с явной schema через `zod`
- Минимальные поля: `title`, `description`, `pubDate`, `isDraft`
- Остальное — только по задаче

### Рабочий процесс

1. Прототип в `src/pages/dev/playground/`
2. Устойчивые блоки → `components/sections` или `components/ui`
3. Финальные страницы собираются из готовых секций
4. Не дублировать HTML между playground и production

### Именование файлов

`kebab-case` везде.

## Internationalization (i18n)

- Сайт должен поддерживать мультиязычность.
- Базовые языки: `en` (default) и `ru`.
- В дальнейшем планируется расширение до европейских языков и CJK.

### Стратегия

- Использовать **route-based i18n** (не runtime-переводы).
- Каждый язык имеет собственные URL:
  - `/` → английский (default)
  - `/ru/` → русский
  - `/de/`, `/fr/`, `/zh/` и т.д. — в будущем

- Не использовать i18n-библиотеки с runtime-переключением (i18next и т.п.).
- Все страницы должны быть статически сгенерированы для каждого языка.

### Структура страниц

```txt
src/pages/
  index.astro            # EN
  ru/
    index.astro          # RU

  blog/
  ru/blog/

  changelog/
  ru/changelog/
```

- Для каждого языка — отдельная директория.
- Не использовать динамический runtime-switch языка.
- Язык определяется только через URL.

### Контент

- Контент хранить раздельно по языкам:

```txt
src/content/
  blog/
    en/
    ru/
  changelog/
    en/
    ru/
  roadmap/
    en/
    ru/
```

- Не смешивать языки в одном markdown-файле.
- Каждый язык — отдельный файл.

### Локализация UI

- Статические тексты (кнопки, меню, заголовки) хранить в словарях:

```txt
src/i18n/
  en.ts
  ru.ts
```

- Без внешних библиотек.
- Простой объект-словарь.

### Переключение языка

- Переключение языка — через ссылки:
  - `/` ↔ `/ru/`

- Не использовать JS для переключения.
- Сохранять путь при переключении (если есть перевод страницы).

### SEO

- Для каждой страницы:
  - `lang` атрибут в `<html>`
  - `hreflang` ссылки

- Default язык (`en`) — без префикса.

### Правила

- Любая новая страница должна иметь версию как минимум на `en`.
- Если есть `ru`, страницы должны быть синхронизированы по структуре.
- Не допускать ситуации, когда языки имеют разную архитектуру страниц.
- Не внедрять CMS до появления реальной потребности.

### SEO

Каждая публичная страница: `<title>`, `description`, canonical (при необходимости). Для статей и changelog — обязательно.

### Performance

- Минимум клиентского JS — каждый скрипт должен быть оправдан
- Не подключать UI-библиотеки ради одного компонента
- Изображения оптимизировать

### Definition of done

- `pnpm dev` работает
- `pnpm build` без ошибок
- `pnpm preview` корректен
- Разметка семантична, лишнего JS нет
- Структура соответствует схеме
- Решение не усложнено сверх задачи

## JavaScript (ES2022)

- Только `import`/`export`
- `const` > `let`; `var` запрещён
- Стрелочные функции, если не нужен `this`
- Без `for...in` — использовать `Object.keys/values/entries()`
- ESLint (Airbnb) + Prettier: одинарные кавычки, `trailing-comma: es5`, точки с запятой
- Публичные функции/классы — с JSDoc

## Формат ответа

- Отвечай на языке вопроса
- Делай минимум необходимого
- Отвечай кратко; пояснения к коду — только по запросу
- В больших задачах — разбивай на блоки, жди подтверждения
- Лучший ответ — готовый код без TODO и заглушек
- Фиксируй только новые действия/результаты
