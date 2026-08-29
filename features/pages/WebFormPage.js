class WebFormPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.selenium.dev/selenium/web/web-form.html';
    this.textInput = page.getByLabel('Text input');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.message = page.locator('#message');
  }

  async open() {
    await this.page.goto(this.url);
  }

  async submitCredentials(name, password) {
    await this.textInput.fill(name);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

module.exports = { WebFormPage };