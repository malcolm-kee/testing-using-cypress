# testing-using-cypress

Step-by-step instructions on how to start end-to-end testing using Cypress.

## Prerequisite

### Knowledge

Basic knowledge of command line, e.g. `cd`, `mkdir`.

### System

Install [NodeJS](https://nodejs.org/en/download/)

## Steps

### 1. Create a NodeJS project

1. Create a new folder and name it as you wish, e.g. `testing-project`.

    ```bash
    mkdir testing-project
    ```

1. Go into that folder.

    ```bash
    cd testing-project
    ```

1. Create a `package.json` file.

    ```bash
    npm init -y
    ```

1. Install Cypress.

    ```bash
    npm install cypress
    ```

### 2. Write and Run Your First Test

1. In `package.json` file, change the `test` script command to `cypress open`.

    ```diff
    {
        "scripts": {
    -       "test": "echo \"Error: no test specified\" && exit 1"
    +       "test": "cypress open"            
        }
    }
    ```

1. In your command line, run the following command:

    ```bash
    npm run test
    ```

    A Cypress windows will open with list of example tests. If you observe your project folder, you will find that a `cypress` folder is created. The example tests are inside `cypress/integration/examples` folder.

    In the Cypress window, you can click on individual test to run it.

1. Create a `homepage.spec.js` file in `cypress/integration` folder with the following content:

    ```js
    /// <reference types="cypress" />
    describe('homepage', () => {
        it('can show', () => {
            cy.visit('https://shopit.space/');

            cy.contains('The best shopping site in the web that would saves you most money.').should('be.visible');
        })
    })
    ```

    - `cy.visit` will visit the URL that you passed to it
    - `cy.contains` will get the element with the specified text
    - `.should` assert the element fulfill some requirements. Now we assert the elements that contains the previous text is visible.
    - The triple slash (`/// <reference types="cypress" />`) comment is a special comment used by your editor to load type definition for Cypress so you get code autocomplete as you type. It's optional.

### 3. Configure Base URL

1. Update the auto-generated `cypress.json` file with the following content:

    ```json
    {
        "baseUrl": "https://shopit.space"
    }
    ```

1. Now update `homepage.spec.js`:

    ```diff
    describe('homepage', () => {
        it('can show', () => {
    -        cy.visit('https://shopit.space/');
    +        cy.visit('/');

            cy.contains('The best shopping site in the web that would saves you most money.').should('be.visible');
        })
    })
    ```

    As such the base URL no longer hard-coded in the test. If our URL changes in future, we no longer need to update it in all the tests but only via `cypress.json`.

1. Let's write another test in `homepage.spec.js`:

    ```js
    describe('homepage', () => {
        it('can show', () => {
            ...
        })

        it('can go to help page', () => {
            cy.visit('/');

            cy.contains('Help').click();

            cy.contains('Hi, how can we help?').should('be.visible');
        })
    })
    ```

### 4. Install Cypress Testing Library and Faker

1. Install [Cypress Testing Library](https://github.com/testing-library/cypress-testing-library) and [Faker.js](https://github.com/marak/Faker.js/)

    ```bash
    npm install @testing-library/cypress faker
    ```

1. Include Cypress Testing Library commands by importing it in `cypress/support/commands.js`

    ```js
    import '@testing-library/cypress/add-commands';
    ```

    Now additional selectors are added to Cypress's `cy` object:

    - `cy.findByText`
    - `cy.findByLabelText`
    - `cy.findByPlaceholderText`
    - `cy.findByAltText`
    - `cy.findByTitle`
    - `cy.findByDisplayValue`
    - `cy.findByTestId`
    
    The detailed explanations for each selectors are explained in [Testing Library's docs](https://testing-library.com/docs/dom-testing-library/api-queries#queries).

1. Change our tests in `homepage.spec.js` to use selectors from Cypress Testing Library:

    ```diff
    describe('homepage', () => {
        it('can show', () => {
            cy.visit('/');

   -         cy.contains('The best shopping site in the web that would saves you most money.').should('be.visible');
   +         cy.findByText('The best shopping site in the web that would saves you most money.').should('be.visible');
        })

        it('can go to help page', () => {
            cy.visit('/');

    -       cy.contains('Help').click();
    +       cy.findAllByText('Help').first().click();

    -       cy.contains('Hi, how can we help?').should('be.visible');
    +       cy.findByText('Hi, how can we help?').should('be.visible');
        })
    })
    ```

1. Add another test file `product.spec.js` next to `homepage.spec.js`:

    ```js
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
    ```

### 5. Test Against Different Environment

1. Add another npm script in `package.json`:

    ```diff
    {
        ...
        "scripts": {
            "test": "cypress open",
    +       "test:staging": "cypress open --config baseUrl=https://react-ecomm-site.now.sh"
        }
        ...
    }
    ```

1. Run the tests against the new URL:

    ```bash
    npm run test:staging
    ```