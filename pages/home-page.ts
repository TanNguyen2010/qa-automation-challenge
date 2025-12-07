import { Page, expect, test } from "@playwright/test";

export class HomePage {
    readonly page: Page
    readonly dashboardHeader
    constructor(page: Page) {
        this.page = page
        this.dashboardHeader = this.page.locator("//h6[contains(@class,'header')]");
    }

    async verifyHomePageHeaderIsDisplayed() {
        await test.step(`Verify home header is displayed`, async () => {
            await expect(this.dashboardHeader).toBeVisible()
        })
    }

}