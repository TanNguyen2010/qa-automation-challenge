import { test, expect } from '@fixtures/BaseTest'
import * as fs from 'fs'
import * as path from 'path'

const defaultTags = ['@AutoDemo', '@Gui', '@Login']

const successDataFilePath = path.resolve(process.cwd(), `test-data/${process.env.runningEnv}/loginSuccess.json`)
const successTestData = JSON.parse(fs.readFileSync(successDataFilePath, 'utf-8'));
for (const testCase of successTestData) {
    const caseTags = Array.isArray(testCase.tag) ? testCase.tag : [testCase.tag];
    const tag = [...defaultTags, ...caseTags];
    test(`[${testCase.caseId}] ${testCase.caseName}`, { tag }, async ({ loginPage, commonPage, homePage }) => {
        await commonPage.accessToUrl()
        await loginPage.loginWithUsernameAndPassword(testCase.username, testCase.password)
        await homePage.verifyHomePageHeaderIsDisplayed()
    })
}

const unsuccessTestDataFilePath = path.resolve(process.cwd(), `test-data/common/loginUnsuccess.json`)
const unsuccessTestData = JSON.parse(fs.readFileSync(unsuccessTestDataFilePath, 'utf-8'));
for (const testCase of unsuccessTestData) {
    const caseTags = Array.isArray(testCase.tag) ? testCase.tag : [testCase.tag];
    const tag = [...defaultTags, ...caseTags];
    test(`[${testCase.caseId}] ${testCase.caseName}`, { tag }, async ({ loginPage, commonPage }) => {
        await commonPage.accessToUrl()
        await loginPage.loginWithUsernameAndPassword(testCase.username, testCase.password)
        await loginPage.verifyErrorMessageContent(testCase.expectedError)
    })
}

