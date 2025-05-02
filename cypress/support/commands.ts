/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testid: string, ...args: any): Chainable<JQuery<HTMLElement>>
      loginViaUI(): Chainable<void>
    }
  }
}

Cypress.Commands.add('getByTestId', (selector, ...args) => cy.get(`[data-testid=${selector}]`, ...args))

Cypress.Commands.add('loginViaUI', () => {
  cy.intercept('GET', '/posts', { fixture: 'posts.json' }).as('getPosts')
  cy.intercept('GET', '/posts/user/*', { fixture: 'posts.json' }).as('getUserPosts')
  cy.intercept('GET', '/posts/*', { fixture: 'post.json' }).as('getPost')
  cy.intercept('POST', '/auth/login', { fixture: 'login.json' }).as('loginUser')
  cy.visit('/')
  cy.wait('@getPosts')
  cy.getByTestId('link-page-login').click()
  cy.getByTestId('input-username').type('cytest')
  cy.getByTestId('input-password').type('cyt3stP@ss')
  cy.getByTestId('btn-login').click()
  cy.wait('@loginUser')
})

export default {}
