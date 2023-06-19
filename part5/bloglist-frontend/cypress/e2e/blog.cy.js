describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('API_URL')}/testing/reset`);
    cy.request('POST', `${Cypress.env('API_URL')}/users`, {
      name: 'Testy',
      username: 'test',
      password: 'test12345',
    });
    cy.request('POST', `${Cypress.env('API_URL')}/users`, {
      name: 'Another Testy',
      username: 'another',
      password: 'another12345',
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', `${Cypress.env('API_URL')}/login`, {
        username: 'test',
        password: 'test12345',
      }).then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res.body));
        cy.visit('/');
      });
    });

    it.only('A blog can be created', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('A cypress blog');
      cy.get('#author').type('Queen Cypress');
      cy.get('#url').type('http://cypress.com');
      cy.contains('button', 'Create').click();
      cy.contains('A cypress blog Queen Cypress').contains('button', 'view');
    });

    it('A user can like a blog', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('A cypress blog');
      cy.get('#author').type('Queen Cypress');
      cy.get('#url').type('http://cypress.com');
      cy.contains('button', 'Create').click();
      cy.contains('A cypress blog Queen Cypress')
        .contains('button', 'view')
        .click();
      cy.contains('A cypress blog Queen Cypress').parent().contains('0');
      cy.contains('button', 'like').click();
      cy.contains('You liked the blog:');
      cy.contains('A cypress blog Queen Cypress').parent().contains('1');
    });

    it.only('A user who created a blog can delete it', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('A cypress blog');
      cy.get('#author').type('Queen Cypress');
      cy.get('#url').type('http://cypress.com');
      cy.contains('button', 'Create').click();
      cy.contains('A cypress blog Queen Cypress')
        .contains('button', 'view')
        .click();
      cy.contains('button', 'Remove').click();
      cy.get('A cypress blog Queen Cypress').should('not.exist');
    });

    it.only('Only the creator of a blog may see the delete button of a blog', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('A cypress blog');
      cy.get('#author').type('Queen Cypress');
      cy.get('#url').type('http://cypress.com');
      cy.contains('button', 'Create').click();
      cy.contains('A cypress blog Queen Cypress');
      cy.contains('button', 'Logout').click();

      cy.request('POST', `${Cypress.env('API_URL')}/login`, {
        username: 'another',
        password: 'another12345',
      }).then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res.body));
        cy.visit('/');
      });

      cy.contains('A cypress blog Queen Cypress')
        .contains('button', 'view')
        .click();

      cy.contains('A cypress blog Queen Cypress')
        .parent()
        .contains('button', 'Remove')
        .click();

      cy.get('.Notification')
        .should('contain', 'you are not the owner of this blog')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
  });
});
