describe('Form validation', () => {
  beforeEach(() => {
      cy.task('seedDB');
      cy.visit('/');
  });

  it('Fields cannot be empty', () => {
      cy.get('[type=submit]').click();
      cy.contains('Email is a required field').should('exist');
  })

  it('Email must be at least 3 characters', () => {
      cy.get('#email').type('h');
      cy.get('[type=submit]').click();
      cy.contains('Email must be a valid email').should('exist');
  })

  it('Email must be a valid email', () => {
      cy.get('#email').type('bobemail');
      cy.get('[type=submit]').click();
      cy.contains('Email must be a valid email').should('exist');
  })

  it('Email cannot be longer than 256 characters', () => {
      let longEmail = 'bobemail';
      longEmail += Cypress._.repeat('l', 250);
      longEmail += '@gmail.com';

      cy.get('#email').invoke('val', longEmail);
      cy.get('#email').type('l');
      cy.get('[type=submit]').click();
      cy.contains('Email must be at most 256 characters').should('exist');
  })

  it('Password must be at least 3 characters', () => {
      cy.get('#password').type('h');
      cy.get('[type=submit]').click();
      cy.contains('Password must be at least 3 characters').should('exist');
  })

  it('Password cannot be longer than 15 characters', () => {
      cy.get('#password').type('password32111111');
      cy.get('[type=submit]').click();
      cy.contains('Password must be at most 15 characters').should('exist');
  })
})

describe('User registration', () => {
  beforeEach(() => {
      cy.task('seedDB');
      cy.visit('/');
  });

  it('Registers user', () => {
      cy.get('#email').type('haroon2@gmail.com');
      cy.get('#password').type('password321');
      cy.get('[type=submit]').click();
      cy.contains('User registered.').should('exist');
  })

  it('Stops user duplication', () => {
      cy.get('#email').type('haroon@gmail.com');
      cy.get('#password').type('password321');
      cy.get('[type=submit]').click();
      cy.contains('User already registered.').should('exist');
  })
})