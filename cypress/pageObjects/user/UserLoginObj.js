import UserHomePage from '../../page/user/UserHomePage'
import UserLoginPage from '../../page/user/UserLoginPage'
import UserHeader from '../../page/user/UserHeader'
import UserRegistrationHomePage from '../../page/user/UserRegistrationHomePage'
import * as userApiObj from '../../pageObjects/user/UserApiObj'

const userLoginP = new UserLoginPage()
const userHomeP = new UserHomePage();
const userHeaderP = new UserHeader();
const userRegistrationHomeP = new UserRegistrationHomePage();

//! File Paths
const userRegisterDetailsFixtures = 'cypress/fixtures/user/UserRegisterDetails.json'
const defaultUserLoginDetails = 'cypress/TestData/user/DefaultUserLoginDetails.json'
const userRegisterDetailsTestData = 'cypress/TestData/user/UserRegisterDetails.json'


export function visitCurrentUserUrl() {
    return cy.visit(Cypress.env(Cypress.env(Cypress.env('currentURL')).user).url).url().should('contain', '/login');;
}

//* Login the user from json file of fixtures if present
//* If not login using defaultUserDetails json file present in the TestData/Users folder
export function NEW_user_login() {
    cy.checkFileExists(userRegisterDetailsFixtures).then(check => {
        if (check) {
            cy.log('The file exists');
            cy.readFile(userRegisterDetailsFixtures).then(data => {
                login(data);
            })
        } else {
            cy.log('There is no fixtures file for userRegisters. Login with default data in the Users/TestData folder');
            cy.checkFileExists(defaultUserLoginDetails).then(check => {
                if (check) {
                    cy.readFile(defaultUserLoginDetails).then(data => {
                        login(data);
                    })
                }
            })
        }
        cy.wait(1500);
    })
}

function login(parameter) {
    userLoginP.username(parameter.email);
    userLoginP.password(parameter.password);
    cy.server()
    cy.route({
        url: 'https://dev-bloom.ekbana.info/job_seeker_api/v1/oauth2/token',
        method: 'POST'

    }).as('userToken')
    //Click on login button
    userLoginP.login_btn();
    //Store the access_token inside the fixtures
    cy.wait('@userToken').then(reponse => {
        cy.log(reponse.responseBody.access_token);
        cy.writeFile('cypress/fixtures/user/UserToken.json', {
            "access_token": `Bearer ${reponse.responseBody.access_token}`
        })
    })
}

export function check_full_name() {

    userApiObj.get_user_profile_from_API().then(response => {
        const actualFullName = `${response.data.last_name} ${response.data.full_name}`
        userHomeP.grab_current_full_name().then(current => {
            assert.deepEqual(current, actualFullName, 'Validate if the fullname is properly diplayed in the homepage or not');
            cy.wait(1500);
        })
    })
}

//Logout the user clicking on the logout icon at the header
export function logout_user() {
    cy.wait(1500);
    userHeaderP.logout_icon();
}

//Login previously registered user from the active link of the company registered
export function OLD_user_login() {

    //Click on login link
    userRegistrationHomeP.login_link();
}