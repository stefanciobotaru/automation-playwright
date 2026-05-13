import { expect, type Page, test } from '@playwright/test';
import { assertTitle, assertVisible, click, fill, findByCss, getText, pressKey } from './helpers';

async function searchCatalog(page: Page, query: string): Promise<void> {
  const searchInput = findByCss(page, 'input.ui-autocomplete-input').first();
  await assertVisible(searchInput);
  await fill(searchInput, query);
  await pressKey(searchInput, 'Enter');
}

test('get first product price', async ({ page }) => {
  await page.goto('/');

  await assertTitle(page, /Buticul Roxanei/);
  await assertVisible(findByCss(page, 'input.ui-autocomplete-input').first());

  await searchCatalog(page, 'figurina');

  const productName = 'Margaretă';
  const product = findByCss(page, 'article.product-miniature').filter({ hasText: productName });
  await click(product.locator('a.thumbnail.product-thumbnail').first());

  const price = await getText(findByCss(page, 'span.current-price-value').first());
  console.log('Product price:', price.trim());

  await page.pause();
});