import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { HomePage } from '../pages/home-page'
import { CommonPage } from '../pages/common-page'

type Fixtures = {
  loginPage: LoginPage
  homePage: HomePage
  commonPage: CommonPage
};

const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page))
  },
});

export { test }
export * from '@playwright/test'