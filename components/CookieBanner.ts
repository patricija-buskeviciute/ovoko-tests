import { Page, Locator } from '@playwright/test';
import { urls } from '../utils/e2e-urls';

export class CookieBanner {
  readonly page: Page;
  readonly acceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptButton = page.getByRole('button', { name: 'Leisti visus slapukus' });
  }

  async acceptCookies() {
    await this.page.goto(urls.base);
    await this.acceptButton.click();
  }
}