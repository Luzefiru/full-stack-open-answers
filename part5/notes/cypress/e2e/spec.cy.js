describe('Note app', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    )
  })
  it('login form can be opened', function () {
    cy.contains('login').click()
  })
  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test12345')
    cy.get('#login-button').click()

    cy.contains('Test Account logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('input:first').type('test')
      cy.get('input:last').type('test12345')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('button', 'new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
})
