import UserHomePage from '../../page/user/UserHomePage'
import * as userApiObj from '../user/UserApiObj'
const userHomeP = new UserHomePage()
const faker = require('faker')

//! File paths
const userRegisterDetailsFixtures = 'cypress/fixtures/user/UserRegisterDetails.json'
const userRegisterDetailsTestData = 'cypress/TestData/user/UserRegisterDetails.json'

export function edit_work_history() {
    //Grab the API response
    userApiObj.get_user_profile_from_API().then(response => {
        cy.log(response.data);

        //Click on edit icon
        userHomeP.work_history_edit_icon();

        //Change the details 
        //* random texts
        const randomRecentlyRegisteredCompanyName = faker.lorem.word();
        const randomJobOfferText = faker.lorem.sentence()
        const randomChangeCareerReasonText = faker.lorem.sentence()

        userHomeP.recent_registered_company_name(randomRecentlyRegisteredCompanyName);
        userHomeP.years_of_enrollment();

        //Change the dropdown value to a random one
        userHomeP.grab_recent_occupation_major_values(response.data.latest_occupation_main_title).then(options => {
            userHomeP.recent_occupation_major(options);
        })
        userHomeP.grab_recent_occupation_middle_values(response.data.latest_occupation_sub_title).then(options => {
            userHomeP.recent_occupation_middle(options);
        })

        userHomeP.grab_employment_form_values(response.data.employment_status).then(options => {
            userHomeP.employment_form(options);
        })

        userHomeP.grab_position_values(response.data.position).then(options => {
            userHomeP.position(options)
        })

        userHomeP.grab_english_ability_values(response.data.english_skills).then(options => {
            userHomeP.english_ability(options)
        })
        userHomeP.recent_income();
        userHomeP.companies_experienced();

        userHomeP.job_offer(randomJobOfferText);
        userHomeP.change_career_reason(randomChangeCareerReasonText);

        //Save the  job offer into specified files
        cy.checkFileExists(userRegisterDetailsFixtures).then(check => {
            if (check) {
                cy.readFile(userRegisterDetailsFixtures).then(data => {
                    data.job_offer = randomJobOfferText;
                    cy.writeFile(userRegisterDetailsFixtures, data);
                })
            } else {
                cy.readFile(userRegisterDetailsTestData).then(data => {
                    data.job_offer = randomJobOfferText;
                    cy.writeFile(userRegisterDetailsTestData, data);
                })
            }
        })

        cy.wait(1000);
        //*Validate if the changed values are saved or not
        userHomeP.new_registered_company_name_value().then(newCompany => {
            assert.notDeepEqual(newCompany, response.data.company_name, 'Validate if the company value is changed or not')
            cy.wait(1000);
        })

        userHomeP.new_years_of_enrollment_value().then(newYears => {
            assert.notDeepEqual(newYears, response.data.years_of_attendance, 'Validate if the years of enrollment is changed or not');
            cy.wait(1000);
        })

        userHomeP.new_recent_occupation_major_value().then(newOccupationMajor => {
            assert.notDeepEqual(newOccupationMajor, response.data.latest_occupation_main_title, 'Validate if the recent major occupation is changed or not');
            cy.wait(1000);
        })

        userHomeP.new_recent_occupation_middle_value().then(newOccupationMiddle => {
            assert.notDeepEqual(newOccupationMiddle, response.data.latest_occupation_sub_title, 'Validate if the recent middle occupation is changed or not')
            cy.wait(1000);
        })

        userHomeP.new_employment_form_value().then(newEmployment => {
            assert.notDeepEqual(newEmployment, response.data.employment_status, 'Validate if the employment form has changed or not')
            cy.wait(1000);
        })
        userHomeP.new_position_value().then(newPosition => {
            assert.notDeepEqual(newPosition, response.data.position, 'Validate if the position has changed or not');
            cy.wait(1000);
        })

        userHomeP.new_english_ability_value().then(newAbility => {
            assert.notDeepEqual(newAbility, response.data.english_skills, 'Validate if the english ability has changed or not');
            cy.wait(1000);
        })

        userHomeP.new_recent_income_value().then(newIncome => {
            assert.notDeepEqual(newIncome, response.data.last_year_income, 'Validate if the income has changed or not')
            cy.wait(1000);
        })

        userHomeP.new_experienced_companies_value().then(newExperiencedCompanies => {
            assert.notDeepEqual(newExperiencedCompanies, response.data.number_of_experience_companies, 'Validate if the experienced companies has changed or not')
            cy.wait(1000);
        })

        userHomeP.new_job_offer_value().then(newOffer => {
            assert.notDeepEqual(newOffer, response.data.job_summary, 'Validate if the offer has changed or not')
            cy.wait(1000);
        })

        userHomeP.new_change_career_reason_value().then(newReason => {
            assert.notDeepEqual(newReason, response.data.career_change_reason, 'Validate if the career reason has changed or not');
            cy.wait(1000);
        })

        //Click on save icon
        userHomeP.work_history_save_icon();

        //Validate the popup
        userHomeP.i_saved_it_text();
        userHomeP.popup_OK_button();
    })
}