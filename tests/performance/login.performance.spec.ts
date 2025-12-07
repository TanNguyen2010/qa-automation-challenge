import { test, expect } from '@fixtures/BaseTest'

const tag = ['@AutoDemo', '@Gui', '@Performance', '@Regression']
test('Verify login flow loads quickly', { tag }, async ({ page, commonPage, loginPage }) => {
    const username = process.env.validUsername as string
    const password = process.env.validPassword as string
    const expectAccessTime = 6000
    const expectLoginTime = 3000

    // Access to login page
    const accessStartTime = Date.now();
    await commonPage.accessToUrl()
    const accessEndTime = Date.now();

    // Input login data
    await loginPage.inputUsername(username)
    await loginPage.inputPassword(password)

    // Login
    const loginStartTime = Date.now();
    await loginPage.clickLoginButton()
    await page.waitForLoadState('domcontentloaded')
    const loginEndTime = Date.now();

    await test.step(`Verify login page loads less than [${expectAccessTime}] ms`, async () => {
        expect.soft(accessEndTime - accessStartTime).toBeLessThan(expectAccessTime)
    })

    await test.step(`Verify login page loads less than [${expectLoginTime}] ms`, async () => {
        expect.soft(loginEndTime - loginStartTime).toBeLessThan(expectLoginTime)
    })
    
});
