describe('My Profile page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/users/*', { fixture: 'user.json' }).as('getUser')
    cy.loginViaUI()
  })

  it('navigate to My Profile page', () => {
    cy.getByTestId('link-page-myprofile').click()
    cy.getByTestId('title-userfullname').should('exist').should('be.visible')
    cy.getByTestId('btn-edit').should('exist').should('be.visible')
  })
})
