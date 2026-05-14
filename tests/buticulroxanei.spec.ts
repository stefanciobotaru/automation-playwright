import { expect, type Page, test } from '@playwright/test';
import * as helpers from './helpers';

async function searchCatalog(page: Page, query: string): Promise<void> {
  const searchInput = helpers.findByCss(page, 'input.ui-autocomplete-input').first();
  await helpers.assertVisible(searchInput);
  await helpers.fill(searchInput, query);
  await helpers.pressKey(searchInput, 'Enter');
}

test('get first product price', async ({ page }) => {
  await page.goto('/');

  await helpers.assertTitle(page, /Buticul Roxanei/);
  await helpers.assertVisible(helpers.findByCss(page, 'input.ui-autocomplete-input').first());

  await searchCatalog(page, 'figurina');

  const productName = 'Margaretă';
  const product = helpers.findByCss(page, 'article.product-miniature').filter({ hasText: productName });
  await helpers.click(product.locator('a.thumbnail.product-thumbnail').first());

  const price = await helpers.getText(helpers.findByCss(page, 'span.current-price-value').first());
  console.log('Product price:', price.trim());

  await page.pause();
});