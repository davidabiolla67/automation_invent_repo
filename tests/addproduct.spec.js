import { test, expect } from '@playwright/test';
import { AddProductPage } from '../pages/AddProductPage.js';
import { DashBoardPage } from '../pages/DashBoardPage.js'; 

test('verify users can successfully add products', async ({ page }) => {
    const addProductPage = new AddProductPage(page);
    const dashboardPage = new DashBoardPage(page)


      const product = {
         name: 'Batman Mask',
         description: 'Superhero costume mask',
         price: '39.99',
         category: 'Clothing',
         stock: '6'
      };
  

    await dashboardPage.navigate();
    await dashboardPage.addProductButton.click()
    await addProductPage.addProduct(product);

    const productCard = page.locator('.product-card', {
    hasText: product.name});

    await expect(productCard).toBeVisible();
    await expect(productCard).toContainText(product.name);
    await expect(productCard).toContainText(product.description);
    await expect(productCard).toContainText(`$${product.price}`);
    await expect(productCard).toContainText(product.category);
    await expect(productCard).toContainText(`Stock: ${product.stock}`);
})

