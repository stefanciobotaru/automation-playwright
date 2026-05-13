# automation-playwright

Minimal Playwright testing framework in TypeScript with a few Google Search web test examples.

## Requirements

- Node.js 20+

## Install

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
npm test
```

Useful scripts:

- `npm run test:headed`
- `npm run test:ui`
- `npm run report`

## Included examples

- Verify the Google homepage loads.
- Search from the homepage and assert the query is preserved.
- Open a Google results page directly and verify the results area appears.

## Notes

- Google may show a consent screen depending on region. The test suite includes a lightweight consent handler for common button labels.
- Browser binaries are not committed. Install them locally with `npx playwright install chromium`.