import UserPreviewPage from "../../page/user/UserPreviewPage";
import UserRegisterPage from "../../page/user/UserRegisterPage"
import UserRegistrationHomePage from "../../page/user/UserRegistrationHomePage"
import * as utils from '../../utils/user/user_loginRegisterController'
const userRegistrationHomeP = new UserRegistrationHomePage()
const userRegisterP = new UserRegisterPage();
const userPreviewP = new UserPreviewPage()

//! File paths
const userRegisterPath = 'cypress/fixtures/user/registrationLink.json'
const clientRegisterDetailsFixtures = 'cypress/fixtures/client/ClientRegisterDetails.json'
const clientRegisterDetailsTestData = 'cypress/TestData/client/ClientRegisterDetails.json'
const userRegisterDetailsFixtures = 'cypress/fixtures/user/UserRegisterDetails.json'
const userRegisterDetailsTestData = 'cypress/TestData/user/UserRegisterDetails.json'


export function visit_available_user_registration_link() {
    cy.checkFileExists(userRegisterPath).then(file => {
        if (file) {
            cy.log(file);
            cy.readFile(userRegisterPath).then(data => {
                cy.log(data.userRegistrationLink);
                cy.visit(data.userRegistrationLink).url().should('contain', '/registration').wait(500);
                //Check if the heading is correct or not
                validate_user_registration_heading();
            })
        } else {
            cy.log('The registerUserDetails fixtures file does not exist or is not created');
            cy.visit(`${Cypress.env(Cypress.env('currentURL').user.url)}/registration/Michael`).url().should('contain', 'registration/Michael');
        }
    })
}

function validate_user_registration_heading() {
    //Compares the heading of company is valid from the fixtures 
    if (Cypress.env('faker')) {
        compare_registration_heading(clientRegisterDetailsFixtures)
    }
    //Compares the heading of the company is valid from the TestData 
    else {
        compare_registration_heading(clientRegisterDetailsTestData);
    }
}

function compare_registration_heading(filePath) {
    cy.checkFileExists(filePath).then(check => {
        if (check) {
            cy.log(check);
            //Check if the heading contains correct registration page title or not
            userRegistrationHomeP.registration_heading().then(heading => {
                cy.log(heading);
                cy.readFile(filePath).then(client => {
                    cy.log(client.registrationPageTitle);
                    expect(heading).to.contain(client.registrationPageTitle);
                    cy.wait(500);
                })
            })
        }
    })
}

export function go_to_register_form() {
    userRegistrationHomeP.proceed_to_registration_button();
    //Validate the current heading of the page
    userRegisterP.check_heading();
}

export function validate_register_new_user() {

    if (utils.get_user_register_data()) {
        //Register new user using fake data
        register_new_user(userRegisterDetailsFixtures);
    } else {
        cy.log('The faker is false in the environment. Entering data from TestData folder');
        //Register new user from data provided in 'TestData/user' folder
        register_new_user(userRegisterDetailsTestData);
    }
}

function register_new_user(filePath) {
    cy.readFile(filePath).then(data => {

        userRegisterP.last_name(data.lastName);
        userRegisterP.first_name(data.firstName);
        userRegisterP.sei(data.SEI);
        userRegisterP.mei(data.MEI);
        userRegisterP.gender();
        userRegisterP.DOB_year(data.DOB.year);
        userRegisterP.DOB_month(data.DOB.month);
        userRegisterP.DOB_day(data.DOB.day);
        userRegisterP.residence('5bb5c6c48fb99a2ac199339d')
        userRegisterP.email_address(data.email);
        userRegisterP.password(data.password);
        userRegisterP.con_password(data.password);
        userRegisterP.final_education('5bb5c6c48fb99a2ac19933d3');
        userRegisterP.graduation_school_name(data.graduation_school_name);
        userRegisterP.graduation_faculty_name(data.graduation_faculty_name);
        userRegisterP.graduation_year(data.graduation_year);
        userRegisterP.most_recently_registered_company_name(data.most_recently_registered_company_name);
        userRegisterP.years_of_enrollment(data.years_of_enrollment);
        userRegisterP.recent_occupation_major('5bb5c6c48fb99a2ac1993406');
        userRegisterP.recent_occupation_middle('5bb5c6c48fb99a2ac1993411');
        userRegisterP.employment_from('5bb5c6c48fb99a2ac1993399');
        userRegisterP.position('5bb5c6c48fb99a2ac1993397');
        userRegisterP.english_ability('5bb5c6c48fb99a2ac19933cf');
        userRegisterP.recent_income(data.recent_income);
        userRegisterP.experienced_companies(data.experienced_companies);
        userRegisterP.job_offer(data.job_offer);
        userRegisterP.concerns(data.concerns);
        userRegisterP.current_intentions();
        userRegisterP.status_of_work_preparation();

        //* Click on Registration button on register page
        userRegisterP.registration_btn();

        //Validate the current heading of the page
        userPreviewP.check_heading();

        //* Click on Registration button again on preview page
        userPreviewP.registration_btn()
    })
}