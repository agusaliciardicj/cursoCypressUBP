class loginLocators {
  constructor() {
    this.inputUser = "#loginFrm_loginname";
    this.inputPass = "#loginFrm_password";
    this.loginBtn = 'button[title="Login"]';
    this.alertBox = "div.alert";
  }
}

export default class Login {
  constructor() {
    this.locators = new loginLocators();
  }

  getUserInput() {
    return cy.get(this.locators.inputUser);
  }

  getPassInput() {
    return cy.get(this.locators.inputPass);
  }

  getLoginBtn() {
    return cy.get(this.locators.loginBtn);
  }

  getAlertBox() {
    return cy.get(this.locators.alertBox);
  }
}
