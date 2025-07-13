class LoginPage {
    get usernameField() { return $('~test-Username'); }
    get passwordField() { return $('~test-Password'); }
    get loginButton() { return $('~test-LOGIN'); }
    get errorMessage() { return $('[data-test="error"]'); }
    get productsTitle() { return $('//android.widget.TextView[contains(@text, "PRODUCTS")]'); }

    async login(username, password) {
        try {
            await this.usernameField.waitForDisplayed();
            await this.usernameField.setValue(username);
            await this.passwordField.waitForDisplayed();
            await this.passwordField.setValue(password);
            await this.loginButton.waitForDisplayed();
            await this.loginButton.click();
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async isLoggedIn() {
        try {
            await this.productsTitle.waitForDisplayed();
            const titleText = await this.productsTitle.getText();
            return titleText === 'PRODUCTS';
        } catch (error) {
            console.error('Failed to verify login:', error);
            return false;
        }
    }

    async getErrorMessage() {
        try {
            await this.errorMessage.waitForDisplayed();
            return await this.errorMessage.getText();
        } catch (error) {
            console.error('Failed to get error message:', error);
            return '';
        }
    }
}

export default new LoginPage();