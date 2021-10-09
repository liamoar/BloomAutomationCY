import ClientLoginPage from '../../page/client/ClientLoginPage'
import ClientHeader from '../../page/client/ClientHeader'
const clientLoginP = new ClientLoginPage()
const clientHeaderP = new ClientHeader();

//! File Paths
const clientRegisterDetailsFixtures = 'cypress/fixtures/client/ClientRegisterDetails.json'
const clientRegisterDetailsTestData = 'cypress/TestData/client/ClientRegisterDetails.json'
const registerNewClientData = 'cypress/fixtures/client/RegisterNewClient.json'


export function visitCurrentClientURL() {
    return cy.visit(getCurrentURL()).wait(1000);
}

export function getCurrentURL() {
    return Cypress.env(Cypress.env(Cypress.env('currentURL')).client).url;
}

//* Login the client from json file of fixtures if present
//* If not login using ClientRegisterDetails json file present in the TestData/Client folder
export function login_client() {
    cy.checkFileExists(clientRegisterDetailsFixtures).then(check => {
        if (check) {
            cy.log('The file exists');
            cy.readFile(clientRegisterDetailsFixtures).then(data => {
                login(data);
            })
        } else {
            cy.log('There is no fixtures file for userRegisters. Login with default data in the TestData/client folder');
            cy.checkFileExists(clientRegisterDetailsTestData).then(check => {
                if (check) {
                    cy.readFile(clientRegisterDetailsTestData).then(data => {
                        login(data);
                    })
                }
            })
        }
    })
}

function login(parameter) {
    clientLoginP.email(parameter.email);
    clientLoginP.password(parameter.password);

    cy.server();
    cy.route({
        url: `${Cypress.env(Cypress.env(Cypress.env('currentURL')).admin).url}/client_api/v1/oauth2/token`,
        method: 'POST',
    }).as('clientLogin')
    //Click on login button
    clientLoginP.login_btn();
    //Storing the client access_token in the fixtures
    cy.wait('@clientLogin').then(response => {
        cy.log(response.responseBody.access_token);
        cy.writeFile('cypress/fixtures/client/ClientToken.json', {
            "access_token": `Bearer ${response.responseBody.access_token}`
        })
    })
}

//*Login the new Client created from the 'Company Users' module in the Admin portal
export function login_new_client() {
    cy.checkFileExists(registerNewClientData).then(check => {
        if (check) {
            cy.readFile(registerNewClientData).then(data => {
                cy.log(data.email);
                clientLoginP.email(data.email);
                clientLoginP.password(data.password);
                clientLoginP.login_btn();
            })
        } else {
            cy.log('The registerNewClientData fixtures is not available')
        }
    })
}

//Logout the client by clicking the header icon
export function logout_client() {
    clientHeaderP.logout_icon();
}