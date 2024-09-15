import test from "../support/fixture/pageObjectFixture"

test.describe("this is a end to end scenario to checkout item from amazon", ()=> {
    /**
     * login into application
     */
    test.beforeEach(async({login})=> {
        await login.navigate_to_sign_in_page_and_login()
    })



test('add product and checkout', async ({ home }) => {
  await home.select_product_and_navigate_to_checkout_process()
  await home.checkout_added_item()
});
})