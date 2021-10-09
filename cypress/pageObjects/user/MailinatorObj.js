import MailinatorHomePage from '../../page/mailinator/MailinatorHomePage'
import InboxPage from '../../page/mailinator/InboxPage'
import MessagePanePage from '../../page/mailinator/MessagePanePage'
const mailinatorHomeP = new MailinatorHomePage()
const inboxP = new InboxPage()
const messagePaneP = new MessagePanePage();

//! File Paths
const clientRegisterDetailsFixtures = 'cypress/fixtures/user/UserRegisterDetails.json'
const clientRegisterDetailsTestData = 'cypress/TestData/user/UserRegisterDetails.json'

export function verify_new_user_from_email() {

    if (Cypress.env('faker')) {
        //Verify the user generated from faker
        email_verification(clientRegisterDetailsFixtures)
    }
    //Verify the user provided in the TestData/user
    else {
        email_verification(clientRegisterDetailsTestData);
    }
}

function email_verification(filePath) {
    cy.readFile(filePath).then(data => {
        //Type the new email in the search box
        mailinatorHomeP.search_box(data.email);

        cy.wait(10000);
        //Click on the first email receieved in the inbox
        inboxP.received_mail();

        //Click on the authentication completed link inside the iframe 
        cy.switchToIframe(messagePaneP.iframe(), messagePaneP.authentication_completed_link()).as('auth_completed');
        cy.get('@auth_completed', {
            timeout: 20000
        }).find(messagePaneP.authentication_completed_link()).invoke('removeAttr', 'target').click();
        cy.wait(5000);

        //Click on OK button of the registration completed popup
        cy.switchToIframe(messagePaneP.iframe(), messagePaneP.registration_completed_OK_btn()).as('reg_completed');
        cy.get('@reg_completed', {
            timeout: 20000
        }).find(messagePaneP.registration_completed_OK_btn()).click();
        cy.wait(3000);

        //Click on Exit without confirmation button
        cy.switchToIframe(messagePaneP.iframe(), messagePaneP.exit_without_confirmation_btn()).as('exit_without_confirmation');
        cy.get('@exit_without_confirmation', {
            timeout: 20000
        }).find(messagePaneP.exit_without_confirmation_btn()).click();
        cy.wait(2000);
    })
}