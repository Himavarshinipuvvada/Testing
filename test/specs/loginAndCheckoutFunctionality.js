import { expect } from '@wdio/globals';
import LoginPage from '../../pages/login.page.js';
import ProductsPage from '../../pages/products.page.js';
import CartPage from '../../pages/cart.page.js';
import CheckoutPage from '../../pages/checkout.page.js';
import FinishPage from '../../pages/finish.page.js';

describe('My Login application', () => {
    it('should login with valid credentials and complete checkout', async () => {
        // Login
        await LoginPage.login('standard_user', 'secret_sauce');
        const isLoggedIn = await LoginPage.isLoggedIn();
        if (!isLoggedIn) {
            const errorMsg = await LoginPage.getErrorMessage();
            console.error('Login failed, error message:', errorMsg);
        }
        expect(isLoggedIn).toBe(true, 'Expected to see the "Products" screen after login');

        // Add items to cart and get details
        let [itemsNamesAddedToCart, itemsPriceAddedToCart] = await ProductsPage.addFirstTwoItemsToCartAndGetItemDetails();
        console.log(itemsNamesAddedToCart, itemsPriceAddedToCart);

        // Navigate to cart and validate
        await ProductsPage.navigateToCart();
        const cartScreenTitle = await CartPage.validateCartScreenTitle();
        expect(cartScreenTitle).toContain('YOUR CART');

        const [addedItemsNamesInCart, addedItemsPricesInCart] = await CartPage.validateFirstTwoItemsAreAddedToCart();
        expect(addedItemsNamesInCart).toEqual(itemsNamesAddedToCart);
        expect(addedItemsPricesInCart).toEqual(itemsPriceAddedToCart);

        // Proceed to checkout
        await CartPage.proceedToCheckout();

        // Fill checkout information and validate overview
        await CheckoutPage.fillCheckoutInformation();
        await CheckoutPage.proceedToOverview();
        const [addedItemsNamesInCheckoutOverview, addedItemsPricesInCheckoutOverview] = await CheckoutPage.validateCheckoutOverviewDetails();
        expect(addedItemsNamesInCheckoutOverview).toEqual(itemsNamesAddedToCart);
        expect(addedItemsPricesInCheckoutOverview).toEqual(itemsPriceAddedToCart);
        
        //proceed to finish
        await FinishPage.completeCheckout();
    });
});