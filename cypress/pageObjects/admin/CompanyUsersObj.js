import CompanyUserCreatePage from "../../page/admin/CompanyUserCreatePage";
import CompanyUsersPage from "../../page/admin/CompanyUsersPage";
import AdminSideBar from '../../page/admin/AdminSideBar'
import * as utils from '../../utils/client/client_loginRegisterController'
const companyUserCreateP = new CompanyUserCreatePage()
const companyUserP = new CompanyUsersPage()
const adminSideP = new AdminSideBar();
const faker = require('faker')

//! File Paths
const fixturesData = 'cypress/fixtures/client/ClientRegisterDetails.json'
const registerNewClientData = 'cypress/fixtures/client/RegisterNewClient.json'
const clientTestData = 'cypress/TestData/client/ClientRegisterDetails.json'

//Admin adds new company user
export function create_new_company_user() {

    //Click on add new button
    companyUserP.add_new_btn();

    //Register new client
    if (utils.get_new_client_data()) {
        cy.checkFileExists(fixturesData).then(check => {
            cy.checkFileExists(registerNewClientData).then(newCheck => {
                if (check && newCheck) {
                    cy.readFile(registerNewClientData).then(new_data => {
                        cy.readFile(fixturesData).then(data => {
                            debugger;
                            //Grab the company name from the json file of fixtureData constant 
                            cy.log(data.companyName);
                            //Select current company in the fixtures of fixtureData constant
                            cy.get('#company').select(data.companyName)
                            //Enter Credentials of new users from registerNewClientData constant
                            get_current_company_and_enter_credentials(new_data.userName, new_data.email);
                        })
                    })
                } else {
                    cy.log("There are no 'registerClientDetails' and registerNewClient json files present");
                }
            })
        })
    } else {
        cy.checkFileExists(clientTestData).then(check => {
            if (check) {
                cy.readFile(clientTestData).then(data => {
                    cy.log(data.companyName);
                    cy.select(data.companyName);
                    get_current_company_and_enter_credentials(data.username, data.email);
                })
            }
        })
    }
}

export function create_existing_company_user() {
    cy.checkFileExists('cypress/fixtures/client/registerClientDetails.json').then(check => {
        cy.log(check);
    })
}

function get_current_company_and_enter_credentials(fullName, emailId) {
    companyUserCreateP.full_name(fullName);
    companyUserCreateP.email_address(emailId);
    //Don't give admin access to the user
    dont_give_admin_access();
    companyUserCreateP.add_btn();
}

// Set admin access to 'No'
function dont_give_admin_access() {
    companyUserCreateP.admin_btn_no();
}

export function go_to_company_users_module() {
    //Click on company module in the sidebar
    adminSideP.company_module();
    //Click on company users in the sidebar
    adminSideP.company_users();
}