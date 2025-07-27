import { expect, type Locator, type Page } from '@playwright/test';

export class AddedToCartModal {
    readonly page: Page;
    readonly buyButton: Locator;
    readonly mainContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainContainer = page.getByTestId('added-to-cart-modal');
        this.buyButton = page.getByTestId('buy-modal-link-to-cart');
    }

    async clickBuyButton() {
        await this.buyButton.click();
    }

    async modalIsVisible() {
        await this.mainContainer.isVisible();
    }



}

