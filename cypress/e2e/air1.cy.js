describe('AIR tests', () => {
  it('Logs in and cleans up everything', () => {
    cy.visit(Cypress.env('testHost'));
    cy.get('#normal_login_login').type(Cypress.env('login'));
    cy.get('#normal_login_password').type(Cypress.env('password'));
    cy.contains('Sign in').click();
    cy.contains('Hello Michael').should('be.visible');
    //cy.get('#setup_guide_header .air-bo-2-cross').click();
    cy.api_cleanClassifier("untill.category");
    cy.api_cleanClassifier("untill.food_group");
    cy.api_cleanClassifier("untill.courses");
    cy.api_cleanClassifier("untill.department");
    cy.api_cleanClassifier("untill.articles");
  })
 it('Create article', () => {
  cy.viewport(1000, 900); 
    cy.visit(Cypress.env('testHost'));
    cy.get('#normal_login_login').type(Cypress.env('login'));
    cy.get('#normal_login_password').type(Cypress.env('password'));
    cy.contains('Sign in').click();
    cy.contains('Hello Michael').should('be.visible');
    cy.get('.ant-layout-sider').contains('Products'). click();
    cy.get('.air-bo-2-tag').click();
    cy.contains('Add your first category').click();
    cy.get('#names_0').type('Drinks');
    cy.contains('Continue').click();
    cy.get('.ant-layout-sider').contains('Products'). click();
    cy.get('.air-bo-2-favorites').click();
    cy.contains('Add your first group').click();
    cy.get('#name').type('Drinks without alcohol');
    cy.get('#id_category').click();
    cy.contains('Drinks').click();
    cy.get('#id_vat').click();
    cy.contains('Standard').click();
    cy.contains('Continue').click();
    cy.get('.ant-layout-sider').contains('Products'). click();
    cy.get('.air-bo-2-dish1').click();
    cy.contains('Add your first course').click();
    cy.get('#name').type('Default course');
    cy.contains('Continue').click();
    cy.get('.ant-layout-sider').contains('Products'). click();
    cy.get('.air-bo-2-trash').click();
    cy.contains('Add your first department').click();
    cy.get('#name').type('Soft drinks');
    cy.get('#id_food_group').click();
    cy.contains('Drinks without alcohol').click();
    cy.contains('Save').click();
    cy.get('.ant-layout-sider').contains('Products'). click();
    cy.contains('Articles').click();
    cy.contains('Add your first article').click();
    cy.get('#name').type('Cola');
    cy.contains('Set price').click();
    cy.get('.ant-input-number-input:first').type('5{enter}');
    cy.get('#id_departament').click().type('Soft drinks{enter}');
    cy.get('#id_courses').click();
    cy.contains('Default course').click();
    cy.contains('Save').click();














 })
})