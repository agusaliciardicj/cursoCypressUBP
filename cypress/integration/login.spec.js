/// <reference types="cypress" />
import HeaderPage from "../pages/header.js";
import LoginPage from "../pages/login.js";
import Data from "../fixtures/users.json";

describe("Test de Login", () => {
  beforeEach(() => {
    cy.visit("https://automationteststore.com/");
  });

  it("Login fail - Wrong User & pass", () => {
    const header = new HeaderPage();
    const login = new LoginPage();

    header.getLoginRegisterButon().click();

    login.getUserInput().type("HolaMundo");
    login.getPassInput().type("HolaMundo");
    login.getLoginBtn().click();

    login
      .getAlertBox()
      .should("contain.text", "Error: Incorrect login or password provided.");
  });

  it("Visual testing de Login", () => {
    const header = new HeaderPage();
    const login = new LoginPage();

    header.getLoginRegisterButon().click();
    login.getUserInput().should("have.css", "border-bottom-left-radius", "0px");
  });

  it.only("Login OK", () => {
    const header = new HeaderPage();
    const login = new LoginPage();

    header.getLoginRegisterButon().click();

    login.getUserInput().type(Data.users[0].user);
    login.getPassInput().type(Data.users[0].password);
    login.getLoginBtn().click();
  });
});
