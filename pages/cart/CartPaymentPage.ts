import { expect, type Locator, type Page } from '@playwright/test';

export class CartPaymentPage {
    readonly page: Page;
    readonly paymentRadioButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentRadioButton = page.getByTestId('payment-bank-wallet');
        this.continueButton = page.getByTestId('payment-submit-button');
    }

    async chooseFirstBankAvailable() {
        await this.paymentRadioButton.first().click();
    }

    async proceedToConfirmation() {
        await this.continueButton.click();
    }

}

