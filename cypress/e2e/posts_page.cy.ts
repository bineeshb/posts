describe('Posts Page', () => {
  it('successfully loads and display posts', () => {
    cy.visit('/')

    cy.getByTestId('title-posts').should('contain', 'Posts')
    cy.getByTestId('title-post').should('be.visible')
    cy.getByTestId('msg-noposts').should('not.exist')
  })

  it('display no posts message', () => {
    cy.intercept('GET', '/posts', {})
    cy.visit('/')

    cy.getByTestId('title-posts').should('contain', 'Posts')
    cy.getByTestId('title-post').should('not.exist')
    cy.getByTestId('msg-noposts').should('exist').should('be.visible')
  })

  it('navigate to and from Post page', () => {
    cy.intercept('GET', '/posts', { fixture: 'posts.json' })
    cy.visit('/')

    cy.location('pathname').should('eq', '/')
    cy.getByTestId('link-back').should('not.exist')
    cy.getByTestId('title-postpage').should('not.exist')

    cy.getByTestId('link-post').click()

    cy.intercept(
      {
        method: 'GET',
        url: '/posts/*'
      },
      {
        fixture: 'post.json'
      }
    )
    cy.location('pathname').should('eq', '/1')
    cy.getByTestId('link-back').should('exist').should('be.visible')
    cy.getByTestId('link-back').contains(/back to posts/i)
    cy.getByTestId('title-postpage').should('exist').should('be.visible')

    cy.getByTestId('link-back').click()

    cy.location('pathname').should('eq', '/')
    cy.getByTestId('link-back').should('not.exist')
    cy.getByTestId('title-postpage').should('not.exist')
  })
})
