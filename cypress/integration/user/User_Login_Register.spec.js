import * as userRegisterObj from '../../pageObjects/user/UserRegisterObj'
import * as mailinatorObj from '../../pageObjects/user/MailinatorObj'
import * as userLoginObj from '../../pageObjects/user/UserLoginObj'

describe('User registration and login', () => {

    beforeEach(() => {
        cy.wait(1500);
    })

    after(() => {
        cy.clearLocalStorage();
    });

    if (Cypress.env('userRegister')) {

        it('Validate if the user can register from the link or not', () => {
            userRegisterObj.visit_available_user_registration_link();
            userRegisterObj.go_to_register_form();
            userRegisterObj.validate_register_new_user();
        });

        it('Verify the new user from visiting mailinator and clicking in on the link', () => {
            cy.visit('https://www.mailinator.com');
            mailinatorObj.verify_new_user_from_email();
        })
    }

    it('Validate the login functionality of newly registered user', () => {
        userLoginObj.visitCurrentUserUrl();
        userLoginObj.NEW_user_login();
        userLoginObj.check_full_name();
    });

    it('To validate if the user can logout from their account', () => {
        userLoginObj.logout_user();
    })

    it('To validate if the old user is able to login from the active link of a company registered', () => {
        userRegisterObj.visit_available_user_registration_link();
        userLoginObj.OLD_user_login()
    })

});