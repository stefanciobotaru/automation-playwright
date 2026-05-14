import { test, expect, Page } from '@playwright/test';

/**
 * Selector Playground — Playwright POC Test Suite
 *
 * Run against the local file:
 *   npx playwright test selector-playground.spec.ts
 *
 * Or serve it first:
 *   npx serve trials/selector-playground
 *
 * Configure the BASE_URL below to match your setup.
 */
const BASE_URL = 'https://playground.clab.ro';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
async function openPage(page: Page) {
  await page.goto(BASE_URL);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. IDs & Classes
// ─────────────────────────────────────────────────────────────────────────────
test.describe('IDs & Classes', () => {
  test('locate by unique ID', async ({ page }) => {
    await openPage(page);
    const btn = page.locator('#btn-unique-id');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveText('Button #btn-unique-id');
  });

  test('locate by class name', async ({ page }) => {
    await openPage(page);
    const btn = page.locator('.btn-example-class');
    await expect(btn).toBeVisible();
  });

  test('locate by multiple classes', async ({ page }) => {
    await openPage(page);
    const badge = page.locator('.badge.status-active');
    await expect(badge).toHaveText('status-active');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Attribute Selectors
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Attribute Selectors', () => {
  test('locate by name attribute', async ({ page }) => {
    await openPage(page);
    const input = page.locator("[name='username']");
    await expect(input).toBeVisible();
    await input.fill('test_user');
    await expect(input).toHaveValue('test_user');
  });

  test('locate by placeholder attribute (contains)', async ({ page }) => {
    await openPage(page);
    const input = page.locator("[placeholder*='email']").first();
    await expect(input).toBeVisible();
  });

  test('locate by type attribute', async ({ page }) => {
    await openPage(page);
    const pwdInput = page.locator("#input-password");
    await expect(pwdInput).toHaveAttribute('type', 'password');
  });

  test('assert disabled attribute', async ({ page }) => {
    await openPage(page);
    const btn = page.locator('#btn-disabled');
    await expect(btn).toBeDisabled();
  });

  test('assert readonly attribute', async ({ page }) => {
    await openPage(page);
    const input = page.locator('#readonly-input');
    await expect(input).toHaveAttribute('readonly', '');
    await expect(input).toHaveValue('This is read-only');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. ARIA & Roles
// ─────────────────────────────────────────────────────────────────────────────
test.describe('ARIA & Roles (getByRole / getByLabel)', () => {
  test('getByRole button with aria-label', async ({ page }) => {
    await openPage(page);
    const btn = page.getByRole('button', { name: 'Submit form' });
    await expect(btn).toBeVisible();
  });

  test('getByRole searchbox', async ({ page }) => {
    await openPage(page);
    const searchbox = page.getByRole('searchbox', { name: 'Search products' });
    await expect(searchbox).toBeVisible();
    await searchbox.fill('playwright');
    await expect(searchbox).toHaveValue('playwright');
  });

  test('getByLabel input', async ({ page }) => {
    await openPage(page);
    const input = page.getByLabel('First name');
    await expect(input).toBeVisible();
    await input.fill('Alice');
    await expect(input).toHaveValue('Alice');
  });

  test('ARIA alert is hidden by default, visible after toggle', async ({ page }) => {
    await openPage(page);
    const alert = page.getByRole('alert');
    await expect(alert).toBeHidden();
    await page.getByRole('button', { name: 'Toggle ARIA Alert' }).click();
    await expect(alert).toBeVisible();
  });

  test('aria-current page in breadcrumb', async ({ page }) => {
    await openPage(page);
    const crumb = page.locator('[aria-current="page"]');
    await expect(crumb).toHaveText('Detail');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. data-testid
// ─────────────────────────────────────────────────────────────────────────────
test.describe('data-testid selectors', () => {
  test('getByTestId login button', async ({ page }) => {
    await openPage(page);
    const btn = page.getByTestId('login-button');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveText('Login');
  });

  test('getByTestId search input - fill', async ({ page }) => {
    await openPage(page);
    const input = page.getByTestId('search-input');
    await input.fill('selector playground');
    await expect(input).toHaveValue('selector playground');
  });

  test('getByTestId greeting text', async ({ page }) => {
    await openPage(page);
    const greeting = page.getByTestId('user-greeting');
    await expect(greeting).toContainText('Hello');
  });

  test('custom data-cy attribute', async ({ page }) => {
    await openPage(page);
    const btn = page.locator("[data-cy='submit-btn']");
    await expect(btn).toBeVisible();
  });

  test('custom data-qa attribute', async ({ page }) => {
    await openPage(page);
    const btn = page.locator("[data-qa='cancel-btn']");
    await expect(btn).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. CSS Selectors
// ─────────────────────────────────────────────────────────────────────────────
test.describe('CSS Selectors', () => {
  test('nth-child selectors', async ({ page }) => {
    await openPage(page);
    await expect(page.locator('#css-demo-list li:first-child')).toHaveText('Item 1');
    await expect(page.locator('#css-demo-list li:last-child')).toHaveText('Item 5');
    await expect(page.locator('#css-demo-list li:nth-child(3)')).toHaveText('Item 3');
  });

  test('odd and even items', async ({ page }) => {
    await openPage(page);
    const odd  = page.locator('#css-demo-list li:nth-child(odd)');
    const even = page.locator('#css-demo-list li:nth-child(even)');
    await expect(odd).toHaveCount(3);
    await expect(even).toHaveCount(2);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Form Inputs
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Form Inputs', () => {
  test('fill all text-based inputs', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('input-text').fill('Jane Doe');
    await page.getByTestId('input-email').fill('jane@example.com');
    await page.getByTestId('input-password').fill('S3cr3tPwd!');
    await page.getByTestId('input-number').fill('28');
    await page.getByTestId('input-textarea').fill('This is a test bio.');

    await expect(page.getByTestId('input-text')).toHaveValue('Jane Doe');
    await expect(page.getByTestId('input-email')).toHaveValue('jane@example.com');
    await expect(page.getByTestId('input-number')).toHaveValue('28');
    await expect(page.getByTestId('input-textarea')).toHaveValue('This is a test bio.');
  });

  test('fill date input', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('input-date').fill('2025-12-31');
    await expect(page.getByTestId('input-date')).toHaveValue('2025-12-31');
  });

  test('clear an input', async ({ page }) => {
    await openPage(page);
    const input = page.getByTestId('input-text');
    await input.fill('Some text');
    await input.clear();
    await expect(input).toHaveValue('');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Checkboxes & Radios
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Checkboxes & Radio Buttons', () => {
  test('checkbox is checked by default', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('cb-playwright')).toBeChecked();
  });

  test('check and uncheck a checkbox', async ({ page }) => {
    await openPage(page);
    const cb = page.getByTestId('cb-selenium');
    await cb.check();
    await expect(cb).toBeChecked();
    await cb.uncheck();
    await expect(cb).not.toBeChecked();
  });

  test('disabled checkbox cannot be interacted with', async ({ page }) => {
    await openPage(page);
    const cb = page.locator('#cb-disabled');
    await expect(cb).toBeDisabled();
  });

  test('radio button selection', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('radio-enterprise').check();
    await expect(page.getByTestId('radio-enterprise')).toBeChecked();
    await expect(page.getByTestId('radio-free')).not.toBeChecked();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Dropdowns
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Dropdowns (select)', () => {
  test('select by value', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('select-country').selectOption('ro');
    await expect(page.getByTestId('select-country')).toHaveValue('ro');
  });

  test('select by label', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('select-country').selectOption({ label: 'Germany' });
    await expect(page.getByTestId('select-country')).toHaveValue('de');
  });

  test('multi-select', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('select-multi').selectOption(['js', 'ts', 'py']);
    const values = await page.getByTestId('select-multi').evaluate((el: HTMLSelectElement) =>
      [...el.selectedOptions].map(o => o.value)
    );
    expect(values).toEqual(['js', 'ts', 'py']);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. File Upload
// ─────────────────────────────────────────────────────────────────────────────
test.describe('File Upload', () => {
  test('set a single file', async ({ page }) => {
    await openPage(page);
    // Uses a buffer as a virtual file
    await page.getByTestId('file-upload').setInputFiles({
      name: 'test-image.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-png-content'),
    });
    const fileName = await page.locator('#file-name-display').textContent();
    expect(fileName).toContain('test-image.png');
  });

  test('set multiple files', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('file-upload-multi').setInputFiles([
      { name: 'file1.txt', mimeType: 'text/plain', buffer: Buffer.from('file1') },
      { name: 'file2.txt', mimeType: 'text/plain', buffer: Buffer.from('file2') },
    ]);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. Buttons
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Buttons', () => {
  test('click primary button shows toast', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('btn-primary').click();
    await expect(page.getByTestId('toast-message')).toBeVisible();
    await expect(page.getByTestId('toast-message')).toHaveText('Primary clicked');
  });

  test('disabled button is not clickable', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('btn-disabled')).toBeDisabled();
  });

  test('double click', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('btn-dblclick').dblclick();
    await expect(page.locator('#click-output')).toHaveText('Double-clicked! ✓');
  });

  test('right click', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('btn-rightclick').click({ button: 'right' });
    await expect(page.locator('#click-output')).toHaveText('Right-click detected! ✓');
  });

  test('notification counter increments', async ({ page }) => {
    await openPage(page);
    await page.locator('#btn-notif').click();
    await page.locator('#btn-notif').click();
    await expect(page.getByTestId('notif-count')).toHaveText('2');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 11. Modal
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Modal Dialog', () => {
  test('open and confirm modal', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('modal-overlay')).not.toBeVisible();
    await page.getByTestId('btn-open-modal').click();
    await expect(page.getByTestId('modal-overlay')).toBeVisible();
    await page.getByTestId('modal-confirm').click();
    await expect(page.getByTestId('modal-overlay')).not.toBeVisible();
    await expect(page.locator('#modal-output')).toHaveText('Modal confirmed! ✓');
  });

  test('open and cancel modal', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('btn-open-modal').click();
    await page.getByTestId('modal-cancel').click();
    await expect(page.getByTestId('modal-overlay')).not.toBeVisible();
  });

  test('browser alert dialog', async ({ page }) => {
    await openPage(page);
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('This is a browser alert!');
      await dialog.accept();
    });
    await page.getByTestId('btn-alert').click();
  });

  test('browser confirm dialog — accept', async ({ page }) => {
    await openPage(page);
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    await page.getByTestId('btn-confirm').click();
    await expect(page.locator('#modal-output')).toHaveText('Confirmed ✓');
  });

  test('browser confirm dialog — dismiss', async ({ page }) => {
    await openPage(page);
    page.on('dialog', async dialog => { await dialog.dismiss(); });
    await page.getByTestId('btn-confirm').click();
    await expect(page.locator('#modal-output')).toHaveText('Cancelled ✗');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 12. Tabs
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Tabs', () => {
  test('default tab panel is visible', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('tabpanel-overview')).toBeVisible();
    await expect(page.getByTestId('tabpanel-details')).not.toBeVisible();
  });

  test('switch to Details tab', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('tab-details').click();
    await expect(page.getByTestId('tabpanel-details')).toBeVisible();
    await expect(page.getByTestId('tabpanel-overview')).not.toBeVisible();
  });

  test('switch to Reviews tab', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('tab-reviews').click();
    await expect(page.getByTestId('tabpanel-reviews')).toBeVisible();
    await expect(page.getByTestId('tabpanel-reviews')).toContainText('4.2');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 13. Accordion
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Accordion', () => {
  test('accordion body hidden by default', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('accordion-body-1')).not.toBeVisible();
  });

  test('expand accordion item', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('accordion-header-1').click();
    await expect(page.getByTestId('accordion-body-1')).toBeVisible();
    await expect(page.getByTestId('accordion-body-1')).toContainText('Playwright');
  });

  test('collapse accordion item', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('accordion-header-1').click();
    await expect(page.getByTestId('accordion-body-1')).toBeVisible();
    await page.getByTestId('accordion-header-1').click();
    await expect(page.getByTestId('accordion-body-1')).not.toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 14. Hover & Tooltip
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Hover', () => {
  test('hover box changes background on hover', async ({ page }) => {
    await openPage(page);
    const box = page.getByTestId('hover-box');
    await box.hover();
    // After hover the CSS changes — verify via computed style
    const bg = await box.evaluate(el =>
      window.getComputedStyle(el).getPropertyValue('background-color')
    );
    // accent color = rgb(124, 106, 247)
    expect(bg).toContain('124');
  });

  test('mouse enter event on button', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('hover-button').hover();
    await expect(page.locator('#hover-output')).toHaveText('Mouse entered!');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 15. Dropdown Menu
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Dropdown Menu', () => {
  test('menu hidden by default', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('dropdown-menu')).not.toBeVisible();
  });

  test('click trigger shows menu', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('dropdown-trigger').click();
    await expect(page.getByTestId('dropdown-menu')).toBeVisible();
  });

  test('select Settings from dropdown', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('dropdown-trigger').click();
    await page.getByTestId('dropdown-item-settings').click();
    await expect(page.locator('#dropdown-output')).toHaveText('Selected: Settings');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 16. Table
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Table', () => {
  test('table has correct row count', async ({ page }) => {
    await openPage(page);
    const rows = page.locator('#users-table tbody tr');
    await expect(rows).toHaveCount(5);
  });

  test('first row cell values', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('cell-id-1')).toHaveText('001');
    await expect(page.getByTestId('cell-name-1')).toHaveText('Alice Johnson');
    await expect(page.getByTestId('cell-role-1')).toHaveText('SDET');
    await expect(page.getByTestId('status-1')).toHaveText('Active');
  });

  test('getByRole row and cell', async ({ page }) => {
    await openPage(page);
    const table = page.getByTestId('users-table');
    const rows = table.getByRole('row');
    // Including header row
    await expect(rows).toHaveCount(6);
  });

  test('filter rows by text', async ({ page }) => {
    await openPage(page);
    const rows = page.locator('#users-table tbody tr');
    const sdtRows = rows.filter({ hasText: 'SDET' });
    await expect(sdtRows).toHaveCount(2);
  });

  test('click edit button in specific row', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('edit-2').click();
    await expect(page.getByTestId('toast-message')).toContainText('Bob');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 17. Pagination
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Pagination', () => {
  test('initial page is 1', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('paginated-content')).toContainText('Page 1');
  });

  test('navigate to page 3', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('page-3').click();
    await expect(page.getByTestId('paginated-content')).toContainText('Page 3');
    await expect(page.getByTestId('paginated-content')).toContainText('Items 11–15');
  });

  test('next button increments page', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('page-next').click();
    await expect(page.getByTestId('paginated-content')).toContainText('Page 2');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 18. Dynamic Content & Waits
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Dynamic Content', () => {
  test('delayed element appears after 2s', async ({ page }) => {
    await openPage(page);
    const el = page.getByTestId('delayed-element');
    await expect(el).not.toBeVisible();
    await page.getByTestId('btn-show-delayed').click();
    await expect(el).toBeVisible({ timeout: 4000 });
    await expect(el).toContainText('waitFor()');
  });

  test('counter increments', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('btn-start-counter').click();
    await page.waitForTimeout(2100);
    const val = await page.getByTestId('counter-value').textContent();
    expect(parseInt(val ?? '0')).toBeGreaterThanOrEqual(2);
    await page.getByTestId('btn-stop-counter').click();
  });

  test('toggle element visibility', async ({ page }) => {
    await openPage(page);
    const el = page.getByTestId('toggle-text');
    await expect(el).toBeVisible();
    await page.getByTestId('btn-toggle-text').click();
    await expect(el).not.toBeVisible();
    await page.getByTestId('btn-toggle-text').click();
    await expect(el).toBeVisible();
  });

  test('add and remove list items', async ({ page }) => {
    await openPage(page);
    const list = page.getByTestId('dynamic-list');
    await page.getByTestId('btn-add-item').click();
    await page.getByTestId('btn-add-item').click();
    await page.getByTestId('btn-add-item').click();
    await expect(list.locator('li')).toHaveCount(3);
    await page.getByTestId('btn-remove-item').click();
    await expect(list.locator('li')).toHaveCount(2);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 19. Loading State
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Loading States', () => {
  test('spinner appears then disappears, result becomes visible', async ({ page }) => {
    await openPage(page);
    const spinner = page.getByTestId('loading-spinner');
    const result  = page.getByTestId('fetch-result');

    await expect(spinner).not.toBeVisible();
    await page.getByTestId('btn-fetch-data').click();
    await expect(spinner).toBeVisible();
    await expect(spinner).toBeHidden({ timeout: 4000 });
    await expect(result).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 20. Multi-step Form
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Multi-step Form', () => {
  test('complete all steps', async ({ page }) => {
    await openPage(page);

    // Step 1
    await expect(page.getByTestId('step-form-1')).toBeVisible();
    await page.getByTestId('step-fname').fill('Jane');
    await page.getByTestId('step-lname').fill('Doe');
    await page.getByTestId('step-next-1').click();

    // Step 2
    await expect(page.getByTestId('step-form-2')).toBeVisible();
    await expect(page.getByTestId('step-form-1')).not.toBeVisible();
    await page.getByTestId('step-email').fill('jane@example.com');
    await page.getByTestId('step-pass').fill('password123');
    await page.getByTestId('step-next-2').click();

    // Step 3
    await expect(page.getByTestId('step-form-3')).toBeVisible();
    await page.getByTestId('step-submit').click();
    await expect(page.getByTestId('toast-message')).toContainText('Registration complete');
  });

  test('back navigation from step 2', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('step-next-1').click();
    await expect(page.getByTestId('step-form-2')).toBeVisible();
    await page.getByTestId('step-prev-2').click();
    await expect(page.getByTestId('step-form-1')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 21. Progress Bar
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Progress Bar', () => {
  test('progress bar reaches 100%', async ({ page }) => {
    await openPage(page);
    const bar = page.getByTestId('progress-bar');
    await expect(bar).toHaveAttribute('aria-valuenow', '0');
    await page.getByTestId('btn-start-progress').click();
    await expect(bar).toHaveAttribute('aria-valuenow', '100', { timeout: 8000 });
  });

  test('reset progress bar', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('btn-start-progress').click();
    await page.waitForTimeout(500);
    await page.getByTestId('btn-reset-progress').click();
    await expect(page.getByTestId('progress-bar')).toHaveAttribute('aria-valuenow', '0');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 22. Drag & Drop
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Drag & Drop', () => {
  test('drag item to drop zone', async ({ page }) => {
    await openPage(page);
    const source = page.getByTestId('drag-item-1');
    const target = page.getByTestId('drop-zone');
    await source.dragTo(target);
    await expect(page.getByTestId('drop-result')).toContainText('Item A');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 23. iFrame
// ─────────────────────────────────────────────────────────────────────────────
test.describe('iFrame', () => {
  test('fill input inside iframe', async ({ page }) => {
    await openPage(page);
    const frame = page.frameLocator('#embedded-frame');
    await frame.locator('#iframe-input').fill('Hello from Playwright!');
    await expect(frame.locator('#iframe-input')).toHaveValue('Hello from Playwright!');
  });

  test('click button inside iframe', async ({ page }) => {
    await openPage(page);
    const frame = page.frameLocator('#embedded-frame');
    await frame.locator('#iframe-btn').click();
    await expect(frame.locator('#iframe-btn')).toHaveText('Clicked!');
  });

  test('read text inside iframe', async ({ page }) => {
    await openPage(page);
    const frame = page.frameLocator('#embedded-frame');
    await expect(frame.locator('#iframe-text')).toContainText('frameLocator');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 24. Shadow DOM
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Shadow DOM', () => {
  test('fill shadow DOM input and click shadow button', async ({ page }) => {
    await openPage(page);
    // Playwright pierces shadow DOM automatically with locator()
    const shadowInput = page.locator('#shadow-input');
    const shadowBtn   = page.locator('#shadow-button');
    await shadowInput.fill('Shadow value');
    await shadowBtn.click();
    const output = page.locator('#shadow-output');
    await expect(output).toContainText('Shadow value');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 25. Keyboard Events
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Keyboard Input', () => {
  test('type into keyboard input and check log', async ({ page }) => {
    await openPage(page);
    const input = page.getByTestId('keyboard-input');
    await input.click();
    await page.keyboard.type('abc');
    const log = await page.locator('#keyboard-log').textContent();
    expect(log).toContain('key: c');
  });

  test('press special keys', async ({ page }) => {
    await openPage(page);
    const input = page.getByTestId('keyboard-input');
    await input.click();
    await page.keyboard.press('Tab');
    // focus should move to next element — textarea
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    expect(focused).toBe('keyboard-textarea');
  });

  test('keyboard shortcut Ctrl+A selects all', async ({ page }) => {
    await openPage(page);
    const ta = page.getByTestId('keyboard-textarea');
    await ta.fill('Select all this text');
    await ta.press('Control+A');
    // After Ctrl+A the text should be selected (selection length check)
    const selected = await ta.evaluate((el: HTMLTextAreaElement) =>
      el.value.substring(el.selectionStart, el.selectionEnd)
    );
    expect(selected).toBe('Select all this text');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 26. Nested Lists
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Nested Lists', () => {
  test('count all list items including nested', async ({ page }) => {
    await openPage(page);
    const allItems = page.getByTestId('nested-list').locator('li');
    await expect(allItems).toHaveCount(9);
  });

  test('filter nested items by text', async ({ page }) => {
    await openPage(page);
    const javaItem = page.getByTestId('list-item-selenium-java');
    await expect(javaItem).toHaveText('Java');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 27. Badges & Status
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Badges & Status', () => {
  test('all badge variants are present', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('badge-active')).toHaveText('Active');
    await expect(page.getByTestId('badge-inactive')).toHaveText('Inactive');
    await expect(page.getByTestId('badge-pending')).toHaveText('Pending');
    await expect(page.getByTestId('badge-new')).toHaveText('New');
  });

  test('toggle status dot between online and offline', async ({ page }) => {
    await openPage(page);
    await expect(page.getByTestId('status-dot-online')).toBeVisible();
    await expect(page.getByTestId('status-text')).toHaveText('Online');
    await page.getByRole('button', { name: 'Toggle Status' }).click();
    await expect(page.getByTestId('status-dot-offline')).toBeVisible();
    await expect(page.getByTestId('status-text')).toHaveText('Offline');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 28. Lazy Load
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Lazy Load', () => {
  test('initial items are loaded', async ({ page }) => {
    await openPage(page);
    const items = page.getByTestId('lazy-list').locator('li');
    await expect(items).toHaveCount(5);
  });

  test('load more appends more items', async ({ page }) => {
    await openPage(page);
    await page.getByTestId('lazy-loader').getByRole('button').click();
    const items = page.getByTestId('lazy-list').locator('li');
    await expect(items).toHaveCount(10);
  });
});
