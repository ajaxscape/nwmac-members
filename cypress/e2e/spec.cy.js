import AuthPageObject from '../support/page_objects/auth.page_object.js'
const authPageObject = new AuthPageObject()

describe('template spec', () => {
  beforeEach(() => {
    authPageObject.visit('')
  })

  it('passes', () => {
    authPageObject.expectPath('/auth/enter-email')
    cy.get('#email').type('bensurgison@gmail.com')
    authPageObject.clickButtonByText('Continue')

    authPageObject.expectPath('/auth/security-code')
    authPageObject.clickButtonByText('Continue')

    authPageObject.expectPath('/details/intro')
    authPageObject.clickButtonByText('Continue')
  })
})
