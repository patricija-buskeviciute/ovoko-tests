import { Page, Locator } from '@playwright/test';

export class PageHeader {
  readonly page: Page;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.getByTestId('nav-:locale/cart');
  }

  async clickCartButton() {
    await this.cartButton.click();
  }

}