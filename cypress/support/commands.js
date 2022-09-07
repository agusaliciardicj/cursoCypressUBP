// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const Ajv = require("ajv");
const ajv = new Ajv();

/**
 * Llama al servicio acorde al primer parametro enviado
 * @method callService
 * @param {string} lastUrl - Última parte del endpoint que se concatenará con el resto
 * @param {string} fileName - Nombre del archivo de salida
 */
Cypress.Commands.add("callService", (lastUrl, fileName, schema = "") => {
  cy.request({
    method: "GET",
    url:
      "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/" +
      lastUrl,
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(JSON.stringify(response));
    cy.writeFile("cypress/fixtures/eden/" + fileName + ".json", response.body);

    if (schema == "") {
      cy.log("No hay validación de esquema");
    } else {
      const validate = ajv.compile(schema);
      const valid = validate(response.body);
      if (!valid) {
        cy.log("Hay un error en el esquema");
      } else {
        cy.log("El esquema está bien");
      }
    }
  });
});
