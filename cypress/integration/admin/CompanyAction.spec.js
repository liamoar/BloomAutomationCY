import * as adminLoginObj from '../../pageObjects/admin/AdminLoginObj'
import * as companyManagementObj from '../../pageObjects/admin/CompanyManagementObj'

describe('Company Action Suite', () => {

    before(() => {
        //Visit the current url and login
        adminLoginObj.admin_url_visit_and_login();
        //Translate language to english
        companyManagementObj.translate_to_english();
        //Go to company management
        companyManagementObj.go_to_company_management();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce("connect.sid");
        cy.wait(1500);
    });

    after(() => {
        cy.clearCookies();
    })

    it('To validate if the admin can search the company users of a particular company', () => {
        companyManagementObj.search_company_users();
    })

    it.skip('To validate if the admin can search jobseeker of a given company', () => {
        companyManagementObj.go_to_company_management();
        companyManagementObj.search_jobseekers();
    })

    it('To validate if the admin can edit the company details', () => {
        companyManagementObj.go_to_company_management();
        companyManagementObj.edit_company_details();
    })

    it.skip('To validate if admin can like a user(jobseeker) of a company', () => {
        companyManagementObj.like_jobseeker();
    })

    it('To validate if the admin can change the registration status of a jobseeker', () => {
        companyManagementObj.change_registration_status();
    })

    it('To validate if the admin can change the background color of a jobseeker.', () => {
        companyManagementObj.change_background_color();
    })

    it.skip('To validate if the admin can add a memo of the user', () => {
        companyManagementObj.add_memo();
    })

    it.skip('To validate if the jobseeker profile is valid or not from admin portal', () => {
        companyManagementObj.verify_jobseeker_profile();
    })
});