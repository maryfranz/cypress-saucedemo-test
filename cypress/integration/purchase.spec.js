describe('Purchase a list of products added to the cart', () => {
  beforeEach(() => {
    // Navigate, login to main page and add of products
    cy.visit('/');
    cy.get('input#user-name').type('standard_user');
    cy.get('input#password').type('secret_sauce');
    cy.get('input#login-button').click();
    cy.get('div#shopping_cart_container').should('be.visible');
    cy.get('button#add-to-cart-sauce-labs-backpack').click();
    cy.get('button#add-to-cart-sauce-labs-fleece-jacket').click();
   });

  it('Verify successful purchase of products in cart list by filling required data in form', ()=> {
    cy.get('a.shopping_cart_link').click();
    cy.get('button#checkout').should('be.visible').click();
    // Filling checkout form
    cy.get('input#first-name').type('Mary');
    cy.get('input#last-name').type('Rical');
    cy.get('input#postal-code').type('591');
    cy.get('input#continue').click();
    // Completing purchase and verification
    cy.get('.inventory_item_name').should('have.length', 2);
    cy.get('button#finish').click();
    cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER');
   });

  it('Verify that the purchase of products in cart list requires filling of the checkout form', ()=> {
    cy.get('a.shopping_cart_link').click();
    cy.get('button#checkout').should('be.visible').click();
    // Filling some data in checkout form
    cy.get('input#first-name').type('Mary');
    cy.get('input#last-name').type('Rical');
    cy.get('input#continue').click();
    // An error message is thrown indicating that the Postal code is required
    cy.get('div.error-message-container').should('be.visible').contains('Error: Postal Code is required');
  });
});