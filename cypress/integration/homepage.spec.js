/// <reference types="cypress" />

describe('homepage', () => {
    it('can show', () => {
        cy.visit('/');

        cy.findByText('The best shopping site in the web that would saves you most money.').should('be.visible');
    })

    it('can go to help page', () => {
        cy.visit('/');

        cy.findAllByText('Help')
        .first()
        .click();

        cy.findByText('Hi, how can we help?')
        .should('be.visible');
    })
})