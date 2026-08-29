const { Before, After, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function ({ result }) {
  if (result?.status === Status.FAILED && this.page) {
    await this.attach(await this.page.screenshot(), 'image/png');
  }

  await this.context?.close();
  await this.browser?.close();
});