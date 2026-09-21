import { test,expect } from '@playwright/test';

test('Amazon Search Samsung Mobile', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  const searchBox = await page.getByPlaceholder('Search Amazon.in');
  await searchBox.fill('Samsung Mobile');
  await searchBox.press('Enter');
  await page.waitForTimeout(5000);
  const samsung = await page.locator('//div[@class="a-section a-spacing-small a-spacing-top-small"]').all();
  for (const sam of samsung) {
    const text = await sam.locator('xpath=ancestor::div/div/div/div/div/h2/span[contains(text(),"Samsung")]').textContent();
    expect(text).toBe('Samsung');
  }
});
