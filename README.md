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
    describe('homepage', () => {
        it('can show', () => {
            cy.visit('https://shopit.space/');

            cy.contains('The best shopping site in the web that would saves you most money.').should('be.visible');
        })
    })
    ```

    - `cy.visit` will visit the URL that you passed to it
    - `cy.contains` will get the element with the specified text
    - `.should` assert the element fulfill some requirements. Now we assert the elements that contains the previous text
