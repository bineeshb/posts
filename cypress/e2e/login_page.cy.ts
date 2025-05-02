describe('Login Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/posts', { fixture: 'posts.json' })
    cy.intercept('GET', '/posts/*', { fixture: 'post.json' })
    cy.visit('/')
    cy.getByTestId('link-page-login').click()
  })

  it('successfully loads', () => {
    cy.location('pathname').should('eq', '/login')
    cy.getByTestId('input-username').should('be.visible')
    cy.getByTestId('input-password').should('be.visible')
    cy.getByTestId('btn-login').should('be.visible')
  })

  it('login for valid credentials, navigate to My Posts and logout', () => {
    cy.getByTestId('btn-logout').should('not.exist')
    cy.intercept('POST', '/auth/login', { fixture: 'login.json' })

    cy.getByTestId('input-username').type('cytest')
    cy.getByTestId('input-password').type('cyTest1ogin')
    cy.getByTestId('btn-login').click()

    cy.getByTestId('btn-logout').should('exist')
    cy.location('pathname').should('eq', '/my-posts')

    cy.getByTestId('btn-logout').click()
    cy.location('pathname').should('eq', '/')
  })

  it.only('show error for invalid credentials', () => {
    cy.getByTestId('msg-login-error').should('not.exist')
    cy.intercept('POST', '/auth/login', {
      statusCode: 400,
      body: { message: 'Invalid credentials' }
    })

    cy.getByTestId('input-username').type('cytest')
    cy.getByTestId('input-password').type('cyTest1ogin')
    cy.getByTestId('btn-login').click()

    cy.getByTestId('msg-login-error')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Invalid credentials')
  })
})
