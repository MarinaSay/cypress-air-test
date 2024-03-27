describe('AIR tests', () => {
  it('Logs in and cleans up the categories', () => {
    cy.visit(Cypress.env('testHost'));
    cy.get('#normal_login_login').type(Cypress.env('login'));
    cy.get('#normal_login_password').type(Cypress.env('password'));
    cy.contains('Sign in').click();
    cy.contains('Welcome to unTill Air').should('be.visible');
    cy.api_cleanClassifier("untill.category");
  })
})