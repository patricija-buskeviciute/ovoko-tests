import { expect, type Locator, type Page } from '@playwright/test';
import { urls } from '../../utils/e2e-urls.ts';

export class CartPage {
    readonly page: Page;
    readonly continueButton: Locator;
    readonly cartStepContainer: Locator;
    readonly removeFromCart: Locator;
    readonly emptyCartContainer: Locator;
    readonly url = `${urls.base}${urls.cart}`;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.getByTestId('cart-submit-button');
        this.cartStepContainer = page.getByTestId('cart-step');
        this.removeFromCart = page.getByTestId('remove-from-cart')
        this.emptyCartContainer = page.getByTestId('empty-cart');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async proceedToLogin() {
        await this.continueButton.click();
    }

    async removeCartItem() {
        await this.removeFromCart.click();
    }

}

