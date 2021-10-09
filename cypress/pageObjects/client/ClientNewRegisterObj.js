import ClientPasswordSettingPage from '../../page/client/ClientPasswordSettingPage'
import * as clientLoginObj from '../../pageObjects/client/ClientLoginObj'
import ClientHeader from '../../page/client/ClientHeader'

const clientHeaderP = new ClientHeader();
const clientPasswordSettingP = new ClientPasswordSettingPage();

//! File Paths
const registerNewClientData = 'cypress/fixtures/client/RegisterNewClient.json'

export function verify_new_client_registration() {

    cy.checkFileExists(registerNewClientData).then(check => {
        if (check) {
            cy.readFile(registerNewClientData).then(data => {
                cy.log(data);
                cy.visit(data.client_URL).url().should('contain', '/set');
                //Fill the form and register the client
                register_new_client(data);
            })
        } else {
            cy.log('The registerNewClient json file does not exist!!!');
        }
    })
}

function register_new_client(data) {

    clientPasswordSettingP.check_header();
    //Enter the email id
    clientPasswordSettingP.email_address(data.email);
    //Enter the password
    clientPasswordSettingP.password(data.password);
    //Enter the confirm password
    clientPasswordSettingP.con_password(data.password);
    //Click on registration button
    clientPasswordSettingP.registration_btn();
    //Check if the success alert is visible or not 
    //todo: ASK the text inside the success alert for text validation
    // clientPasswordSettingP.check_alert_visibility();
}


//Check if the newly registered user is valid or not
export function validate_new_client_profile() {

    //Enter the newly registered user credentials
    cy.checkFileExists(registerNewClientData).then(check => {
        if (check) {
            cy.readFile(registerNewClientData).then(data => {
                cy.log(data.email);
                //Login new client
                clientLoginObj.login_new_client();
                //Check if the user is valid or not
                cy.wait(1000);
                clientHeaderP.grab_client_userName().then(actualUsername => {
                    assert.deepEqual(data.userName, actualUsername, 'Validate if the username shown in the header is same as that in the json file or not');
                    cy.wait(1000);
                })

                //Check if the header 'li' is equal to 5 or not (Will be equal to 6 when there is 'Add User' li present)
                clientHeaderP.grab_header_li_count();
            })
        } else {
            cy.log('The registerNewClientData json file does not exist');
        }
    })
}