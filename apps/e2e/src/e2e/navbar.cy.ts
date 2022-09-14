describe('Dark Mode Toggle', () => {
  it('should add a dark mode class to the body element', () => {
    cy.visit('/');
    cy.get('[data-cy=toggle-theme]').click();
    cy.get('body').should('satisfy', ($el) => {
      return Array.from($el[0].classList).includes('dark-mode');
    });
  });
});
