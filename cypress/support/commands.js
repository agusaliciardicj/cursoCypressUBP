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
require("cypress-grep")();
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand();

/**
 * Llama al servicio acorde al primer parametro enviado
 * @method callService
 * @param {string} lastUrl - Última parte del endpoint que se concatenará con el resto
 * @param {string} fileName - Nombre del archivo de salida
 */
Cypress.Commands.add("callService", (lastUrl, fileName, schema = false) => {
  cy.request({
    method: "GET",
    url:
      "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/" +
      lastUrl,
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(JSON.stringify(response));
    cy.writeFile("cypress/fixtures/eden/" + fileName + ".json", response.body);

    if (!schema) {
      cy.log("No hay validación de esquema");
    } else {
      cy.fixture("schemas/" + schema).then((JsonFile) => {
        //Linea nueva
        /* Que paso???
        el "schema" era igual a "../schemas/puntosdeventa_sch.json"... es decir a ese texto... 
        cuando en realidad yo lo que quería era: 
        {
            "type": "array",
            "items": {
            "type": "object",
        Entonces lo que hacemos es levantar el archivo con el cy.fixture
         */
        const validate = ajv.compile(JsonFile);
        const valid = validate(response.body);
        if (!valid) {
          cy.log("Hay un error en el esquema");
        } else {
          cy.log("El esquema está bien");
        }
      }); //Linea nueva
    }
  });
});

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: "percent", // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: "viewport", // capture viewport in screenshot
});
