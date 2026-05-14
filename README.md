# automation-playwright

Playwright test automation framework in TypeScript targeting [buticulroxanei.ro](https://buticulroxanei.ro).

Selector playground host: [playground.clab.ro](https://playground.clab.ro)

## Requirements

- Node.js 22.x (pinned via `.nvmrc`)

## Install

```bash
nvm use        # switch to Node 22 (if using nvm)
npm install
npx playwright install chromium
```

## Run tests

```bash
# Headless (CI)
npm test

# Headed (see the browser)
npm run test:headed

# Interactive UI mode
npm run test:ui

# View last HTML report
npm run report

# Run a specific file
npx playwright test tests/buticulroxanei.spec.ts
npx playwright test tests/selector-playground.spec.ts

# Run a specific test by name
npx playwright test -g "get first product price"
```

## Project structure

```
tests/
  buticulroxanei.spec.ts   # Tests for buticulroxanei.ro
  selector-playground.spec.ts # Selector coverage POC against hosted playground site
  helpers.ts               # Reusable interaction helpers
playwright.config.ts       # Playwright configuration
```

## helpers.ts — reusable functions

| Category   | Functions |
|------------|-----------|
| Finders    | `findByCss`, `findByText`, `findByPlaceholder`, `findByRole`, `findByTestId`, `findByLabel` |
| Waits      | `waitForVisible`, `waitForHidden`, `waitForUrl` |
| Clicks     | `click`, `clickIfVisible`, `doubleClick`, `rightClick` |
| Input      | `fill`, `type`, `clear`, `pressKey`, `selectOption`, `check`, `uncheck` |
| Assertions | `assertVisible`, `assertHidden`, `assertText`, `assertValue`, `assertTitle`, `assertUrl` |
| Misc       | `hover`, `scrollIntoView`, `getText`, `getAttribute`, `screenshotElement` |

## Included tests

### buticulroxanei.spec.ts
- Search the product catalog by keyword
- Filter results by product name and click a specific product
- Read and print the product price

### selector-playground.spec.ts
- End-to-end selector coverage for IDs, classes, attributes, ARIA roles, and data-testid
- Interaction coverage for forms, table, modal/dialogs, tabs, accordion, dropdown, and pagination
- Advanced coverage for dynamic waits, progress bar, drag and drop, iframe, and shadow DOM
- Targets [playground.clab.ro](https://playground.clab.ro), configured in the BASE_URL constant inside the spec file

## Notes

- Node 22 is required — Node 26 triggers a `DEP0205` deprecation warning in Playwright's ESM loader.
- Browser binaries are not committed. Run `npx playwright install chromium` after cloning.
- Selector playground tests are expected to run against [playground.clab.ro](https://playground.clab.ro).