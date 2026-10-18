# map-of-damnation

This project is about a religious map where selecting certain religions shows what percentage of the world would go to hell.

## Structure

npm workspaces monorepo:

```
packages/
  model/              Shared domain logic (religion math)
  ui/                 React + TypeScript app (Vite)
    e2e/              Playwright end-to-end tests
```

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for dev server and builds
- [Playwright](https://playwright.dev) for end-to-end tests (with UI mode)
- [Vitest](https://vitest.dev) for unit tests
- [Turborepo](https://turborepo.com) for task orchestration and caching
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting, [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting

## Getting started

```sh
npm install
npx playwright install chromium   # first time only
npm run dev
```

## Scripts (run from repo root)

| Script                 | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | Start the UI dev server                                         |
| `npm run build`        | Build model + UI for production                                 |
| `npm run lint`         | Lint the whole repo with oxlint                                 |
| `npm run format`       | Format the whole repo with oxfmt                                |
| `npm run format:check` | Check formatting only                                           |
| `npm run test:e2e`     | Run Playwright tests headless (starts dev server automatically) |
| `npm run test:ui`      | Open Playwright UI mode                                         |
| `npm test`             | Run unit tests (Vitest, model package)                          |

## CI

`.github/workflows/ci.yml` runs on pushes and PRs to `main`, staged as a dependency chain:

1. **Build** — `npm run build`, uploads `packages/ui/dist` as an artifact
2. **Unit tests** — `npm test` (Vitest) — runs only if the build succeeded
3. **E2E tests** — Playwright (Chromium), uploads the HTML report as an artifact — runs in parallel with unit tests, both gated on the build
4. **CodeQL static analysis** — `javascript-typescript` queries — runs last, only after both test suites pass; results appear under the repo's **Security → Code scanning** tab
