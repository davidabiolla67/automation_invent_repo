import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashBoardPage } from '../pages/DashBoardPage.js'; 

const authFile = 'playwright/.auth/user.json';
setup('authenticate user', async ({ page }) => {
   const loginPage = new LoginPage(page)
   const dashboardPage = new DashBoardPage(page)
 

   const credentials = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
   }
  

   if (!credentials.email || !credentials.password) {
    throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD is missing from .env.qa');
  }

  await loginPage.navigate()
  await loginPage.login(credentials)

  

  
   await expect(page).toHaveURL('/dashboard.html');
    
   await expect(dashboardPage.heading).toBeVisible();
   await expect(dashboardPage.searchInput).toBeVisible();
   await expect(dashboardPage.addProductButton).toBeVisible();
   await expect(dashboardPage.categoryFilter).toBeVisible();
   await expect(dashboardPage.logoutButton).toBeVisible();
   await page.context().storageState({
        path: authFile
    });


   } );