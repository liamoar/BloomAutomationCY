const faker = require('faker');
const clientRegisterDetailsFixtures = 'cypress/fixtures/client/ClientRegisterDetails.json'

export function get_client_register_data() {
    if (Cypress.env('faker')) {
        const password = `${faker.internet.password()}@`;
        const firstName = faker.name.firstName();
        const client_info = {
            companyName: `${firstName}Company`,
            shortDescription: faker.random.words(),
            registrationPageTitle: faker.name.title(),
            slug: firstName,
            position: 1,
            location: "Nepal",
            description: faker.lorem.sentence(),
            linkText: faker.random.word(),
            sharingPermission: "now",
            domainCheck: true,
            domain: "mailinator.com",
            IP_address: "192.178.9.0",
            username: faker.internet.userName(),
            email: `${firstName}@mailinator.com`,
            passwordMethod: "setPassword",
            password: password,
        }

        cy.writeFile('cypress/fixtures/client/ClientRegisterDetails.json', client_info);
        return true;
    }
}

export function get_new_client_data() {
    if (Cypress.env('faker')) {
        const new_client = {
            userName: faker.internet.userName(),
            email: `${faker.name.firstName()}@mailinator.com`,
            password: `${faker.internet.password()}@`,
            client_URL: ''
        }

        cy.writeFile('cypress/fixtures/client/RegisterNewClient.json', new_client)
        return true;
    }
}

export function edit_client_register_data() {
    if (Cypress.env('faker')) {
        const client_info = {
            shortDescription: faker.random.words(),
            registrationPageTitle: faker.name.title(),
            location: "Japan",
            linkText: faker.random.word(),
        }
        cy.readFile(clientRegisterDetailsFixtures).then(data => {
            cy.log(client_info.shortDescription);
            debugger;
            //Update the values of given keys with a new one
            data.shortDescription = client_info.shortDescription
            data.registrationPageTitle = client_info.registrationPageTitle
            data.location = client_info.location;
            data.linkText = client_info.linkText

            cy.writeFile(clientRegisterDetailsFixtures, data);
        })
        return true;
    }
}