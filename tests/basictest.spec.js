import {test,expect} from'@playwright/test';

test('First Test',async ({page}) => {
   await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
   await expect(page).toHaveTitle('Web form');
});

test('Login Form',async ({page}) => {
   await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
   await page.getByLabel('Text input').type('Ejaj Khan');
   await page.getByLabel('Password').type('khan');
   await page.getByRole('button',{name:'Submit'}).click();
   await expect(page.locator('[id="message"]')).toHaveText('Received!');
   await expect(page.locator('[id="message"]')).toBeVisible();
});

test('Selection of Dropdown',async ({page,request}) => {
   await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
   await page.getByLabel('File input').setInputFiles('/Users/ejaj_khan/Downloads/30009457_Ejaj.pptx');
   await page.getByRole('button',{name:'Submit'}).click();
   await expect(page.locator('#message')).toHaveText('Received!');
});
test('Alert handing Accept',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   await page.getByPlaceholder('Enter Your Name').fill('Ejaj Khan');
   await page.getByRole('button', { name: 'Alert' }).click();
   page.on('dialog', async dialog => {
      console.log(`Dialog message Accept: ${dialog.message()}`);
      await dialog.accept();
   });
   await page.getByPlaceholder('Enter Your Name').fill('Ejaj Khan');
   await page.getByRole('button', { name: 'Alert' }).click();
});

test('Alert handing Dismiss',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   page.on('dialog', async dialog => {
      console.log(`Dialog message Dismiss: ${dialog.message()}`);
      await dialog.dismiss();
   });
   await page.getByPlaceholder('Enter Your Name').fill('Ejaj Khan');
   await page.getByRole('button', { name: 'Confirm' }).click();

});
test('New Tab Handling',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   const[newTab] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: 'Open Tab' }).click()
   ]);
   await newTab.waitForLoadState();
   console.log(await newTab.title());
   await expect(newTab).toHaveTitle('QAClick Academy - A Testing Academy to Learn, Earn and Shine');
   await newTab.close();
});

test('Window Handling',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   await page.getByRole('button', { name: 'Open Window' }).click();
   const newWindowPromise = page.waitForEvent('popup');
   const newWindow = await newWindowPromise;
   await newWindow.waitForLoadState();
   console.log(await newWindow.title());
   await expect(newWindow).toHaveTitle('QAClick Academy - A Testing Academy to Learn, Earn and Shine');
   await expect(newWindow.locator('h1').nth(1)).toHaveText('Become a Competent Software Test Automation Engineer');
   await newWindow.close();
});
test('Take Screenshot',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   await page.screenshot({path:`screenshot/${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`,fullPage:true});
});
test('Take Screenshot of Element',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   const element = await page.locator('[class="block large-row-spacer"]').nth(3);
   await element.screenshot({path:`screenshot/${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}_element.png`});
});
test('Mouse Hover',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   await page.getByRole('button', { name: 'Mouse Hover' }).scrollIntoViewIfNeeded();
   await page.waitForTimeout(5000)
   await page.getByRole('button', { name: 'Mouse Hover' }).hover();
   await page.waitForTimeout(5000);
   await page.getByRole('link', { name: 'Top' }).click();
   await expect(page).toHaveURL('https://rahulshettyacademy.com/AutomationPractice/#top');
});
test('Drag and Drop',async({page})=>{
   await page.goto('https://jqueryui.com/droppable/');
   const frame = page.frameLocator('.demo-frame');
   await frame.locator('#draggable').dragTo(frame.locator('#droppable'));
   await expect(frame.locator('#droppable p')).toHaveText('Dropped!');
});
test('Slider',async({page})=>{
   await page.goto('https://jqueryui.com/slider/');
   const frame = page.frameLocator('.demo-frame');
   const slider = frame.locator('#slider');
   const boundingBox = await slider.boundingBox();
   if (boundingBox) {
      const sliderWidth = boundingBox.width;
      const targetValue = 50; // Target value to set the slider to
      const targetPosition = (targetValue / 100) * sliderWidth;
      await slider.hover();
      await page.mouse.down();
      await page.mouse.move(boundingBox.x + targetPosition, boundingBox.y + boundingBox.height / 2);
      await page.mouse.up();
   }
});
test('Right Click',async({page})=>{
   await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');
   await page.locator('[class="context-menu-one btn btn-neutral"]').click({button:'right'});
   page.on('dialog', async dialog => {
      console.log(`Dialog message Right Click: ${dialog.message()}`);
      await dialog.accept();
   });
    await page.locator('[class="context-menu-item context-menu-icon context-menu-icon-copy"]').click();
});
test('Double Click',async({page})=>{
   await page.goto('https://api.jquery.com/dblclick/');
   const frame = page.frameLocator('iframe').first(); 
   await frame.locator('//body/div').first().dblclick();
   await expect(frame.locator('//body/div').first()).toHaveCSS('background-color', 'rgb(255, 255, 0)');
});
test('Total Count of Chennai',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   const list = await page.locator('//table[@id="product"]//td[contains(text(),"Chennai")]/following-sibling::td').all();
   let totalCount = 0;
   for (const element of list) {
      totalCount += parseInt(await element.textContent());
   }
   console.log(`Total Count of Chennai: ${totalCount}`);
});

test('Dropdown Selection',async({page})=>{
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   const dropdown = page.locator('#dropdown-class-example');
   await dropdown.selectOption('option2');
   const selectedValue = await dropdown.inputValue();
   console.log(`Selected value: ${selectedValue}`);
   expect(selectedValue).toBe('option2');
});
