export class AddProductPage {
    constructor(page) {
        this.page = page;
        this.addProductButton = page.getByTestId('add-product-button');
        this.productNameInput = page.getByTestId('product-name');
        this.productDescriptionInput = page.getByTestId('product-description');
        this.productPriceInput = page.getByTestId('product-price');
        this.productCategorySelect = page.getByTestId('product-category');
        this.productStockInput = page.getByTestId('product-stock');
        this.saveProductButton = page.getByTestId('save-product-button');
    }

    async addProduct(product) {
        await this.productNameInput.fill(product.name);
        await this.productDescriptionInput.fill(product.description);
        await this.productPriceInput.fill(product.price);
        await this.productCategorySelect.selectOption({
            label: product.category
        });
        await this.productStockInput.fill(product.stock);
        await this.saveProductButton.click();
    }

}