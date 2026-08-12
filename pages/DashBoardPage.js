export class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', {
            name: 'Product Inventory'
        });
        this.searchInput = page.getByTestId('search-input');
        this.addProductButton = page.getByTestId('add-product-button');
        this.categoryFilter = page.getByTestId('category-filter');
        this.logoutButton = page.getByTestId('logout-button');
    }

     async navigate() {
        await this.page.goto('/dashboard.html');
    }
}
