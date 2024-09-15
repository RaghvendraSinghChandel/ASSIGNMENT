import {expect} from "@playwright/test";
import * as loginData from "../testData/login.json"


class Login {
    constructor(page, isMobile) {
        this.page=page
        this.isMobile = isMobile
        this.dismissPopUp = page.locator(`[data-action-type="DISMISS"]`)
        this.allNavigationMenu = page.getByLabel('Open Menu')
        this.signIn = page.getByRole('link', { name: 'Sign in', exact: true })
        this.identifierInputField = page.locator(`input[name="email"]`)
        this.continueButton = page.getByLabel('Continue')
        this.passwordField = page.locator(`input[name="password"]`)
        this.signInButton = page.locator('#signInSubmit')


    }

    /**
     * This Commands is used for navigate to sign in page and sign in the account
     */
    async navigate_to_sign_in_page_and_login(userEmail = loginData.user, userPassword= loginData.password) {
        const allMenu = this.allNavigationMenu
        const dismiss = this.dismissPopUp
        const signInLinkText = this.signIn
        const email = this.identifierInputField
        const continueBtn = this.continueButton
        const pass = this.passwordField
        const login = this.signInButton
        this.page.goto('/')
        await this.page.waitForLoadState("domcontentloaded")
        await this.page.waitForTimeout(1000)
        const dimissPopUpIsVisible = await dismiss.isVisible()
        if (dimissPopUpIsVisible) {
            await dismiss.click()
            await expect(dismiss).not.toBeVisible()
        }
        await allMenu.waitFor({state: "visible"})
        await allMenu.click()
        await expect(signInLinkText).toBeVisible()
        await signInLinkText.click()
        await expect(this.page).toHaveURL(/\/ap\/signin\?/)
        await this.page.waitForLoadState("domcontentloaded")
        await expect(email).toBeVisible()
        await email.type(userEmail,{delay:60})
        await expect(email).toHaveValue(userEmail)
        await continueBtn.click()
        await expect(this.page).toHaveURL('ap/signin')
        await pass.type(userPassword,{delay:60})
        await expect(pass).toHaveValue(userPassword)
        await login.click()




    }
}
export default Login