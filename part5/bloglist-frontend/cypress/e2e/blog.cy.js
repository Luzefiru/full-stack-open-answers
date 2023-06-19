describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('API_URL')}/testing/reset`);
    cy.visit('/');
  });

  it('Login form is shown', function () {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });
});
