import { CommonPage } from '@pages/common-page'
import { LoginPage } from '@pages/login-page'
import { HomePage } from '@pages/home-page'
import { Page } from '@playwright/test';

export async function loginSuccessfully(page: Page, username: string, password: string) {
    const commonPage = new CommonPage(page)
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    await commonPage.accessToUrl()
    await loginPage.loginWithUsernameAndPassword(username, password)
    await homePage.verifyHomePageHeaderIsDisplayed()
}