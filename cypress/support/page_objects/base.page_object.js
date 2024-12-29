const baseUrl = 'http://localhost:3000'

export default class BasePageObject {
  constructor() {
   }

   visit(path) {
    return cy.visit(`${baseUrl}${path}`);
   }

   clickButtonByText(text) {
    return cy.contains('Button.govuk-button', text).click();
   }

   expectPath(path) {
    return cy.url().then(($url) => {
       expect($url).to.eql(`${baseUrl}${path}`)
     })
   }
}