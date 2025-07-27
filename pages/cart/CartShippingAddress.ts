import { expect, type Locator, type Page } from '@playwright/test';

export class CartShippingAddress {
    readonly page: Page;
    readonly country: Locator;
    readonly city: Locator;
    readonly address: Locator;
    readonly postCode: Locator;
    readonly name: Locator;
    readonly surname: Locator;
    readonly email: Locator;
    readonly emailRepeat: Locator;
    readonly phone: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.country = page.getByTestId('shipping-country');
        this.city = page.getByTestId('shipping-city');
        this.address = page.getByTestId('address-autocomplete-field');
        this.postCode = page.getByTestId('shipping-postcode');
        this.name = page.getByTestId('shipping-first-name');
        this.surname = page.getByTestId('shipping-last-name');
        this.email = page.getByTestId('shipping-email');
        this.emailRepeat = page.getByTestId('shipping-email-repeat');
        this.phone = page.getByTestId('shipping-phone');
        this.continueButton = page.getByTestId('shipping-address-submit-button');
    }

    async addCountry(countryCode: string) {
        await this.country.selectOption({ value: countryCode });
    }

    async addCity(city: string) {
        await this.city.fill(city);
    }

    async addAddress(address: string) {
        await this.address.fill(address);
    }

    async addPostCode(postCode: string) {
        await this.postCode.fill(postCode);
    }

    async addName(name: string) {
        await this.name.fill(name);
    }

    async addSurname(surname: string) {
        await this.surname.fill(surname);
    }

    async addEmail(email: string) {
        await this.email.fill(email);
    }

    async addEmailRepeat(email: string) {
        await this.emailRepeat.fill(email);
    }

    async addPhone(phone: string) {
        await this.phone.fill(phone);
    } s

    async proceedToDeliveryPage() {
        await this.continueButton.click();
    }

    async fillAddressDeliveryForm(country: string, city: string, address: string, postCode: string) {
        await this.addCountry(country);
        await this.addCity(city);
        await this.addAddress(address);
        await this.addPostCode(postCode);
    }

    async fillBuyerDetailsForm(name: string, surname: string, email: string, phone: string) {
        await this.addName(name);
        await this.addSurname(surname);
        await this.addEmail(email);
        await this.addEmailRepeat(email);
        await this.addPhone(phone);
    }

}

