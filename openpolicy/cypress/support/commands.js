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

Cypress.Commands.add(`signIn`, () => {
    cy.log(`Signing in.`);
    cy.visit(`/`, {failOnStatusCode: false});

    cy.window()
        .should((window) => {
            expect(window).to.not.have.property(`Clerk`, undefined);
            expect(window.Clerk.isReady()).to.eq(true);
        })
        .then(async (window) => {
            await cy.clearCookies({ domain: window.location.domain });
            const res = await window.Clerk.client.signIn.create({
            identifier: Cypress.env(`test_email`),
            password: Cypress.env(`test_password`),
        });

        await window.Clerk.setActive({
            session: res.createdSessionId,
        });

        cy.log(`Finished Signing in.`);
    });
});

Cypress.Commands.add(`signOut`, () => {
    cy.log(`sign out by clearing all cookies.`);
    cy.clearCookies({ domain: 'http://127.0.0.1:3000' });
});

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