describe('Add elements to cart', () => {
  beforeEach(() => {
    // Navigate and login to main page
    cy.visit('/');
    cy.get('input#user-name').type('standard_user');
    cy.get('input#password').type('secret_sauce');
    cy.get('input#login-button').click();
    cy.get('div#shopping_cart_container').should('be.visible');
  });
  it('Verify that products can be added to the cart', ()=> {
    // Adding to cart 'Sauce Labs Backpack' and 'Test.allTheThings() T-Shirt (Red)' product
    cy.get('button#add-to-cart-sauce-labs-backpack').click();
    cy.get('button[id=\'add-to-cart-test.allthethings()-t-shirt-(red)\']').click();
    cy.get('a.shopping_cart_link').click();
    cy.get('button#checkout').should('be.visible');
    // User expects to see the two added products
    cy.get('.inventory_item_name').should(($list) => {
      expect($list).to.have.length(2);
      expect($list).to.contain('Sauce Labs Backpack');
      expect($list).to.contain('Test.allTheThings() T-Shirt (Red)');
    });
  });

  it('Verify that only one item per product can be added to the cart', ()=> {
    cy.get('button#add-to-cart-sauce-labs-bolt-t-shirt').click();
    // 'Sauce Labs Bolt T-Shirt' product was added and ADD TO CART button is not present anymore for it
    cy.get('span.shopping_cart_badge').should('have.text', 1);
    cy.get('button#add-to-cart-sauce-labs-bolt-t-shirt').should('not.exist');
  });

  it('Verify that the cart list is updated when a product is removed', ()=> {
    cy.get('button#add-to-cart-sauce-labs-backpack').click();
    cy.get('button#add-to-cart-sauce-labs-bolt-t-shirt').click();
    cy.get('button#add-to-cart-sauce-labs-fleece-jacket').click();
    cy.get('button#remove-sauce-labs-backpack').click();
    cy.get('span.shopping_cart_badge').should('have.text', 2).click();
    cy.get('button#checkout').should('be.visible');
    // User expects to see only two added products, the removed one is not present on the cart list
    cy.get('.inventory_item_name').should(($list) => {
      expect($list).to.have.length(2);
      expect($list).to.contain('Sauce Labs Fleece Jacket');
      expect($list).to.contain('Sauce Labs Bolt T-Shirt');
      expect($list).to.not.contain('Sauce Labs Backpack');
    });
  });
});