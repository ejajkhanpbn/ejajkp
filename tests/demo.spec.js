import { test, expect } from '@playwright/test';

test('Demo Test',async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  const list=await page.locator('//div[@class="inventory_item_label"]/a').all();
  for(const product of list)
  {
    const name=await product.textContent();
    console.log(name);
  }
  expect(list.length).toBe(6);
  const items=await page.locator('[data-test="inventory-item-price"]').all();

  for(const item of items)
  {
   const price = parseFloat((await item.textContent() ?? '').replace('$', ''));
   if(price<10)
    {
      await item.locator('xpath=ancestor::div[contains(@class, "inventory_item")]').getByRole('button', { name: 'Add to cart' }).click();
      console.log(price);
    }
  }
  await page.waitForTimeout(5000);

});