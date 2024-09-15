import {test as baseTest} from "@playwright/test";

import Login from "../pageMethod/loginPage";
import Home from "../pageMethod/homePage";

const test = baseTest.extend({
    login: async({page, isMobile}, use)=> {
        const login = new Login(page, isMobile)
        await use (login)
    },
    home: async({page,isMobile}, use)=> {
        const home = new Home(page,isMobile)
        await use (home)
    }

})
export default test