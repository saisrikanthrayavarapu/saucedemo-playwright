import test from '../testFixtures/fixture'
import { expect } from '@playwright/test'
import fs from 'fs'

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

import {
	baseUrl,
	title,
	landingPageUrl,
	onesie,
	fleeceJacket,
	yourCartUrl,
	checkoutYourInformationUrl,
	checkoutOverviewUrl,
	checkoutCompleteUrl
} from '../config'

test.describe('Login as a standard user to complete the checkout workflow', () => {
	test(`Test Case: 'Login to App as a standard user, add product to cart and proceed to checkout' | Tags: @regression @TC02 @TC2_1`, async ({
		loginPage,
		productsPage,
		yourCartPage,
		checkoutYourInformationPage,
		checkoutOverviewPage,
		checkoutCompletePage
	}) => {
		await test.step(`verify landing page`, async () => {
			await loginPage.openApp()
			await loginPage.loginPageLogo()
			expect(await loginPage.getTitle()).toBe(title)
			expect(await loginPage.getUrl()).toContain(baseUrl)
		})

		await test.step(`Login as a Standard user`, async () => {
			await loginPage.loginAsStandardUser()
		})

		await test.step(`Verify landing page title`, async () => {
			await productsPage.verifyProductsPageTitleVisible()
			expect(await productsPage.getUrl()).toContain(landingPageUrl)
		})

		await test.step(
			`Select the product sort container option as “Price (high to low) and verify the list sorted order`,
			async () => {
				await productsPage.selectHighToLowFromDropDown()
				const firstItem = await productsPage.getFirstItemFromInventory()
				expect(firstItem).toContain(fleeceJacket)
				const lastItem = await productsPage.getLastItemFromInventory()
				expect(lastItem).toContain(onesie)
			}
		)

		await test.step(
			`Click on add to cart button to select the item Fleece Jacket and check the item count of shopping cart`,
			async () => {
				await productsPage.clickAddToCart()
				await productsPage.shoppingCartLink()
				await productsPage.shoppingCartCount()
			}
		)

		await test.step(
			`Click on shopping cart link and verify user is navigated to Your Cart page`,
			async () => {
				await productsPage.clickShoppingCartLink()
				expect(await yourCartPage.getTitle()).toBe(title)
				expect(await yourCartPage.getUrl()).toBe(yourCartUrl)
			}
		)

		await test.step(
			`Verify all the elements on the Your Cart page and click on Checkout button`,
			async () => {
				await yourCartPage.verifyLogoVisible()
				await yourCartPage.verifyBurgerMenuButtonVisible()
				await yourCartPage.shoppingCartLinkVisible()
				await yourCartPage.shoppingCartCount()
				await yourCartPage.titleVisible()
				await yourCartPage.quantityAndDescriptionLabelVisible()
				await yourCartPage.cartQuantityVisible()
				await yourCartPage.itemNameVisible()
				await yourCartPage.itemTextVisible()
				await yourCartPage.itemPriceVisible()
				await yourCartPage.continueShoppingBtnIsEnabled()
				await yourCartPage.removeBtnIsEnabled()
				await yourCartPage.checkoutBtnIsEnabled()
				await yourCartPage.VerifySocialandFooterLinks()
				await yourCartPage.clickCheckoutBtn()
			}
		)

		await test.step(
			`User is navigated to Checkout:Your Information page`,
			async () => {
				await checkoutYourInformationPage.titleVisible()
				expect(await checkoutYourInformationPage.getUrl()).toBe(
					checkoutYourInformationUrl
				)
			}
		)

		await test.step(
			`Verify all the elements on the Checkout:Your Information page`,
			async () => {
				await checkoutYourInformationPage.verifyLogoVisible()
				await checkoutYourInformationPage.titleVisible()
				await checkoutYourInformationPage.verifyBurgerMenuButtonVisible()
				await checkoutYourInformationPage.shoppingCartLinkVisible()
				await checkoutYourInformationPage.shoppingCartCount()
				await checkoutYourInformationPage.cancelBtnIsEnabled()
				await checkoutYourInformationPage.continueBtnIsEnabled()
				await checkoutYourInformationPage.VerifySocialandFooterLinks()
			}
		)

		await test.step(`Type in First name, Last name and Postal code`, async () => {
			await checkoutYourInformationPage.typeFirstName()
			await checkoutYourInformationPage.typeLastName()
			await checkoutYourInformationPage.typePostalCode()
		})

		await test.step(
			`Click on the Continue Button and check whether User is navigated to Checkout:Your Information page`,
			async () => {
				await checkoutYourInformationPage.titleVisible()
				await checkoutYourInformationPage.clickContinueBtn()
				expect(await checkoutYourInformationPage.getUrl()).toBe(
					checkoutOverviewUrl
				)
			}
		)

		await test.step(
			`Verify all the elements on the Checkout:Overview page`,
			async () => {
				await checkoutOverviewPage.verifyLogoVisible()
				await checkoutOverviewPage.verifyBurgerMenuButtonVisible()
				await checkoutOverviewPage.titleVisible()
				await checkoutOverviewPage.shoppingCartLinkVisible()
				await checkoutOverviewPage.shoppingCartCount()
				await checkoutOverviewPage.quantityAndDescriptionLabelVisible()
				await checkoutOverviewPage.cartQuantityVisible()
				await checkoutOverviewPage.itemNameVisible()
				await checkoutOverviewPage.itemTextVisible()
				await checkoutOverviewPage.itemPriceVisible()
				await checkoutOverviewPage.secureCardInfoVisible()
				await checkoutOverviewPage.shippingInformationLabelVisible()
				await checkoutOverviewPage.deliveryMessageVisible()
				await checkoutOverviewPage.itemTotalLabelVisible()
				await checkoutOverviewPage.itemTaxLabelVisible()
				await checkoutOverviewPage.summaryTotalLabelVisible()
				await checkoutOverviewPage.cancelBtnIsEnabled()
				await checkoutOverviewPage.finishBtnIsEnabled()
				await checkoutOverviewPage.VerifySocialandFooterLinks()
			}
		)

		await test.step(
			`Click on the Finish Button and check whether User is navigated to Checkout:Complete page`,
			async () => {
				await checkoutOverviewPage.titleVisible()
				await checkoutOverviewPage.clickFinishBtn()
				expect(await checkoutOverviewPage.getUrl()).toBe(checkoutCompleteUrl)
			}
		)

		await test.step(
			`Verify all the elements on the Checkout:Complete page`,
			async () => {
				await checkoutCompletePage.verifyLogoVisible()
				await checkoutCompletePage.verifyBurgerMenuButtonVisible()
				await checkoutCompletePage.shoppingCartLinkVisible()
				await checkoutCompletePage.shoppingCartCount()
				await checkoutCompletePage.titleVisible()
				await checkoutCompletePage.completeHeaderVisible()
				await checkoutCompletePage.completeTextVisible()
				await checkoutCompletePage.ponyExpressImageVisible()
				await checkoutCompletePage.backHomeButtonISEnabled()
				await checkoutCompletePage.VerifySocialandFooterLinks()
			}
		)

		await test.step(
			`Click on the Back Home Button on Checkout:Complete page and check whether User is navigated back to Products page`,
			async () => {
				await checkoutCompletePage.titleVisible()
				await checkoutCompletePage.clickBackHomeButton()
				expect(await checkoutCompletePage.getUrl()).toBe(landingPageUrl)
			}
		)

		await test.step(
			`Standard user logout from the application and verify the login page`,
			async () => {
				await productsPage.burgerButtonVisible()
				await productsPage.burgerButtonClick()
				await productsPage.clickLogoutSideBarLink()
				await loginPage.loginPageLogo()
				await loginPage.usernameFieldVisible()
				await loginPage.passwordFieldVisible()
				await loginPage.loginButtonIsEnabled()
				await loginPage.loginCredentialsVisible()
				await loginPage.passwordCredentialsVisible()
				expect(await loginPage.getTitle()).toBe(title)
				expect(await loginPage.getUrl()).toContain(baseUrl)
			}
		)
	})

	test(`Test Case: 'Login to App as a standard user, add product to cart and proceed to checkout and verify error messages in the checkout page' | Tags: @regression @TC02 @TC2_2`, async ({
		loginPage,
		productsPage,
		yourCartPage,
		checkoutYourInformationPage,
		checkoutOverviewPage,
		checkoutCompletePage
	}) => {
		await test.step(`verify landing page`, async () => {
			await loginPage.openApp()
			await loginPage.loginPageLogo()
			expect(await loginPage.getTitle()).toBe(title)
			expect(await loginPage.getUrl()).toContain(baseUrl)
		})

		await test.step(`Login as a Standard user`, async () => {
			await loginPage.loginAsStandardUser()
		})

		await test.step(`Verify landing page title`, async () => {
			await productsPage.verifyProductsPageTitleVisible()
			expect(await productsPage.getUrl()).toContain(landingPageUrl)
		})

		await test.step(
			`Select the product sort container option as “Price (high to low) and verify the list sorted order`,
			async () => {
				await productsPage.selectHighToLowFromDropDown()
				const firstItem = await productsPage.getFirstItemFromInventory()
				expect(firstItem).toContain(fleeceJacket)
				const lastItem = await productsPage.getLastItemFromInventory()
				expect(lastItem).toContain(onesie)
			}
		)

		await test.step(
			`Click on add to cart button to select the item Fleece Jacket and check the item count of shopping cart`,
			async () => {
				await productsPage.clickAddToCart()
				await productsPage.shoppingCartLink()
				await productsPage.shoppingCartCount()
			}
		)

		await test.step(
			`Click on shopping cart link and verify user is navigated to Your Cart page`,
			async () => {
				await productsPage.clickShoppingCartLink()
				expect(await yourCartPage.getTitle()).toBe(title)
				expect(await yourCartPage.getUrl()).toBe(yourCartUrl)
			}
		)

		await test.step(
			`Verify all the elements on the Your Cart page and click on Checkout button`,
			async () => {
				await yourCartPage.verifyLogoVisible()
				await yourCartPage.verifyBurgerMenuButtonVisible()
				await yourCartPage.shoppingCartLinkVisible()
				await yourCartPage.shoppingCartCount()
				await yourCartPage.titleVisible()
				await yourCartPage.quantityAndDescriptionLabelVisible()
				await yourCartPage.cartQuantityVisible()
				await yourCartPage.itemNameVisible()
				await yourCartPage.itemTextVisible()
				await yourCartPage.itemPriceVisible()
				await yourCartPage.continueShoppingBtnIsEnabled()
				await yourCartPage.removeBtnIsEnabled()
				await yourCartPage.checkoutBtnIsEnabled()
				await yourCartPage.VerifySocialandFooterLinks()
				await yourCartPage.clickCheckoutBtn()
			}
		)

		await test.step(
			`User is navigated to Checkout:Your Information page`,
			async () => {
				await checkoutYourInformationPage.titleVisible()
				expect(await checkoutYourInformationPage.getUrl()).toBe(
					checkoutYourInformationUrl
				)
			}
		)

		await test.step(
			`Verify all the elements on the Checkout:Your Information page`,
			async () => {
				await checkoutYourInformationPage.verifyLogoVisible()
				await checkoutYourInformationPage.titleVisible()
				await checkoutYourInformationPage.verifyBurgerMenuButtonVisible()
				await checkoutYourInformationPage.shoppingCartLinkVisible()
				await checkoutYourInformationPage.shoppingCartCount()
				await checkoutYourInformationPage.cancelBtnIsEnabled()
				await checkoutYourInformationPage.continueBtnIsEnabled()
				await checkoutYourInformationPage.VerifySocialandFooterLinks()
			}
		)

		await test.step(
			`User clicks on continue button and validates the error message for firstname`,
			async () => {
				await checkoutYourInformationPage.clickContinueBtn()
				await checkoutYourInformationPage.verifyErrorMessage()
				await checkoutYourInformationPage.VerifyTextFirstNameOfErrorMessage()
			}
		)

		await test.step(
			`User types in the firstname and click continue to validate error message for lastname`,
			async () => {
				await checkoutYourInformationPage.typeFirstName()
				await checkoutYourInformationPage.clickContinueBtn()
				await checkoutYourInformationPage.verifyErrorMessage()
				await checkoutYourInformationPage.VerifyTextLastNameOfErrorMessage()
			}
		)

		await test.step(
			`User types in the firstname and lastname and click continue to validate error message for Postalcode`,
			async () => {
				await checkoutYourInformationPage.typeFirstName()
				await checkoutYourInformationPage.typeLastName()
				await checkoutYourInformationPage.clickContinueBtn()
				await checkoutYourInformationPage.verifyErrorMessage()
				await checkoutYourInformationPage.VerifyTextPostalCodeOfErrorMessage()
			}
		)

		await test.step(
			`Click
			 on Logout button and logs out of the application and navigates to login page`,
			async () => {
				await productsPage.burgerButtonClick()
				await productsPage.logoutSideBarLink()
				await productsPage.clickLogoutSideBarLink()
				expect(await loginPage.getTitle()).toBe(title)
				expect(await loginPage.getUrl()).toContain(baseUrl)
			}
		)
	})
})
