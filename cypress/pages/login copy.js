export default class Login {
  getUserInput() {
    return cy.get("#loginFrm_loginname");
  }

  getPassInput() {
    return cy.get("#loginFrm_password");
  }

  getLoginBtn() {
    return cy.get('button[title="Login"]');
  }

  getAlertBox() {
    return cy.get("div.alert");
  }
}
