import { expect, type Locator, type Page } from '@playwright/test';

export class CartLoginPage {
    readonly page: Page;
    readonly buyAsGuestButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buyAsGuestButton = page.getByTestId('buy-as-a-guest-button');
    }

    async buyAsGuest() {
        await this.buyAsGuestButton.click();
    }

}

