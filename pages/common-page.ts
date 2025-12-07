import { expect, Page, test } from '@playwright/test'

export class CommonPage {

    private readonly page: Page
    readonly sideBarInputSearchField
    readonly sideBarMenuList
    readonly sideBarMenuFirstItem

    constructor(page: Page) {
        this.page = page
        this.sideBarInputSearchField = page.getByPlaceholder('Search');
        this.sideBarMenuList = page.locator("//li[@class='oxd-main-menu-item-wrapper']");
        this.sideBarMenuFirstItem = page.locator("//li[@class='oxd-main-menu-item-wrapper'][1]");
    }

    async accessToUrl(url?: string) {
        const urlValue = url? url : process.env.baseUrl
        await test.step(`Access to url: [${urlValue}]`, async () => {
            if(url) {
                await this.page.goto(url)
            } else {
                await this.page.goto('/')
            }
            await this.page.waitForLoadState('domcontentloaded')
        })
    }

    async navigateToMenu(menu: string) {
        await test.step(`Navigate to menu: [${menu}]`, async () => {
            const menuLocator = this.page.getByText(menu)
            await menuLocator.click()
            await this.page.waitForLoadState('domcontentloaded')
        })
    }

    async searchByTextOnSideBar(keyword: string) {
        await test.step(`Search by text: [${keyword}]`, async () => {
            await this.sideBarInputSearchField.fill(keyword);
            await this.page.waitForLoadState('domcontentloaded')
        })
    }

    async verifyNumberOfMenuOnSideBar(number: number) {
        await test.step(`Verify number of menu on side bar is [${number}]`, async () => {
            const numberMenu = await this.sideBarMenuList.count();
            expect.soft(numberMenu).toBe(number);
        })
    }

    async verifySideMenuItemsDisplayed(items: string[]) {
        for (const item of items) {
            await test.step(`Verify menu [${item}] is displyed on side bar`, async () => {
                const menuLocator = this.page.locator("//li[contains(@class,'main-menu-item')]").getByText(item, { exact: true });
                await expect.soft(menuLocator).toBeVisible();
            })
        }
    }
}
