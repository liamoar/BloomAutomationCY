import * as clientNewRegisterObj from '../../pageObjects/client/ClientNewRegisterObj'

describe('Check Company Users module feature of the admin portal ', () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.wait(1500);
    });

    afterEach(() => {
        cy.saveLocalStorage();
    })

    it('To validate if new Company users can be added in the existing company', () => {
        clientNewRegisterObj.verify_new_client_registration();
    });

    it("To validate the client's profile is valid or not", () => {
        clientNewRegisterObj.validate_new_client_profile();
    })
});