import { driver } from "@wdio/globals";

class ProductsPage {
    get addToCartButton() { return $('android=new UiSelector().description("test-ADD TO CART").instance(0)'); }
    get secondAddToCartButton() { return $('~test-ADD TO CART'); }
    get itemNameList() { return $$('(//android.widget.TextView[@content-desc="test-Item title"])'); }
    get itemPriceList() { return $$('(//android.widget.TextView[@content-desc="test-Price"])'); }
    get cartButton() { return $('//android.view.ViewGroup[@content-desc="test-Cart"]/android.view.ViewGroup/android.widget.ImageView'); }

    async addItemToCart() {
        try {
            await this.addToCartButton.waitForDisplayed({ timeout: 10000 });
            await this.addToCartButton.click();
            console.log('"Add to Cart" button clicked');
        } catch (error) {
            console.error('Failed to click "Add to Cart" button:', error);
            throw error;
        }
    }

    async addFirstTwoItemsToCartAndGetItemDetails() {
        try {
            await this.addToCartButton.waitForDisplayed({ timeout: 10000 });
            await this.addToCartButton.click();
            await this.secondAddToCartButton.waitForDisplayed({ timeout: 35000 });
            await this.secondAddToCartButton.click();

            const items = await this.itemNameList;
            const itemsNamesAddedToCart = [];
            for (let i = 0; i < 2 && i < items.length; i++) {
                itemsNamesAddedToCart.push(await items[i].getText());
            }
            const prices = await this.itemPriceList;
            const itemsPriceAddedToCart = [];
            for (let i = 0; i < 2 && i < prices.length; i++) {
                itemsPriceAddedToCart.push(await prices[i].getText());
            }
            return [itemsNamesAddedToCart, itemsPriceAddedToCart];
        } catch (error) {
            console.error('Failed to add items to cart or get details:', error);
            throw error;
        }
    }

    async navigateToCart() {
        try {
            console.log('Waiting for cart button to be displayed...');
            await this.cartButton.waitForDisplayed({ timeout: 95000 });
            console.log('Cart button found, clicking...');
            await this.cartButton.click();
        } catch (error) {
            console.error('Failed to navigate to cart page:', error);
            throw error;
        }
    }
}

export default new ProductsPage();