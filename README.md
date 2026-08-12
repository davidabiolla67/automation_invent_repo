# Product Inventory Playwright Automation

This project contains Playwright automated tests and exploratory testing findings for the Product Inventory QA application.


## Prerequisites

Before running the project, install:

- Node.js 20 or later
- npm
- Git

## Project setup

1. Clone the repository:

   ```powershell
   git clone https://github.com/davidabiolla67/product-inventory-playwright-automation.git

2. Open the project folder:

   ```powershell
   cd product-inventory-playwright-automation
   ```

3. Install the dependencies:

   ```powershell
   npm ci
   ```

4. Install the Playwright browsers:

   ```powershell
   npx playwright install
   ```

5. Create the local QA environment file:

   ```powershell
   copy .env.example .env.qa
   ```

6. Open `.env.qa` and replace the password placeholder with the password supplied in the assessment instructions.

## Running the tests

Run the complete Playwright test suite:

```powershell
npx playwright test
```

## Viewing the test report

The HTML report is generated automatically after test execution.

Open the latest report with:

```powershell
npx playwright show-report
```

Failed tests include screenshots automatically in the HTML report and the `test-results` folder.

## Automated test scope

The automation covers the two flows required by the assessment:

1. **Login Navigation**
   - Log in using valid administrator credentials.
   - Verify navigation to the dashboard.
   - Verify that important dashboard controls are visible.

2. **Option C — Add Product**
   - Create a new product.
   - Verify that the product appears in the inventory.
   - Verify its name, description, price, category and stock.

## Automation structure

The project uses the Page Object Model to separate page interactions and selectors from the test scenarios.

| Path | Purpose |
| --- | --- |
| `pages/LoginPage.js` | Contains the login-page locators and actions. |
| `pages/AddProductPage.js` | Contains the Add Product locators and actions. |
| `pages/DashBoardPage.js` | Contains shared dashboard locators and actions used by the Login test, Add Product test and authentication setup, reducing duplication and making future maintenance easier. |
| `tests/login.spec.js` | Tests valid login and verifies that the dashboard and its key controls are displayed. |
| `tests/addproduct.spec.js` | Creates a product and verifies its name, description, price, category and stock in the inventory. |
| `auth/auth.setup.js` | Authenticates the user and saves the browser authentication state for tests that require login. |
| `playwright.config.js` | Defines the base URL, browser projects, authentication dependency, reporting and failure artifacts. |
| `.env.example` | Provides a template for the required environment variables. |
| `BUG_REPORT.md` | Contains the exploratory testing findings, reproduction steps, severity, impact and expected results. |
| `evidence/` | Contains the screenshot evidence referenced by each documented defect. |

Stable `data-testid` selectors are used for user interactions where available. Assertions use visible UI content and scoped product-card locators to verify the application state.

Shared dashboard elements are centralized in `DashBoardPage.js`. If a dashboard selector changes, it only needs to be updated in one location.

## Assumptions and trade-offs

- Automation was intentionally limited to the two flows requested in the assignment: Login Navigation and Option C — Add Product.
- Playwright authentication state is created during setup and reused by the Add Product test. The login test explicitly starts without saved authentication so that it tests the complete login flow.
- The tests run against Chromium, Firefox and WebKit to provide basic cross-browser coverage.
- The application URL, administrator email and password are read from a local `.env.qa` file. This file is excluded from Git to prevent credentials from being published. The committed `.env.example` file shows assessors which environment variables they must provide before running the tests.
- The automated suite focuses on the expected successful flows requested by the assessment. Defects discovered during exploratory testing are documented in `BUG_REPORT.md`.
 
## Additional exploratory observations

The following issues were also observed during exploratory testing but were not expanded into full bug reports because the assessment was time-boxed and higher-impact defects were prioritized:

| Observation | Severity |
| --- | --- |
| Product search is case-sensitive; for example, `mouse` returns a result while `MOUSE` does not. | Medium |
| No “No products found” message is displayed when a search returns no results. | Medium |
| Required product fields are not enforced, allowing incomplete or blank products to be submitted. | High |
| Search and category results depend on the order in which the filters are applied. Changing the category can ignore an active search term. | Medium |
| Opening the Add Product modal does not move keyboard focus into the modal. | Medium |
| The modal close (`×`) control is not keyboard-accessible. | Medium |
 

 