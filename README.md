# testing-using-cypress

Step-by-step instructions on how to start end-to-end testing using Cypress.

## Prerequisite

### Knowledge

1. Basic knowledge of command line, e.g. `cd`, `mkdir`.
1. Basic knowledge of Git, e.g. `git add`, `git commit`, `git push`.

### System

1. Install [NodeJS](https://nodejs.org/en/download/)
1. Install [Git](https://git-scm.com/downloads)

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