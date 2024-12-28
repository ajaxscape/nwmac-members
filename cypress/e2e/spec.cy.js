const baseUrl = 'http://localhost:3000'

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('passes', () => {
    cy.get('#email').type('bensurgison@gmail.com')
    cy.get('button').contains('Continue').click()
    cy.get('button').contains('Continue').click()
    cy.get('button').contains('Continue').click()
  })
})
