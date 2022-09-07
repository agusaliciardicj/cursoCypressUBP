/// <reference types="cypress" />
describe("Test de Página Eden", () => {
  it("Llamada a servicio: /inicio", () => {
    cy.callService("inicio", "espectaculos");
  });

  it("Llamada a servicio: /puntosdeventas", () => {
    cy.callService(
      "puntosdeventas",
      "puntosdeventas",
      "../schemas/puntosdeventa_sch.json"
    );
  });
});
