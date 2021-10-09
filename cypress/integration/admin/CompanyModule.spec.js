import * as adminLoginObj from '../../pageObjects/admin/AdminLoginObj'
import * as companyManagementObj from '../../pageObjects/admin/CompanyManagementObj'
import * as companyOrderObj from '../../pageObjects/admin/CompanyOrderObj'
describe('Add new Company', () => {

    before(() => {
        //Visit the current url and login
        adminLoginObj.admin_url_visit_and_login();
        //Translate the language to English
        companyManagementObj.translate_to_english();
        companyManagementObj.go_to_company_management();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce("connect.sid");
        cy.wait(1500);
    });

    after(() => {
        cy.clearCookies();
    })

    //When new client should be registered
    if (Cypress.env('clientRegister')) {
        it('To Validate if the admin can register new company', () => {
            //Register new company
            companyManagementObj.validate_new_company_registration();
        });
    }
    //When new client need not be registered
    else {
        it('Grab the link text of already registerd company to provide to the user module', () => {
            companyManagementObj.search_old_client();
        })
    }

    it('To validate if the admin is able to change the company order', () => {
        companyOrderObj.change_client_order();
    });

    //!! Note: Changing the status of client to blocked should always be done at the END!!
    it('Change the status to blocked of a company', () => {
        companyManagementObj.go_to_company_management();
        companyManagementObj.select_blocked_status();
        cy.clearCookies();
    })

    it('Validate if visiting of the blocked URL results to 404 error or not', () => {
        companyManagementObj.visit_blocked_url();
    })

    it('Change the status of blocked company to active', () => {
        //Visit admin url and relogin
        adminLoginObj.admin_url_visit_and_login();
        companyManagementObj.translate_to_english();
        companyManagementObj.go_to_company_management();
        companyManagementObj.reselect_active_status();
    })

    it('To validate if the admin can logout from their account', () => {
        adminLoginObj.admin_logout();
    })

});