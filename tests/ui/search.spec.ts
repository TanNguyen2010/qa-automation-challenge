import { test, expect } from '@fixtures/BaseTest'
import * as fs from 'fs'
import * as path from 'path'
import { loginSuccessfully } from '@flows/login-flow'

const defaultTags = ['@AutoDemo', '@Gui', '@Search']
const sideBarAllMenu = ["Admin", "PIM", "Leave", "Time", "Recruitment", "My Info", "Performance", "Dashboard", "Directory", "Maintenance", "Claim", "Buzz"]

test.beforeEach(async ({ page, commonPage }) => {
    const username = process.env.validUsername as string
    const password = process.env.validPassword as string
    await loginSuccessfully(page, username, password);
    await commonPage.navigateToMenu("Admin")
});

const dataFilePath = path.resolve(process.cwd(), `test-data/common/search.json`)
const searchTestData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
for (const testCase of searchTestData) {
    const caseTags = Array.isArray(testCase.tag) ? testCase.tag : [testCase.tag];
    const tag = [...defaultTags, ...caseTags];
    test(`[${testCase.caseId}] ${testCase.caseName}`, { tag }, async ({ commonPage }) => {
        const expectMenu = testCase.expectedMenu
        await commonPage.searchByTextOnSideBar(testCase.data)
        await commonPage.verifyNumberOfMenuOnSideBar(expectMenu.length)
        await commonPage.verifySideMenuItemsDisplayed(expectMenu)
    })
}

const tag = [...defaultTags, '@Regression'];
test(`[Search_05] Verify search with empty value`, { tag }, async ({ page, commonPage }) => {
    await commonPage.sideBarInputSearchField.fill('')
    await commonPage.sideBarInputSearchField.press('Enter');
    await page.waitForLoadState('domcontentloaded')
    await commonPage.verifyNumberOfMenuOnSideBar(sideBarAllMenu.length)
    await commonPage.verifySideMenuItemsDisplayed(sideBarAllMenu)
})


test(`[Search_09] Verify search is reset after refreshing the page`, { tag }, async ({ page, commonPage }) => {
    const searchValue = sideBarAllMenu[0] as string
    await commonPage.searchByTextOnSideBar(searchValue)
    await page.waitForLoadState('domcontentloaded')

    await commonPage.verifyNumberOfMenuOnSideBar(1)

    await page.reload({ waitUntil: 'domcontentloaded' });
    await commonPage.sideBarMenuFirstItem.waitFor({ state: 'visible' });
    
    await commonPage.verifyNumberOfMenuOnSideBar(sideBarAllMenu.length)
    await commonPage.verifySideMenuItemsDisplayed(sideBarAllMenu)
    await expect(commonPage.sideBarInputSearchField).toHaveValue('');
})

test(`[Search_10] Verify search is reset after navigation`, { tag }, async ({ page, commonPage }) => {
    const searchValue = "Admin"

    await commonPage.searchByTextOnSideBar(searchValue)

    await commonPage.verifyNumberOfMenuOnSideBar(1)

    await commonPage.sideBarMenuList.first().click();
    await page.waitForLoadState('domcontentloaded')

    await expect(commonPage.sideBarInputSearchField).toHaveValue('');
    await commonPage.verifyNumberOfMenuOnSideBar(sideBarAllMenu.length)
    await commonPage.verifySideMenuItemsDisplayed(sideBarAllMenu)
})
