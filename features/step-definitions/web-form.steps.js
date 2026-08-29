const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');
const { WebFormPage } = require('../pages/WebFormPage');

Given('I open the web form', async function () {
  this.webFormPage = new WebFormPage(this.page);
  await this.webFormPage.open();
});

Then('the page title should be {string}', async function (expectedTitle) {
  assert.equal(await this.page.title(), expectedTitle);
  console.log(`Page title is: ${await this.page.title()}`);
});

When('I submit the form with name {string} and password {string}', async function (name, password) {
  await this.webFormPage.submitCredentials(name, password);
});

Then('the form result should be {string}', async function (expectedMessage) {
  assert.equal(await this.webFormPage.message.textContent(), expectedMessage);
  console.log(`Form result message is: ${await this.webFormPage.message.textContent()}`)
});