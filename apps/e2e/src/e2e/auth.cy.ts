describe('Register', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=login]').click();
    cy.get('[data-cy=register-toggle]').click();
  });

  describe('Errors', () => {
    it('should show required errors on submit with no data', () => {
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=email-required]').contains('Email is required');
      cy.get('[data-cy=password-required]').contains('Password is required');
    });

    it('should show email pattern error when the input is not an email', () => {
      cy.get('[data-cy=login-email]').type('test');
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=email-pattern]').contains('Email must be valid');
    });
  });

  describe('Success', () => {
    it('should login and login the user and navigate to dashboard', () => {
      cy.get('[data-cy=login-email]').type('test@test.com');
      cy.get('[data-cy=login-password]').type('123');
      cy.get('[data-cy=login-submit]').click();
      cy.get('.mat-simple-snack-bar-content').contains('You have been logged in!');
    });
  });
});

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=login]').click();
  });

  describe('Errors', () => {
    it('should show required errors on submit with no data', () => {
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=email-required]').contains('Email is required');
      cy.get('[data-cy=password-required]').contains('Password is required');
    });

    it('should show email pattern error when the input is not an email', () => {
      cy.get('[data-cy=login-email]').type('test');
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=email-pattern]').contains('Email must be valid');
    });

    it('should show error tost when user credentials are incorrect', () => {
      cy.get('[data-cy=login-email]').type('test2@test.com');
      cy.get('[data-cy=login-password]').type('123');
      cy.get('[data-cy=login-submit]').click();
      cy.get('.mat-simple-snack-bar-content').contains('Forbidden - Credentials Incorrect');
    });
  });

  describe('Success', () => {
    it('should login the user', () => {
      cy.get('[data-cy=login-email]').type('test@test.com');
      cy.get('[data-cy=login-password]').type('123');
      cy.get('[data-cy=login-submit]').click();
      cy.get('.mat-simple-snack-bar-content').contains('You have been logged in!');
    });
  });
});
