const login = () => {
    cy.session("login", () => {
        cy.visit('/login');
        cy.get('#email').type('haroon@gmail.com');
        cy.get('#password').type('password321');
        cy.get('[type=submit]').click();
        cy.contains('Logout').should('exist');
    });
}

describe('Form validation', () => {
    beforeEach(() => {
        cy.task('seedDB');
        login();
        cy.visit('/videos');
    });

    it('video URL must be valid', () => {
        cy.get('#url').type('mmmm');
        cy.get('[type=submit]').click();
        cy.contains('Video URL must be valid.').should('exist');
    })
})

describe('CRUD', () => {
    beforeEach(() => {
        cy.task('seedDB');
        login();
        cy.visit('/videos');
    });

    it('creates video', () => {
        cy.get('#url').type('https://www.youtube.com/watch?v=6I5t5rnETOU');
        cy.get('[type=submit]').click();
        cy.contains('VanossGaming').should('exist');
    })

    it('reads video', () => {
        cy.contains('Bravo Gaming').should('exist');
    })

    it('updates video', () => {
        cy.get('[data-icon=thumbs-up]').click();
        cy.get('.container-ratings span').should('contain', 1);

        cy.get('[data-icon=thumbs-down]').click();
        cy.get('.container-ratings span').should('contain', 0);
    })

    it('deletes video', () => {
        cy.get('[data-icon=xmark]').click();
        cy.contains('Bravo Gaming').should('not.exist');
    })
})