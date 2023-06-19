describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('API_URL')}/testing/reset`);
    cy.request('POST', `${Cypress.env('API_URL')}/users`, {
      name: 'Testy',
      username: 'test',
      password: 'test12345',
    });
    cy.visit('/');
  });

  it('Login form is shown', function () {
    cy.get('#username');
    cy.get('#password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test');
      cy.get('#password').type('test12345');
      cy.contains('login').click();
      cy.contains('Testy logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('password');
      cy.contains('login').click();
      cy.contains('wrong username or password');
      cy.get('.Notification').should(
        'have.css',
        'border-color',
        'rgb(255, 0, 0)'
      );
    });
  });
});
