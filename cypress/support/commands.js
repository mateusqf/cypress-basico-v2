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




// primeiro argumento é o nome do comando (fillMandatoryFieldsAndSubmit) e o segundo argumento é a função que vai executar o nosso comando customizado
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){// comando customizado
    cy.get('#firstName').type('Mateus')
    cy.get('#lastName').type('Queiroz')
    cy.get('#email').type('mateus@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})
