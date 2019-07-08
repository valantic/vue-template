describe('E-fieldset', function() {
  it('Visits the e-fieldset page', function () {
    cy.visit('http://localhost:6060/styleguide#!/e-fieldset/1');

    cy.get('.e-label__name')
      .first()
      .click();

    cy.focused()
      .type('Max');

    cy.get("[name*='demo']").first()
      .should('have.value', 'Max');
  });
});
