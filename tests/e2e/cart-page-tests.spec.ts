import { test, expect, type Page, BrowserContext } from '@playwright/test';
import * as Pages from '../../pages';
import * as Components from '../../components';

test.describe('Perform purchase up to Confirmation', () => {

  let context: BrowserContext;
  let page: Page;

  //pages
  let engineCategoryPage: Pages.EngineCategoryPage;
  let cartPage: Pages.CartPage;
  let cartLoginPage: Pages.CartLoginPage;
  let cartShippingAddressPage: Pages.CartShippingAddress;
  let cartShippingPage: Pages.CartShippingPage;
  let cartPaymentPage: Pages.CartPaymentPage;
  let cartConfirmationPage: Pages.CartConfirmationPage

  //components
  let cookieBanner: Components.CookieBanner;
  let addedToCartModal: Components.AddedToCartModal;
  let pageheader: Components.PageHeader;

  test.beforeAll(async () => {

    const { chromium } = require("playwright-extra");
    const stealthPlugin = require("puppeteer-extra-plugin-stealth")();
    chromium.use(stealthPlugin);

    const browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();

    cookieBanner = new Components.CookieBanner(page);
    await cookieBanner.acceptCookies();

    //pages
    engineCategoryPage = new Pages.EngineCategoryPage(page);
    cartPage = new Pages.CartPage(page);
    cartLoginPage = new Pages.CartLoginPage(page);
    cartShippingAddressPage = new Pages.CartShippingAddress(page);
    cartShippingPage = new Pages.CartShippingPage(page);
    cartPaymentPage = new Pages.CartPaymentPage(page);
    cartConfirmationPage = new Pages.CartConfirmationPage(page);

    //components
    addedToCartModal = new Components.AddedToCartModal(page);
    pageheader = new Components.PageHeader(page);

  });

  test.afterAll(async () => {
    await context.close();
  });

  test('should add engine part to cart', async () => {
    await engineCategoryPage.goto();
    await engineCategoryPage.addToCartFirstProductAvailable();
    await expect(addedToCartModal.mainContainer).toBeVisible();
  })

  test('should init purchase from popup: unregistered', async () => {
    await cartPage.goto();
    await cartPage.proceedToLogin();
    await cartLoginPage.buyAsGuest();
    await cartShippingAddressPage.fillAddressDeliveryForm("LT", "Vilnius", "Gedimino prospektas", "12345");
    await cartShippingAddressPage.fillBuyerDetailsForm("Testas", "Testauskas", "test@test.lt", "+37066666666")
    await cartShippingAddressPage.proceedToDeliveryPage();
    await cartShippingPage.selectDeliveryType();
    await cartShippingPage.proceedToPayment();
    await cartPaymentPage.chooseFirstBankAvailable();
    await cartPaymentPage.proceedToConfirmation();
    await expect(cartConfirmationPage.mainContainer).toBeVisible();

  })

  test('should empty cart', async ({ }) => {
    await cartPage.goto();
    await pageheader.clickCartButton();
    await cartPage.removeCartItem();
    await expect(cartPage.emptyCartContainer).toBeVisible();
  })
})
