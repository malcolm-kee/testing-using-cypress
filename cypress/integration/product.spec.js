/// <reference types="cypress" />
import faker from 'faker';

describe('product', () => {
    it('can add comment', () => {
        cy.visit('/');

        cy.findAllByTestId('productBox')
        .first()
        .click();

        cy.findByLabelText('Your Name')
        .type(faker.name.findName());

        const review = faker.lorem.sentence(2);

        cy.findByLabelText('Your Review')
        .type(review);

        cy.findByText('Add').click();

        cy.findByLabelText('Your Review').should('be.enabled');

        cy.findByText(review).should('be.visible');
    })
})