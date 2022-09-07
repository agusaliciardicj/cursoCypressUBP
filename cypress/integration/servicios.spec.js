/// <reference types="cypress" />
import EdenPage from "../pages/eden.js";

describe("Test de Servicios", () => {
  it("GET action in Eden entradas", () => {
    //Call service
    cy.request({
      method: "GET",
      url: "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/inicio",
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response));
      cy.writeFile("cypress/fixtures/shows.json", response.body);
    });
  });

  it("Check UI", () => {
    cy.visit("https://www.edenentradas.com.ar/sitio/contenido/inicio");
    const eden = new EdenPage();

    cy.fixture("shows.json").then((fixture) => {
      fixture.Eventos.forEach((showDentroDeFix, $index) => {
        if ($index < 10) {
          eden.getShowCard().eq($index).scrollIntoView();
          eden
            .getShowName()
            .eq($index)
            .should("have.text", showDentroDeFix.Nombre);
          eden
            .getShowImage()
            .eq($index)
            .should("have.attr", "src", showDentroDeFix.Imagen);
          eden.getShowImage().eq($index).trigger("mouseover");
          eden
            .getShowDate()
            .should("be.visible")
            .and("contain.text", showDentroDeFix.Fecha)
            .and("contain.text", showDentroDeFix.Lugar);
        }
      });
    });
  });
});
