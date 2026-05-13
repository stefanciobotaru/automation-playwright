import { expect, type Locator, type Page } from '@playwright/test';

// ── Finders ──────────────────────────────────────────────────────────────────

/** Find element by CSS selector. */
export function findByCss(page: Page, selector: string): Locator {
  return page.locator(selector);
}

/** Find element by visible text (exact or partial). */
export function findByText(page: Page, text: string | RegExp): Locator {
  return page.getByText(text);
}

/** Find element by placeholder text. */
export function findByPlaceholder(page: Page, text: string | RegExp): Locator {
  return page.getByPlaceholder(text);
}

/** Find element by accessible role. */
export function findByRole(
  page: Page,
  role: Parameters<Page['getByRole']>[0],
  options?: Parameters<Page['getByRole']>[1],
): Locator {
  return page.getByRole(role, options);
}

/** Find element by data-testid attribute. */
export function findByTestId(page: Page, testId: string): Locator {
  return page.getByTestId(testId);
}

/** Find element by label text. */
export function findByLabel(page: Page, text: string | RegExp): Locator {
  return page.getByLabel(text);
}

// ── Waits ─────────────────────────────────────────────────────────────────────

/** Wait for element to be visible. */
export async function waitForVisible(
  locator: Locator,
  timeout = 5000,
): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

/** Wait for element to be hidden / removed. */
export async function waitForHidden(
  locator: Locator,
  timeout = 5000,
): Promise<void> {
  await locator.waitFor({ state: 'hidden', timeout });
}

/** Wait for navigation to a URL matching the pattern. */
export async function waitForUrl(
  page: Page,
  urlPattern: string | RegExp,
): Promise<void> {
  await page.waitForURL(urlPattern);
}

// ── Clicks ────────────────────────────────────────────────────────────────────

/** Click an element (waits for it to be actionable first). */
export async function click(locator: Locator): Promise<void> {
  await locator.click();
}

/** Click if the element is visible; silently skips if not. Returns true if clicked. */
export async function clickIfVisible(
  locator: Locator,
  timeout = 1500,
): Promise<boolean> {
  try {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
    return true;
  } catch {
    return false;
  }
}

/** Double-click an element. */
export async function doubleClick(locator: Locator): Promise<void> {
  await locator.dblclick();
}

/** Right-click (context menu) an element. */
export async function rightClick(locator: Locator): Promise<void> {
  await locator.click({ button: 'right' });
}

// ── Input ─────────────────────────────────────────────────────────────────────

/** Clear a field and type new text. */
export async function fill(locator: Locator, value: string): Promise<void> {
  await locator.fill(value);
}

/** Type text character by character (triggers key events). */
export async function type(locator: Locator, value: string): Promise<void> {
  await locator.pressSequentially(value);
}

/** Clear the value of an input. */
export async function clear(locator: Locator): Promise<void> {
  await locator.clear();
}

/** Press a keyboard key on a focused element (e.g. 'Enter', 'Tab'). */
export async function pressKey(
  locator: Locator,
  key: string,
): Promise<void> {
  await locator.press(key);
}

/** Select an <option> by visible label inside a <select>. */
export async function selectOption(
  locator: Locator,
  label: string,
): Promise<void> {
  await locator.selectOption({ label });
}

/** Check a checkbox or radio button. */
export async function check(locator: Locator): Promise<void> {
  await locator.check();
}

/** Uncheck a checkbox. */
export async function uncheck(locator: Locator): Promise<void> {
  await locator.uncheck();
}

// ── Assertions ────────────────────────────────────────────────────────────────

/** Assert element is visible. */
export async function assertVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}

/** Assert element is hidden. */
export async function assertHidden(locator: Locator): Promise<void> {
  await expect(locator).toBeHidden();
}

/** Assert element contains text. */
export async function assertText(
  locator: Locator,
  text: string | RegExp,
): Promise<void> {
  await expect(locator).toContainText(text);
}

/** Assert element has an exact value (input/textarea). */
export async function assertValue(
  locator: Locator,
  value: string,
): Promise<void> {
  await expect(locator).toHaveValue(value);
}

/** Assert page title matches. */
export async function assertTitle(
  page: Page,
  title: string | RegExp,
): Promise<void> {
  await expect(page).toHaveTitle(title);
}

/** Assert current URL matches. */
export async function assertUrl(
  page: Page,
  url: string | RegExp,
): Promise<void> {
  await expect(page).toHaveURL(url);
}

// ── Misc ──────────────────────────────────────────────────────────────────────

/** Scroll element into view. */
export async function scrollIntoView(locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
}

/** Hover over an element. */
export async function hover(locator: Locator): Promise<void> {
  await locator.hover();
}

/** Get the inner text of an element. */
export async function getText(locator: Locator): Promise<string> {
  return locator.innerText();
}

/** Get the value of an attribute. */
export async function getAttribute(
  locator: Locator,
  name: string,
): Promise<string | null> {
  return locator.getAttribute(name);
}

/** Take a screenshot scoped to a single element. */
export async function screenshotElement(
  locator: Locator,
): Promise<Buffer> {
  return locator.screenshot();
}
