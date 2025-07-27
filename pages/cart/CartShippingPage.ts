import { expect, type Locator, type Page } from '@playwright/test';

export class CartShippingPage {
    readonly page: Page;
    readonly continueButton: Locator;
    readonly deliveryRadioButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.getByTestId('shipping-type-submit');
        this.deliveryRadioButton = page.getByTestId('shipping-type-ups_courier');
    }

    async selectDeliveryType() {
        await this.deliveryRadioButton.first().check();
    }

    async proceedToPayment() {
        await this.continueButton.click();
    }

}

