/// <reference types="cypress" />
describe("Test de Página Eden", () => {
  it("Llamada a servicio: /inicio", () => {
    cy.callService("inicio", "espectaculos");
  });

  it.only("Llamada a servicio: /puntosdeventas", () => {
    cy.callService(
      "puntosdeventas",
      "puntosdeventas",
      "puntosdeventa_sch.json"
    );
  });
});
