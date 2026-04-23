# TODO

## Переезд на magic-notebook.com, выкат сайта

- [ ] Сделать `https://www.magic-notebook.com` единственным каноническим доменом сайта.
- [ ] Не хостить `https://magic-nb.ru` как вторую копию сайта через GitHub Pages.
- [ ] Использовать `magic-nb.ru` только как домен с постоянным `301`-редиректом на основной домен.
- [ ] Определить канонический URL:
  - [ ] Вариант A: `https://magic-notebook.com`
  - [x] Вариант B: `https://www.magic-notebook.com`
- [x] Если финальный production-домен уже известен, задать `site` в `astro.config.*`.
- [ ] Прописать `site: 'https://magic-notebook.com'`, если основной домен остаётся без `www`.
- [x] Либо прописать `site: 'https://www.magic-notebook.com'`, если каноническим выбран `www`.
- [ ] Сохранить текущую `coming-soon` страницу на `magic-nb.ru` до момента релиза.
- [ ] Когда production-сайт готов, переключить custom domain репозитория GitHub Pages на основной домен.
- [ ] Включить HTTPS после переключения custom domain.
- [ ] Проверить, что `canonical`, `og:url`, `og:image`, sitemap и RSS используют домен из `site`.
- [ ] Не использовать `.ru` домен как отдельную живую русскую версию сайта.
- [x] Оставить route-based i18n:
  - [x] `https://www.magic-notebook.com/` → `en`
  - [x] `https://www.magic-notebook.com/ru/` → `ru`
- [ ] Настроить `magic-nb.ru/*` на `301`-редирект в `https://www.magic-notebook.com/ru/`.
- [ ] Если провайдер поддерживает сохранение пути, настроить path-preserving redirect:
  - [ ] `https://magic-nb.ru/some/path` → `https://www.magic-notebook.com/ru/some/path`
- [ ] Если сохранение пути недоступно, хотя бы направить весь `magic-nb.ru` на `https://www.magic-notebook.com/ru/`.
- [ ] Не держать один и тот же контент одновременно доступным по `magic-notebook.com`/`www.magic-notebook.com` и `magic-nb.ru`.
- [ ] После переезда проверить `hreflang`, `lang`, `canonical`, `og:image` и редиректы.

- [ ] DNS-схема для `magic-notebook.com` без `www` как канонического домена:
  - [ ] `magic-notebook.com` → `A` на GitHub Pages IP-адреса
  - [ ] `magic-notebook.com` → `AAAA` на IPv6 GitHub Pages, если используется у провайдера
  - [ ] `www.magic-notebook.com` → `CNAME` на `<user>.github.io`
  - [ ] В GitHub Pages указать custom domain: `magic-notebook.com`
  - [ ] Проверить, что `www.magic-notebook.com` редиректит на apex, если это нужно по выбранной канонизации

- [ ] DNS-схема для `www.magic-notebook.com` как канонического домена:
  - [ ] `www.magic-notebook.com` → `CNAME` на `<user>.github.io`
  - [ ] `magic-notebook.com` → редирект на `https://www.magic-notebook.com`
  - [ ] В GitHub Pages указать custom domain: `www.magic-notebook.com`
  - [ ] Проверить, что apex стабильно редиректит на `www`

- [ ] DNS-схема для `magic-nb.ru` с редиректом на `/ru/`:
  - [ ] Не подключать `magic-nb.ru` как второй custom domain к этому же GitHub Pages сайту
  - [ ] Настроить у DNS/хостинг-провайдера `301`-редирект:
  - [ ] `https://magic-nb.ru/` → `https://www.magic-notebook.com/ru/`
  - [ ] `https://www.magic-nb.ru/` → `https://www.magic-notebook.com/ru/`
  - [ ] Если поддерживается, включить сохранение пути и query string
  - [ ] Проверить, что сертификат для `magic-nb.ru` и `www.magic-nb.ru` выпускается на стороне провайдера редиректа

- [ ] Перед финальным переключением:
  - [x] Убедиться, что сайт собирается с корректным `site`
  - [x] Проверить абсолютный `og:image`
  - [ ] Проверить sitemap
  - [ ] Проверить robots.txt, если он будет добавлен
  - [ ] Проверить `curl -I` для всех доменов и редиректов
  - [ ] Проверить Google Rich Results / Open Graph debugger / Twitter Card validator после выката

## Последние штрихи и запуск проекта Producthunt

- [ ] Добавить [release notes](magic-notebook.com/whats-new) в диалог About

- [ ] [подключение платформ сбыта и монетизации до релиза](../docs/monetization/before-release.md)
  - [ ] Подготовить проект на Producthunt.

- [ ] Отладка, тесты (unit + e2e сценарии редактирования и сохранения), полировка UI
  - [ ] ChatGPT – лицензия, учитывающая использование TipTap, Radix, Pandoc и пр.
  - [ ] [Проверка безопасности перед релизом](../docs/_tasks/pre-release-security-check.md)
  - [x] Сборка

- [ ] Тестирование под Windows

  - [ ] По инструкциям ChatGPT удалить Parallels и Windows и установить UTM и Windows

- [ ] Настройка [GitHub Actions → GitHub Releases → Tauri Auto-updater](../docs/dev/how-to/github-releases.md)

- [ ] Выкат дистрибутива на GitHub Releases

- [ ] Обновление сайта – ссылка на кнопку скачивания (сначала только DMG).

- [ ] Подключение и настройки платформ сбыта и монетизации:
  - [ ] [стратегия подключения к платформам](../docs/monetization/index.md),
  - [ ] [процесс сборки, подписи и публикации](../docs/monetization/distribution.md)
  - [ ] [шаги по подключению платформ](../docs/monetization/execution.md)
  - [ ] [если, что пропустил в предыдущих пунктах](../docs/_tasks/00-beta/monetization-donations-patreon.md)

- [ ] Gumroad.

- [ ] 🚀 Запуск проекта на Producthunt.

- [ ] [Проект на Patreon](/Users/supervova/Sites/vladimir-nikishin/mn/app/docs/_tasks/00-beta/monetization-donations-patreon.md)

- [ ] План продаж с ChatGPT

## Промо-ролик - MVP: 20 sec video

- [ ] [производство](../../app/docs/website/content/ru/video/02-checklist.md).

  - [x] 🎬 Скринкаст 1 — Запуск + выбор папки (10–18 сек)

  - [x] 🎬 Скринкаст 2 — Печать текста (8–10 сек)

    - Начинаем запись с чистого листа.
    - Печатаем текст из Screen Studio Keynotes
      - **не быстро**
      - паузы:
        - после каждой строки
        - микро-пауза после точки
    - Пауза под титры

  - [ ] 🎬 Скринкаст 3

    - Перед записью создать окно Finder'а, с открытой ~/_tmp/current/
    - открыть меню Toolbar'а Format
    - Выбрать H1

      ```text
      The room is quiet. → # The room is quiet.
      ```

    - bold шорткатом: **no pressure**

    - открыть Finder
    - drag & drop `room.jpg` прямо в текст
    - изображение появляется

    - открыть меню Toolbar'а Insert
    - Выбрать 2 колонки
    - Таблица появляется
    - Заполнить - см. Simplenote
      - важно: не редактировать долго
      - 1–2 ввода максимум

    - клик по файлу article.docx в sidebar
    - затем обратно

- [ ] Быстрый монтаж: склейка, музыка, титры только в конце: Magic Notebook - Write Your Way
