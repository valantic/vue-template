describe('Styleguide', function() {
  it('Visits the styleguide forms page', function () {
    cy.visit('http://localhost:8080/styleguide/forms');

    cy.get("[name*='firstName']")
      .type('Max');

    cy.get("[name*='message']")
      .type('Custom Text');

    cy.get("[value*='pizza']").parent()
      .click();

    cy.get("[value*='lasagne']").parent()
      .click();

    cy.get("[value*='sprite']").parent()
      .click();

    cy.get('#data')
      .should('contain', 'sprite');

    cy.get("[value*='cola']").parent()
      .click();

    cy.get('#data')
      .should('not.contain', 'sprite');

    cy.get('.e-select__select')
      .select('french');

    cy.get('#data')
      .should('contain', 'french')
      .should('contain', 'pizza')
      .should('contain', 'cola')
      .should('not.contain', 'sprite');

    cy.get('button')
      .click();
  });
});
