import { expect, type Locator, type Page } from '@playwright/test';
import { urls } from '../utils/e2e-urls.ts';

export class EngineCategoryPage {
    readonly page: Page;
    readonly productCard: Locator;
    readonly addToCartButton: Locator;
    readonly url = `${urls.base}${urls.engineCategory}`;

    constructor(page: Page) {
        this.page = page;

        this.productCard = page
            .getByTestId("product-card")

        this.addToCartButton = page
            .getByTestId("button-add-to-cart")
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async addToCartFirstProductAvailable() {
        await this.addToCartButton.first().click();
    }

}