import { driver } from "@wdio/globals";

class CheckoutPage {
    get firstNameField() { return $('//android.widget.EditText[@content-desc="test-First Name"]'); }
    get lastNameField() { return $('//android.widget.EditText[@content-desc="test-Last Name"]'); }
    get zipCodeField() { return $('//android.widget.EditText[@content-desc="test-Zip/Postal Code"]'); }
    get continueBtn() { return $('//android.view.ViewGroup[@content-desc="test-CONTINUE"]'); }
    get checkoutOverviewTitle() { return $('android=new UiSelector().textContains("CHECKOUT: OVERVIEW")'); }
    async addedItemNameInCheckout(i) { return $(`(//android.view.ViewGroup[@content-desc="test-Description"])[${i}]/android.widget.TextView[1]`); }
    async addedItemPriceInCheckout(i) { return $(`(//android.view.ViewGroup[@content-desc="test-Price"])[${i}]/android.widget.TextView`); }

    async fillCheckoutInformation() {
        try {
            await this.firstNameField.waitForDisplayed({ timeout: 10000 });
            await this.firstNameField.setValue('Test First Name');
            await this.lastNameField.setValue('Test Last Name');
            await this.zipCodeField.setValue('123456');
        } catch (error) {
            console.error('Failed to fill checkout information:', error);
            throw error;
        }
    }

    async proceedToOverview() {
        try {
            await this.continueBtn.waitForDisplayed({ timeout: 10000 });
            await this.continueBtn.click();
            await this.checkoutOverviewTitle.waitForDisplayed({ timeout: 10000 });
        } catch (error) {
            console.error('Failed to proceed to checkout overview:', error);
            throw error;
        }
    }

    async validateCheckoutOverviewDetails() {
        const addedItemsNames = [];
        const addedItemsPrices = [];
        try {
            for (let i = 1; i <= 2; i++) {
                const itemElement = await this.addedItemNameInCheckout(i);
                const name = await itemElement.getText();
                addedItemsNames.push(name);
                const priceElement = await this.addedItemPriceInCheckout(i);
                const price = await priceElement.getText();
                addedItemsPrices.push(price);
            }
            return [addedItemsNames, addedItemsPrices];
        } catch (error) {
            console.error('Failed to validate checkout overview details:', error);
            throw error;
        }
    }
}

export default new CheckoutPage();