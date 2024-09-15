import { expect } from "@playwright/test";
import * as homeData from "../testData/homePage.json"
import { fetchNumberFromText } from "../utils";
let productAmount

class Home {
    constructor(page, isMobile) {
        this.page = page
        this.isMobile = isMobile
        this.searchBox = page.getByPlaceholder('Search Amazon')
        this.selectProduct = page.getByRole("button", {name: homeData.searchData })
        this.addToCartButton = page.locator(`[data-csa-c-action-name="addToCart"]`).first()
        this.gotToCartButton = page.getByRole('link', {name: "Go to Cart", exact: true})
        this.selectedItemPrice = page.locator(`div.ewc-item-update-content`)
        this.productQuantity = page.locator(`[data-a-class="quantity"]`)
        this.subTotalAmount = page.locator(`#sc-subtotal-amount-buybox`)
        this.proceedToCheckoutButton = page.locator(`[data-feature-id="proceed-to-checkout-action"]`)
        this.orderSummaryAmount = page.locator(`tbody tr td`).nth(1)
        this.skipForNow = page.locator(`[for=kyc-xborder-radio-skip] i`)
        this.continueButton = page.locator(`#kyc-xborder-continue-button`)
        this.useThisMethod = page.locator(`#orderSummaryPrimaryActionBtn-announce`).locator('..').locator('..').first()
        this.placeYourAddedOrder = page.getByRole('button', {name: "Place your order in INR"}).first()
        this.selectIndianCurrency = page.locator(`input[value="INR"]`)
        // this.useThisPaymentMethod = page.locator(`#orderSummaryPrimaryActionBtn-announce`)
        this.changeCard = page.locator('##spp-payment-change-coll')
        this.addCard = page.getByRole("link", {name: "Add a credit or debit card", exact:true})
        this.cardNumberInput = page.locator(`[name="addCreditCardNumber"]`)
        this.cardHolderName = page.locator(`[name="ppw-accountHolderName"]`)
        this.deleteItem = page.locator(`[data-action="ewc-delete-item"]`)

    }

    /**
     * This Commands is used for select product and navigate to checkout process
     */
    async select_product_and_navigate_to_checkout_process() {
        const search = this.searchBox
        const product = this.selectProduct.first()
        const addCart = this.addToCartButton
        const itemPrice = this.selectedItemPrice
        const quantity = this.productQuantity
        const goToCart = this.gotToCartButton
        const deleteAddedItem = this.deleteItem

        await expect(search).toBeVisible()
        await search.type(homeData.searchData)
        await this.page.waitForTimeout(2000)
        await expect(search).toHaveValue(homeData.searchData)
        await expect(product).toBeVisible()
        await product.click()
        await this.page.waitForLoadState("domcontentloaded")
        await addCart.waitFor({state:"visible"})
        await this.page.waitForTimeout(3000)
        await expect(addCart).toBeVisible()
        await addCart.click()
        await itemPrice.waitFor({state:"visible"})
        await expect(itemPrice).toBeVisible()
        const priceText = await itemPrice.textContent()
        productAmount = fetchNumberFromText(priceText)
        console.log(`product price is ${productAmount}`)
        await expect(quantity).toBeVisible()
        await expect(quantity).toHaveText('1')
        await expect(goToCart).toBeVisible()
        await goToCart.click()

    }

    /**
     * This Command is used for checkout added cart item
     */
    async checkout_added_item() {
        const proceedCheckout = this.proceedToCheckoutButton
        const orderAmount = this.orderSummaryAmount
        const skipIdentity = this.skipForNow.locator('..').locator('i').first()
        const continueBtn = this.continueButton
        const usePaymentMethod = this.useThisMethod
        const placeOrder = this.placeYourAddedOrder
        await proceedCheckout.waitFor({state:"visible"})
        await expect(proceedCheckout).toBeVisible()
        await proceedCheckout.click()
        await expect(orderAmount).toBeAttached()
        const amount = await orderAmount.textContent()
        const amountPrice = fetchNumberFromText(amount)
        expect(amountPrice).toEqual(productAmount)
        await expect(skipIdentity).toBeVisible()
        await skipIdentity.click()
        await expect(continueBtn).toBeVisible()
        await continueBtn.click()
        await expect(usePaymentMethod).toBeVisible()
        await usePaymentMethod.click()
        await expect(placeOrder).toBeVisible()
        await placeOrder.click()
    }

}
export default Home