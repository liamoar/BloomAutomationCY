import * as clientLoginObj from '../../pageObjects/client/ClientLoginObj'
import * as clientChangePasswordObj from '../../pageObjects/client/ClientChangePasswordObj'

describe('Client setting page', () => {
    before(() => {
        clientLoginObj.visitCurrentClientURL();
        clientLoginObj.login_client();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('To validate if the client can change their current password', () => {
        clientChangePasswordObj.validate_change_client_password();
    });

});