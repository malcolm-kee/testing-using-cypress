/// <reference types="cypress" />

describe('homepage', () => {
    it('can show', () => {
        cy.visit('https://shopit.space/');

        cy.contains('The best shopping site in the web that would saves you most money.').should('be.visible')
    })
})