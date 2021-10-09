import * as clientLoginObj from '../../pageObjects/client/ClientLoginObj'
import * as clientApplicantObj from '../../pageObjects/client/ClientApplicantObj'
describe('Applicant page test cases', () => {

    before(() => {
        clientLoginObj.visitCurrentClientURL();
        clientLoginObj.login_client();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.wait(1500);
    });

    afterEach(() => {
        cy.saveLocalStorage();
        cy.visit(clientLoginObj.getCurrentURL() + '/applicant');
    });

    it('To validate if the user profile is properly displayed if registered from that company', () => {
        clientApplicantObj.validate_client_name();
        clientApplicantObj.validate_user_profile();
    });

    it('To validate if the liked users are displayed or not', () => {
        clientApplicantObj.validate_liked_users();

    });

    it('To validate if the client can add a memo of user', () => {
        clientApplicantObj.validate_add_user_memo();
    })

    it('To validate if the client can change the registration status of the user', () => {
        clientApplicantObj.validate_change_registration_status();
    });

    it('To validate if the client can change the background color of any particular user', () => {
        clientApplicantObj.validate_change_background_color()
    })

    it('To validate if the client can change the registration status of all the avaliable users', () => {
        clientApplicantObj.validate_change_registration_status_of_all_users();
    });

    it('To validate if the client can save a search condition', () => {
        clientApplicantObj.validate_save_search_condition();
    });

    it.skip('To validate if the client can re-arrange the Age', () => {
        clientApplicantObj.check_age_sorting();
    })

    it('To validate if the client can logout from their account', () => {
        clientLoginObj.logout_client();
    })
});