# QA Automation Challenge

## How to setup

- git clone https://github.com/TanNguyen2010/qa-automation-challenge.git
- install nodejs 22.18.0
- npm install : install all required dependencies
- npx playwright install : install playwright browsers

## Modular Structure

- **/config**: Environment configuration files for different test environments (dev, prod, uat).
- **/fixtures**: Base test classes, hooks, and reusable setup logic.
- **/flows**: Business flows combining multiple pages/actions (e.g., login flow).
- **/pages**: Page Object Model (POM) files representing UI pages.
- **/test-data**: Input and expected data used by tests across environments.
- **/tests**: Main test suites (UI, API, performance).
- **/utils**: Helper functions and shared utilities.

## How to use
- Add files '.env.dev', '.env.uat', '.env.prod' based on the template from file 'env.template'. Note*: Since this is a demo project, I have already uploaded these files to GitHub, so you don’t need to perform this step. However, in a real project, environment files should not be added to Git.
- Use the comments from the "How to run" section to execute.

## How to run
```
- Run all test case
npx playwright test
- Run Regression on dev environment with Edge
npm run test:devRegression
- Run Regression on uat environment with Chrome
npm run test:uatRegression
- Run Smoke on dev environment with Edge
npm run test:devSmoke
- Run Smoke on uat environment with Chrome
npm run test:uatSmoke
- Run Smoke on prod environment with Safari
npm run test:prodSmoke
```

## Viewing Reports
```
npx playwright show-report
```
