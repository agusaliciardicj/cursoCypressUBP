class headerLocators {
  constructor() {
    //Blue Bar
    this.loginRegisterBtn = 'ul[id="customer_menu_top"] a';
    //Cart & currency

    //Submenu
    this.navSubButtons = "nav>ul>li";
    this.mainMenu = "ul.categorymenu>li>a";
    this.homeOptionsContainer = "ul#main_menu";
    this.homeOptionsContainer2 = "div.subcategories";
  }
}

export default class Header {
  constructor() {
    this.locators = new headerLocators();
  }

  getLoginRegisterButon() {
    return cy.get(this.locators.loginRegisterBtn);
  }

  getNavSubButtons(num) {
    return cy.get(this.locators.navSubButtons + ":nth-of-type(" + num + ")>a");
  }

  getMainMenu() {
    return cy.get(this.locators.mainMenu);
  }

  getHomeOptionsContainer() {
    return cy.get(this.locators.homeOptionsContainer);
  }

  getHomeOptionsContainer2() {
    return cy.get(this.locators.homeOptionsContainer2);
  }
}
