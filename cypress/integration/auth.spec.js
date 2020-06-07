/// <reference types="cypress" />

describe('auth', () => {
    it('can login', () => {
        cy.visit('/');

        cy.findByText('Login').click();

        cy.findByLabelText('Email').type('test@shopit.com');
        cy.findByLabelText('Password').type('12345678');

        cy.findAllByText('Login').filter('button').click();

        cy.findByText("You're already login!", {
            timeout: 7000
        }).should('be.visible');
    })
})