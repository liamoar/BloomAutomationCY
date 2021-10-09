import * as adminLoginObj from '../../pageObjects/admin/AdminLoginObj'
import * as companyUserObj from '../../pageObjects/admin/CompanyUsersObj'
import * as adminMailinatorObj from '../../pageObjects/admin/AdminMailinatorObj'
import * as companyManagementObj from '../../pageObjects/admin/CompanyManagementObj'

describe('Company Users module', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce("connect.sid");
        cy.wait(1500);
    })

    afterEach(() => {
        cy.clearCookies();
    });

    it('To validate if the admin can add a new company user(Client)', () => {
        adminLoginObj.admin_url_visit_and_login();
        companyManagementObj.translate_to_english();
        companyUserObj.go_to_company_users_module();
        //Register New Company user from company User module
        companyUserObj.create_new_company_user();
    });

    it('Visit mailinator site and grab the Client registration URL', () => {
        cy.visit('https://mailinator.com');
        //Click on authentication completed link the inbox of the mail
        adminMailinatorObj.verify_new_user_from_mail();
    })
});