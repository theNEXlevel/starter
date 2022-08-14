beforeEach(() => {
  cy.visit('/');
});

describe('Login', () => {
  beforeEach(() => {
    cy.get('[data-cy=login]').click();
  });
  describe('Errors', () => {
    it('should show required errors on submit with no data', () => {
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=email-required]').contains('Email is required');
      cy.get('[data-cy=password-required]').contains('Password is required');
    });

    it('should show email pattern error when the input is not an email', () => {
      cy.get('#email').type('test');
      cy.get('[data-cy=email-pattern]').contains('Email must be valid');
    });

    it('should show error tost when user credentials are incorrect', () => {
      cy.get('#email').type('test@test.com');
      cy.get('#password').type('123');
      cy.get('[data-cy=login-submit]').click();
      cy.get('.p-toast-summary').contains('Forbidden');
      cy.get('.p-toast-detail').contains('Credentials Incorrect');
    });
  });
});
