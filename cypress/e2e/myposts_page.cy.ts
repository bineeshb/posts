describe('My Posts page', () => {
  beforeEach(() => {
    cy.loginViaUI()
  })

  it('successfully loads', () => {
    cy.location('pathname').should('eq', '/my-posts')
  })

  it('navigate to and from Post page', () => {
    cy.intercept('GET', '/posts/*', { fixture: 'post.json' })

    cy.getByTestId('link-post').click()

    cy.location('pathname').should('eq', '/1')
    cy.getByTestId('link-back').should('exist').should('be.visible')
    cy.getByTestId('link-back').contains(/back to my posts/i)
    cy.getByTestId('title-postpage').should('exist').should('be.visible')

    cy.getByTestId('link-back').click()

    cy.location('pathname').should('eq', '/my-posts')
    cy.getByTestId('link-back').should('not.exist')
    cy.getByTestId('title-postpage').should('not.exist')
  })
})
