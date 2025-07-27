import { expect, type Locator, type Page } from '@playwright/test';

export class CartConfirmationPage {
    readonly page: Page;
    readonly mainContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainContainer = page.getByTestId('cart-checkout-step');
    }

}




