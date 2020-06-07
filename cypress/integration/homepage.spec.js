/// <reference types="cypress" />

describe('homepage', () => {
    it('can show', () => {
        cy.visit('/');

        cy.contains('The best shopping site in the web that would saves you most money.').should('be.visible');
    })

    it('can go to help page', () => {
        cy.visit('/');

        cy.contains('Help').click();

        cy.contains('Hi, how can we help?').should('be.visible');
    })
})