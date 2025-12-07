import { Page, expect, test} from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly usernameInput
    readonly passwordInput
    readonly loginButton
    readonly errorMessage

    constructor (page: Page) {
        this.page = page
        this.usernameInput = this.page.getByPlaceholder('Username')
        this.passwordInput = this.page.getByPlaceholder('Password')
        this.loginButton = this.page.locator("//button[@type='submit']")
        this.errorMessage = this.page.locator("//p[contains(@class,'alert')]");
    }

    async inputUsername(username: string) {
        await test.step(`Input username: [${username}]`, async () => {
            await this.usernameInput.fill(username);
        })
    }

    async inputPassword(password: string) {
        await test.step(`Input password: [${password}]`, async () => {
            await this.passwordInput.fill(password);
        })
    }

    async clickLoginButton() {
        await test.step(`Click on login button`, async () => {
            await this.loginButton.click();
        })
    }

    async loginWithUsernameAndPassword(username: string, password: string) {
        await this.inputUsername(username)
        await this.inputPassword(password)
        await this.clickLoginButton()
        await this.page.waitForLoadState('domcontentloaded')
    }

    async verifyErrorMessageContent(messageContent: string) {
        await test.step(`Verify error message is: [${messageContent}]`, async () => {
            expect(await this.errorMessage.textContent()).toBe(messageContent);
        })
    }

}