import { driver } from "@wdio/globals";

class FinishPage {
    get scrollTillFinishBtn() { return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("test-FINISH"))'); }
    get finishBtn() { return $('//android.view.ViewGroup[@content-desc="test-FINISH"]'); }

    async completeCheckout() {
        try {
            await this.scrollTillFinishBtn.waitForDisplayed({ timeout: 10000 });
            await this.finishBtn.waitForDisplayed({ timeout: 10000 });
            await this.finishBtn.click();
        } catch (error) {
            console.error('Failed to complete checkout:', error);
            throw error;
        }
    }
}

export default new FinishPage();