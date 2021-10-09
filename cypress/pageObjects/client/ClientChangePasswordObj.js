import ClientSettingPage from '../../page/client/ClientSettingPage'
import ClientHeader from '../../page/client/ClientHeader'
const clientSettingP = new ClientSettingPage()
const clientHeaderP = new ClientHeader()

//! File paths
const clientRegisterDetailsFixtures = 'cypress/fixtures/client/ClientRegisterDetails.json'
const clientRegisterDetailsTestData = 'cypress/TestData/client/ClientRegisterDetails.json'

const faker = require('faker')
const new_password = `Reetik@${faker.random.number({
    min: 1,
    max: 500
})}`

export function validate_change_client_password() {

    //Click on configuration/setting icon at the header
    clientHeaderP.setting_icon();
    //Check if the change password heading is present or not
    clientSettingP.check_change_password_heading();
    //Check if the registerDetails fixtures is present or not
    cy.checkFileExists(clientRegisterDetailsFixtures).then(check => {
        if (check) {
            change_client_password(clientRegisterDetailsFixtures)
        } else {
            change_client_password(clientRegisterDetailsTestData)
        }
    })
}

function change_client_password(filePath) {

    cy.readFile(filePath).then(data => {
        //Type current password
        clientSettingP.current_password(data.password);
        //Type new password
        clientSettingP.new_password(new_password);
        clientSettingP.confirm_new_password(new_password);

        // Click on reset button
        clientSettingP.reset_btn();
        // Check the alert message text
        clientSettingP.alert_message_text();

        //Replace only password in the fixtures with new password
        data.password = new_password;

        //Writing 'new password' into the 'password' key of the JSON file
        cy.writeFile(filePath, data);
    })
}