/*Scenario: 5: 
Login as locked_out_user to verify error message and then Login as performance_glitch_user to 
add a product item to the cart and logout from the application. 
Now, Login as a standard user now to complete the checkout workflow.

Scenario Description: User is logged in as “Locked_out_user” to validate the error message on the Login page. 
Now, Login as a performace_glitch_user and add a product item to the cart and logout of the application. 
Standard user is logged in and verifies the product item added by the 
performance glitch user earlier and completes the checkout workflow.

Test Steps:
1.	Login with Locked_Out_User
2.	Verify the error message” Sorry, this user has been locked out.”
3.	Login as performance_glitch_user
4.	User is on Products page. Verify title and URL
5.	Select an item from product list and add to cart and verify cart is updated to “1”
6.	Click the shopping cart
7.	User is on Your cart page and clicks on “checkout” button
8.	User is on Checkout: Your information page
9.	Fill in Firstname, Lastname and postal code and click continue button on Checkout: Your Information page
10.	User is on Checkout: Overview page
11.	Click on react burger menu button and click logout from Checkout: Overview page
12.	User is on Login page
13.	Login as Standard user
14.	Click on the shopping cart 
15.	Shopping cart should have one item in the bucket
16.	User is on Your cart page and clicks on “checkout” button
17.	Fill in firstname, last name and postal code and click continue
18.	User is on Checkout: overview page
19.	Click on “Finish button” on Checkout: Overview Page
20.	User is navigated to Checkout: Complete Page
21.	User Logout from the application from Checkout: Complete Page
22.	Verify whether user is on the login page 
*/

import test, { describe, step } from '../testFixtures/fixture'
import { expect } from '@playwright/test'
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

import {
	baseUrl,
	title,
	landingPageUrl,
	yourCartUrl,
	checkoutYourInformationUrl,
	checkoutOverviewUrl,
	checkoutCompleteUrl
} from '../config'

test.describe.parallel(
	'TC03: Verify Login with Locked out user',
	() => {
		test(`Test Case: 'Login to App as a Locked out user user' | Tags: @regression @TC03 `, async ({ loginPage }) => {
			await test.step(`Open the APP and check logo`, async () => {
				await loginPage.openApp()
				await loginPage.loginPageLogo()
				expect(await loginPage.getTitle()).toBe(title)
				expect(await loginPage.getUrl()).toContain(baseUrl)
			})

			await test.step(`Login as a problem user`, async () => {
				await loginPage.loginAsLockedOutUser()
			})

			await test.step(
				`Verify the error message on the login page for Locked_out_user`,
				async () => {
					await loginPage.verifyErrorMessage()
					await loginPage.VerifyLockedOutUserErrorMessage()
					expect(await loginPage.getUrl()).toContain(baseUrl)
				}
			)
		})
	}
)
