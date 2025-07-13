import { driver } from "@wdio/globals";

class CartPage {
    get cartScreenTitle() { return $('android=new UiSelector().textContains("YOUR CART")'); }
    async addedItemNameInCart(i) { return $(`(//android.view.ViewGroup[@content-desc="test-Description"])[${i}]/android.widget.TextView[1]`); }
    async addedItemPriceInCart(i) { return $(`(//android.view.ViewGroup[@content-desc="test-Price"])[${i}]/android.widget.TextView`); }
    get scrollTillCheckoutBtn() { return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("test-CHECKOUT"))'); }
    get checkoutBtn() { return $('//android.view.ViewGroup[@content-desc="test-CHECKOUT"]'); }

    async validateCartScreenTitle() {
        try {
            await this.cartScreenTitle.waitForDisplayed({ timeout: 10000 });
            return await this.cartScreenTitle.getText();
        } catch (error) {
            console.error('Failed to validate cart screen title:', error);
            throw error;
        }
    }

    async validateFirstTwoItemsAreAddedToCart() {
        const addedItemsNames = [];
        const addedItemsPrices = [];
        try {
            for (let i = 1; i <= 2; i++) {
                const itemElement = await this.addedItemNameInCart(i);
                const name = await itemElement.getText();
                addedItemsNames.push(name);
                const priceElement = await this.addedItemPriceInCart(i);
                const price = await priceElement.getText();
                addedItemsPrices.push(price);
            }
            return [addedItemsNames, addedItemsPrices];
        } catch (error) {
            console.error('Failed to validate items in cart:', error);
            throw error;
        }
    }

    async proceedToCheckout() {
        try {
            await this.scrollTillCheckoutBtn.waitForDisplayed({ timeout: 10000 });
            await this.checkoutBtn.waitForDisplayed({ timeout: 10000 });
            await this.checkoutBtn.click();
        } catch (error) {
            console.error('Failed to proceed to checkout:', error);
            throw error;
        }
    }
}

export default new CartPage();