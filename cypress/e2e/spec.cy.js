const baseUrl = 'http://localhost:3000'

describe('template spec', () => {
  it('passes', () => {
    cy.visit(baseUrl)
    const path = `${baseUrl}/auth/enter-email`
    cy.url().then(($url) => {
      expect($url).to.eql(path)
    })
  })
})
