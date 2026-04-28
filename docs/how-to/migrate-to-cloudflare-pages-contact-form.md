# Форма обратной связи: GitHub Pages + Cloudflare Worker

Этот план сохраняет основной сайт на GitHub Pages и выносит только endpoint формы
в отдельный Cloudflare Worker.

## Почему не Cloudflare Pages

Cloudflare может нестабильно открываться из России из-за ограничений российских
провайдеров. Поэтому не переносим весь сайт на Cloudflare: если Cloudflare
сломается у пользователя, недоступной станет только отправка формы, а сайт
останется доступен с GitHub Pages.

## Цель

- Оставить сайт на GitHub Pages.
- Оставить одну пользовательскую кнопку: `Отправить`.
- Не показывать пользователю GitHub.
- Создавать GitHub issues server-side через Cloudflare Worker.
- Не использовать Turnstile на первом этапе, чтобы форма не зависела от
  Cloudflare JS в браузере.
- Защищаться от спама через honeypot, CORS, rate limit и простые server-side
  фильтры.
- Отправлять email fallback, если GitHub issue создать не удалось.

## Архитектура

```txt
GitHub Pages
  └─ https://www.magic-notebook.com/contact-us/
      статическая Astro-страница
      POST -> https://feedback.magic-notebook.com/contact

Cloudflare Worker
  └─ https://feedback.magic-notebook.com/contact
      принимает JSON
      проверяет origin
      проверяет honeypot
      ограничивает частоту через KV
      фильтрует очевидный spam
      создает GitHub issue
      при сбое GitHub отправляет email fallback
```

## Текущее состояние кода

- Страница формы:
  - `src/templates/contact-us.astro`
  - `src/pages/contact-us.astro`
  - `src/pages/ru/contact-us.astro`
- Worker:
  - `workers/contact.js`
- Страница по умолчанию отправляет форму на:

```txt
https://feedback.magic-notebook.com/contact
```

Если нужен другой endpoint, задать build-time variable:

```txt
PUBLIC_CONTACT_ENDPOINT=https://<worker-domain>/contact
```

## Этап 1: Создать Cloudflare Worker

В Cloudflare dashboard:

1. Открыть `Workers & Pages`.
2. Создать Worker, например:

```txt
magic-notebook-feedback
```

3. Вставить код из:

```txt
workers/contact.js
```

4. Задеплоить Worker.

На первом этапе можно использовать стандартный Worker URL:

```txt
https://magic-notebook-feedback.<account>.workers.dev/contact
```

Но для production лучше использовать отдельный subdomain:

```txt
https://feedback.magic-notebook.com/contact
```

## Этап 2: Настроить route/subdomain

Рекомендуемый вариант:

1. Создать DNS record для `feedback.magic-notebook.com`.
2. Привязать Worker route к:

```txt
feedback.magic-notebook.com/*
```

3. Проверить, что:

```txt
https://feedback.magic-notebook.com/contact
```

отвечает Worker.

Почему отдельный subdomain:

- основной сайт остается на GitHub Pages;
- Cloudflare применяется только к feedback endpoint;
- при проблемах с Cloudflare ломается только форма.

## Этап 3: GitHub Issue Token

Создать GitHub fine-grained personal access token:

1. GitHub -> Settings -> Developer settings -> Personal access tokens.
2. Создать fine-grained token.
3. Ограничить token репозиторием:

```txt
supervova/magic-notebook
```

4. Выдать минимальное право:

```txt
Issues: Read and write
```

5. Указать срок действия и записать дату следующей ротации.

Добавить Worker secret:

```txt
GITHUB_ISSUES_TOKEN=<token>
```

Опциональные Worker variables:

```txt
CONTACT_GITHUB_OWNER=supervova
CONTACT_GITHUB_REPO=magic-notebook
CONTACT_GITHUB_LABELS=feedback,website
```

Перед production-запуском убедиться, что в GitHub repository есть labels:

```txt
feedback
website
```

## Этап 4: CORS

Worker по умолчанию разрешает origins:

```txt
https://magic-notebook.com
https://www.magic-notebook.com
```

Если нужны другие адреса, добавить Worker variable:

```txt
CONTACT_ALLOWED_ORIGINS=https://magic-notebook.com,https://www.magic-notebook.com
```

Для preview/testing можно временно добавить:

```txt
http://localhost:4321
```

Не оставлять localhost в production без необходимости.

## Этап 5: Rate Limit через KV

Создать KV namespace:

```txt
magic-notebook-contact-rate-limit
```

Привязать его к Worker:

```txt
Binding name: CONTACT_RATE_LIMIT
Namespace: magic-notebook-contact-rate-limit
```

Текущее поведение:

- максимум 10 принятых попыток с одного IP за час;
- если binding отсутствует, форма продолжит работать без этого rate limit.

## Этап 6: Email Fallback

Email fallback нужен только если GitHub issue не создался.

Текущий Worker ожидает Cloudflare Email Sending binding:

```txt
CONTACT_EMAIL
CONTACT_EMAIL_FROM
CONTACT_EMAIL_TO
```

Рекомендуемая настройка:

1. Включить Email Routing/Email Workers для `magic-notebook.com`.
2. Подтвердить destination mailbox.
3. Создать sender address, например:

```txt
feedback@magic-notebook.com
```

4. Добавить Worker Email binding:

```txt
Binding name: CONTACT_EMAIL
Destination: подтвержденный destination address
```

5. Добавить Worker variables:

```txt
CONTACT_EMAIL_FROM=feedback@magic-notebook.com
CONTACT_EMAIL_TO=<твой подтвержденный email>
```

Важно:

- пользователь не выбирает GitHub или email;
- email fallback не является основным каналом;
- основной канал остается GitHub Issues.

## Этап 7: GitHub Pages Build Variable

Если используется endpoint по умолчанию:

```txt
https://feedback.magic-notebook.com/contact
```

ничего добавлять в GitHub Actions не нужно.

Если endpoint другой, добавить repository/environment variable для GitHub Actions:

```txt
PUBLIC_CONTACT_ENDPOINT=https://<worker-domain>/contact
```

Astro подставит это значение в статический JS при сборке.

## Этап 8: Проверка Worker

Проверить метод GET:

```bash
curl -i https://feedback.magic-notebook.com/contact
```

Ожидаемый результат:

```txt
405 method_not_allowed
```

Проверить CORS preflight:

```bash
curl -i -X OPTIONS https://feedback.magic-notebook.com/contact \
  -H "Origin: https://www.magic-notebook.com" \
  -H "Access-Control-Request-Method: POST"
```

Ожидаемый результат:

```txt
204
Access-Control-Allow-Origin: https://www.magic-notebook.com
```

## Этап 9: Проверка формы

Checklist:

1. Открыть `/contact-us/`.
2. Отправить пустую форму.
3. Убедиться, что появилась client-side validation.
4. Отправить реальное тестовое сообщение.
5. Убедиться, что страница показала success-сообщение.
6. Убедиться, что GitHub issue создан.
7. Временно сломать `GITHUB_ISSUES_TOKEN`.
8. Отправить еще одно тестовое сообщение.
9. Убедиться, что пришел fallback email.
10. Вернуть рабочий `GITHUB_ISSUES_TOKEN`.

## Защита от спама на первом этапе

Используется:

- hidden honeypot field `company`;
- CORS allowlist;
- rate limit через KV;
- лимиты длины полей;
- отклонение сообщений с большим количеством ссылок;
- отклонение HTML-ссылок вида `<a href=...>`.

Что сознательно не используется:

- Cloudflare Turnstile;
- reCAPTCHA;
- hCaptcha.

Причина: captcha может ухудшить доступность формы для российских пользователей.
Если спама станет много, captcha можно добавить позже как второй этап.

## Риски

- Если Cloudflare недоступен у пользователя, сайт откроется, но форма не
  отправится.
- GitHub API может быть недоступен или token может истечь.
- Email fallback зависит от Cloudflare Email Sending.
- Без captcha защита от спама слабее, чем у Formspree/Basin.

## План отката

Если Cloudflare Worker оказался нестабилен:

1. Оставить сайт на GitHub Pages.
2. Заменить `PUBLIC_CONTACT_ENDPOINT` на Formspree/Basin/Tally endpoint.
3. Или временно заменить форму на `mailto:`.
4. GitHub Pages deployment трогать не нужно.

## Formspree fallback

Если Worker станет слишком сложным в сопровождении:

1. Создать Formspree form.
2. Поменять `PUBLIC_CONTACT_ENDPOINT` на Formspree endpoint или заменить submit
   logic на стандартную Formspree-отправку.
3. Оставить одну кнопку `Отправить`.

Компромисс:

- меньше инфраструктуры;
- но free tier может быстро упереться в лимит submissions;
- GitHub Issues перестанут быть автоматическим единым каналом без отдельной
  интеграции.

## Точка принятия решения

Этот вариант выбирать, если верно все:

- основной сайт должен остаться на GitHub Pages;
- GitHub Issues должны быть главным каналом обратной связи;
- пользователи не должны видеть GitHub;
- риск недоступности только формы лучше, чем риск недоступности всего сайта;
- бесплатные лимиты Cloudflare Worker важнее, чем простота Formspree.
