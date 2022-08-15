describe('Navigation', () => {
  // beforeEach(() => cy.visit('/'));

  // it('should display home', () => {
  //   // Custom command example, see `../support/commands.ts` file
  //   cy.login('my-email@something.com', 'myPassword');

  //   // Function helper example, see `../support/app.po.ts` file
  //   getGreeting().contains('Home');
  // });

  describe('home', () => {
    beforeEach(() => cy.visit('/'));

    it('should display Home as h1', () => {
      cy.get('h1').contains('Home');
    });

    it('should display lorem ipsum in p', () => {
      cy.get('p').contains(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!`
      );
    });
  });

  describe('dashboard', () => {
    beforeEach(() => cy.visit('/dashboard'));

    it('should display Dashboard as h1', () => {
      cy.get('h1').contains('Dashboard');
    });

    it('should display lorem ipsum in p', () => {
      cy.get('p').contains(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!`
      );
    });
  });

  describe('register', () => {
    beforeEach(() => cy.visit('/register'));

    it('should display Register as h1', () => {
      cy.get('h1').contains('Register');
    });

    it('should have 2 input fields', () => {
      cy.get('label').first().contains('Email');
      cy.get('label').last().contains('Password');
    });
  });
});
