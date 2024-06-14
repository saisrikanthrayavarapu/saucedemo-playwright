import test from '../testFixtures/fixture'
import { expect } from '@playwright/test'
import fs from 'fs'
import { username, password, loginButton } from '../pageobjects/loginPage'
const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

import { baseUrl, title, onesie, fleeceJacket } from '../config'

test.describe(
	'TC01: Verify application validation through Login screen',
	() => {
		test(`Test Case: 'Login to App as a standard user and verify details populated in each screen' | Tags: @smoke @TC1_1 @TC01`, async ({
			loginPage,
			productsPage
		}) => {
			await test.step(`Open the APP and check logo`, async () => {
				await loginPage.openApp()
				await loginPage.loginPageLogo()
				expect(await loginPage.getTitle()).toBe(title)
				expect(await loginPage.getUrl()).toContain(baseUrl)
			})

			await test.step(
				`Verify username and password fields are visible on login page`,
				async () => {
					await loginPage.usernameFieldVisible()
					await loginPage.passwordFieldVisible()
				}
			)

			await test.step(
				`Verify Login button is enabled and bot image is visible`,
				async () => {
					await loginPage.loginButtonIsEnabled()
				}
			)

			await test.step(
				`Verify Login and password credentials are visible at the bottom of login page`,
				async () => {
					await loginPage.loginCredentialsVisible()
					await loginPage.passwordCredentialsVisible()
				}
			)

			await test.step(`Login as a Standard user`, async () => {
				await loginPage.loginAsStandardUser()
			})

			await test.step(
				`Verify the products page shopping cart icon and product sort container visible `,
				async () => {
					await productsPage.shoppingCartLink()
					await productsPage.productSortContainerVisible()
				}
			)

			await test.step(
				`Verify the products page sidebar links visible and click on About link to check user is navigated to saucelabs page`,
				async () => {
					await productsPage.burgerButtonVisible()
					await productsPage.burgerButtonClick()
					await productsPage.allItemsSideBarLink()
					await productsPage.logoutSideBarLink()
					await productsPage.resetSideBarLink()
					await productsPage.burgerCrossButtonVisible()
					await productsPage.burgerCrossButtonClick()
				}
			)

			await test.step(
				`Verify Inventory container and the inventory list is visible`,
				async () => {
					await productsPage.inventoryContainerVisible()
					await productsPage.backPackItem()
					await productsPage.boltTshirtItem()
					await productsPage.onesieItem()
					await productsPage.bikeLightItem()
					await productsPage.fleeceJacketItem()
					await productsPage.tshirtRedItem()
				}
			)

			await test.step(
				`Select the product sort container option as “Price (low to high) and verify the list sorted order`,
				async () => {
					await productsPage.selectLowToHighFromDropDown()
					const firstItem = await productsPage.getFirstItemFromInventory()
					expect(firstItem).toContain(onesie)
					const lastItem = await productsPage.getLastItemFromInventory()
					expect(lastItem).toContain(fleeceJacket)
				}
			)

			await test.step(
				`Verify the footer text+swag bot footer+social channel links are visible`,
				async () => {
					await productsPage.footerTextVisible()
					await productsPage.socialChannelLinksVisible()
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

		test(`Test Case: 'Login to App using invalid credentials and verify error message' | Tags: @regression @TC1_2 @TC01`, async ({
			loginPage
		}) => {
			await test.step(`Open the APP and check logo`, async () => {
				await loginPage.openApp()
				await loginPage.loginPageLogo()
				expect(await loginPage.getTitle()).toBe(title)
				expect(await loginPage.getUrl()).toContain(baseUrl)
			})

			await test.step(`Login as a invalid user`, async () => {
				await loginPage.loginAsInvalidUser()
			})

			await test.step(
				`Verify the error message on the login page`,
				async () => {
					await loginPage.VerifyInvalidUserErrorMessage()
				}
			)
		})
	}
)
