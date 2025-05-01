describe('Posts Page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/posts'
      },
      {
        fixture: 'posts.json'
      }
    ).as('getPosts')

    cy.visit('/')
  })

  it('successfully loads', () => {
    cy.get('h1').should('contain', 'Posts')
  })

  it('displays posts', () => {
    cy.get('h3').should('be.visible')
  })
})
