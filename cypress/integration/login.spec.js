describe('Login to saucedemo page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Verify successful login to saucedemo page with existing credentials', ()=> {
    cy.get('input#user-name').type('standard_user');
    cy.get('input#password').type('secret_sauce');
    cy.get('input#login-button').click();
    // User is able to login and land to main page
    cy.get('div#shopping_cart_container').should('be.visible');
  });

  it('Verify login validation when invalid password is set', ()=> {
    cy.get('input#user-name').type('standard_user');
    cy.get('input#password').type('no_valid_pass');
    cy.get('input#login-button').click();
    // A general error message is thrown indicating that password does not match
    cy.get('div.error-message-container').should('be.visible').contains('Username and password do not match any user in this service');
  });

  it('Verify login validation when no username is set', ()=> {
    cy.get('input#password').type('secret_sauce');
    cy.get('input#login-button').click();
    // An error message is thrown indicating that Username is required
    cy.get('div.error-message-container').should('be.visible').contains('Username is required');
  });

  it('Verify login validation when no password is set', ()=> {
    cy.get('input#user-name').type('standard_user');
    cy.get('input#login-button').click();
    // An error message is thrown indicating that Password is required
    cy.get('div.error-message-container').should('be.visible').contains('Password is required');
  });
});