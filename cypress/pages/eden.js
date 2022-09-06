class edenLocators {
  constructor() {
    this.showCard = "ul.polaroids li a";
    this.showName = "div.container-thumbnail-texto";
    this.showImage = "div.container-thumbnail img";
    this.showDate = "div.textcarouselpolaroid";
  }
}

export default class Eden {
  constructor() {
    this.locators = new edenLocators();
  }

  getShowCard() {
    return cy.get(this.locators.showCard);
  }

  getShowName() {
    return cy.get(this.locators.showName);
  }

  getShowImage() {
    return cy.get(this.locators.showImage);
  }

  getShowDate() {
    return cy.get(this.locators.showDate);
  }
}
