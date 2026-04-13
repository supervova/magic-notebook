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

## Deployment

Automatic via GitHub Actions → GitHub Pages.
