import MailinatorHomePage from '../../page/mailinator/MailinatorHomePage'
import InboxPage from '../../page/mailinator/InboxPage'
import MessagePanePage from '../../page/mailinator/MessagePanePage'

const mailinatorHomeP = new MailinatorHomePage();
const inboxP = new InboxPage();
const messagePaneP = new MessagePanePage();

//! File Paths
const registerNewClientData = 'cypress/fixtures/client/RegisterNewClient.json'
const clientRegisterDetailsTestData = 'cypress/TestData/user/UserRegisterDetails.json'

function click_verification_link(filePath) {
    cy.readFile(filePath).then(data => {
        //Type new email in the search box
        mailinatorHomeP.search_box(data.email);
        cy.wait(5000);
        //Click the first email from the inbox page
        inboxP.received_mail();

        //Click on the authentication link in the mail inside the iframe
        cy.switchToIframe(messagePaneP.iframe(), messagePaneP.authentication_completed_link()).as('auth_completed');
        cy.get('@auth_completed').find(messagePaneP.authentication_completed_link()).then(link => {
            const href = link.attr('href');
            cy.readFile(registerNewClientData).then(data => {
                //Replace only the client url in the fixtures file
                data.client_URL = href;
                cy.writeFile(registerNewClientData, data);
            })
        })
        cy.wait(3000);
    });
}

export function verify_new_user_from_mail() {

    if (Cypress.env('faker')) {
        //Verify user from user generated faker
        click_verification_link(registerNewClientData);
    } else {
        //Verify user from the testData provided by the user
        click_verification_link(clientRegisterDetailsTestData);
    }
}