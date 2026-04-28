# Magic Notebook — Website

Official website for **Magic Notebook** — a calm, writing-first desktop app for bloggers, journalists, and authors.

**Principles:** static-first, content-first, minimal JS.

## Stack

- Astro (SSG)
- Native `.astro` templates
- Markdown / Content Collections
- CSS + PostCSS
- GitHub Pages (static deploy)

## Structure

- `/` — landing
- `/whats-new/` — releases
- `/support-project/` — make your donation
- `/contact-us/` — feedback form
- `/ru/*` - Russian version

## Commands

| Command                        | Action                                                |
| :----------------------------- | :---------------------------------------------------- |
| `pnpm install`                 | Installs dependencies                                 |
| `pnpm dev`                     | Starts local dev server at `localhost:4321`           |
| `pnpm build`                   | Build your production site to `./dist/`               |
| `pnpm preview`                 | Preview your build locally, before deploying          |
| `pnpm astro ...`               | Run CLI commands like `astro add`, `astro check`      |
| `pnpm astro -- --help`         | Get help using the Astro CLI                          |
| `pnpm outdated --format table` | Shows a table of outdated dependencies in the project |

## Contact Form

The website stays on GitHub Pages. The feedback form posts to a standalone
Cloudflare Worker endpoint:

```txt
https://feedback.magic-notebook.com/contact
```

The endpoint code lives in:

```txt
workers/contact.js
```

Required Cloudflare settings:

- `GITHUB_ISSUES_TOKEN` — Worker secret with write access to repository issues.
- `CONTACT_EMAIL` — Cloudflare Email Sending binding for fallback notifications.
- `CONTACT_EMAIL_FROM` — verified sender address on the Magic Notebook domain.
- `CONTACT_EMAIL_TO` — verified recipient address for fallback notifications.

Optional Cloudflare settings:

- `CONTACT_RATE_LIMIT` — KV namespace binding for per-IP rate limiting.
- `CONTACT_GITHUB_OWNER` — defaults to `supervova`.
- `CONTACT_GITHUB_REPO` — defaults to `magic-notebook`.
- `CONTACT_GITHUB_LABELS` — defaults to `feedback,website`.
- `CONTACT_ALLOWED_ORIGINS` — defaults to `https://magic-notebook.com,https://www.magic-notebook.com`.
- `PUBLIC_CONTACT_ENDPOINT` — build-time override if the Worker URL changes.

## Deployment

Automatic via GitHub Actions → GitHub Pages. The feedback endpoint is deployed
separately as a Cloudflare Worker.
