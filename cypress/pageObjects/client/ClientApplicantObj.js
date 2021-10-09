import ClientHeader from '../../page/client/ClientHeader'
import ClientApplicantPage from '../../page/client/ClientApplicantPage'
import ClientSearchTemplatePage from '../../page/client/ClientSearchTemplatePage'
import UserHomePage from '../../page/user/UserHomePage'
const clientHeaderP = new ClientHeader();
const clientApplicantP = new ClientApplicantPage()
const clientSearchTemplateP = new ClientSearchTemplatePage();
const faker = require('faker')
const userHomeP = new UserHomePage();
import * as clientApiObj from '../client/ClientApiObj'

//! File Paths
const clientRegisterDetailsFixtures = 'cypress/fixtures/client/ClientRegisterDetails.json'
const clientRegisterDetailsTestData = 'cypress/TestData/client/ClientRegisterDetails.json'
const userRegisterDetailsFixtures = 'cypress/fixtures/user/UserRegisterDetails.json'
const userRegisterDetailsTestData = 'cypress/TestData/user/UserRegisterDetails.json'


export function validate_client_name() {

    //Grab the current visibile client name in the header
    clientHeaderP.client_name().then(client_name => {
        debugger;
        cy.log(client_name);
        cy.checkFileExists(clientRegisterDetailsFixtures).then(check => {
            if (check) {
                cy.readFile(clientRegisterDetailsFixtures).then(data => {
                    debugger;
                    cy.log(data.companyName);
                    //Validate the current client name with the companyName in the fixtures
                    assert.deepEqual(data.companyName, client_name, 'Validate if the client name is properly displayed in the header or not');
                })
            } else {
                cy.readFile(clientRegisterDetailsTestData).then(data => {
                    cy.log(data.companyName);
                    //Validate the current client name with the companyName in the testdata folder
                    assert.deepEqual(data.companyName, client_name, 'Validate if the client name is properly displayed in the header or not');
                })
            }
        })
    })
}

export function validate_user_profile() {

    //Search user
    search_user_from_email();
    cy.wait(1000);
    //Check if the search results are found or not for the given email
    clientApplicantP.get_current_table_row_count().then(rowCount => {
        cy.log(rowCount);
        if (rowCount > 1) {
            //Click on the user detail
            clientApplicantP.click_matching_user_detail_table();
            cy.checkFileExists(userRegisterDetailsFixtures).then(check => {
                if (check) {
                    //Validate the data from the fixtures of users
                    check_current_VS_actual_user_details(userRegisterDetailsFixtures)
                    validate_liked_user_from_profile_popup()
                    validate_registration_status_from_user_profile_popup();
                    validate_memo_from_user_profile_popup();
                } else {
                    //Validate the daat from the test data of users
                    check_current_VS_actual_user_details(userRegisterDetailsTestData)
                    validate_liked_user_from_profile_popup()
                    validate_registration_status_from_user_profile_popup();
                    validate_memo_from_user_profile_popup()
                }
            })
        } else {
            cy.log('There are NO search results found. Check your email again!!!!');
        }
    })
}

//Validate like functionality from within the user profile
function validate_liked_user_from_profile_popup() {
    clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(oldProfile => {
        if (!oldProfile.isFavorite) {
            //Like the user profile
            clientApplicantP.like_user_from_profile_popup();
            cy.wait(2000);
            //Validate the liked user from the api
            clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(newProfile => {
                assert.notDeepEqual(newProfile.isFavorite, oldProfile.isFavorite, 'Validate if the user has been liked or not');
            })
            //Unlike the user profile for a fresh start
            clientApplicantP.unlike_user_from_profile_popup();
        } else {
            //Unlike the user profile
            clientApplicantP.unlike_user_from_profile_popup();
            cy.wait(2000);
            //Validate the user from the API
            clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(newProfile => {
                assert.notDeepEqual(newProfile.isFavorite, oldProfile.isFavorite, 'Validate if the user has been unliked or not');
            })
        }
    })
}

//Validate registration status functionality from the user profile
function validate_registration_status_from_user_profile_popup() {
    clientApplicantP.current_registration_status_text_profile_popup().then(currentStatus => {
        clientApplicantP.grab_unique_user_registration_status(currentStatus).then(uniqueStatus => {
            //Click on registration status button
            clientApplicantP.click_registration_status_button();
            //Select random unique registration status
            clientApplicantP.select_random_registration_status_for_specific_user(uniqueStatus);
        });
        clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(profile => {
            cy.log(profile.status);
            assert.notDeepEqual(profile.status, currentStatus, 'Validate if the registration status has changed or not');
        })
    })
}

//Validate if the client can add memo from the profile popup or not
function validate_memo_from_user_profile_popup() {
    //Click on memo icon
    clientApplicantP.click_memo_icon_profile_header();
    //Validate the memo header from the fixtures
    cy.checkFileExists(userRegisterDetailsFixtures).then(check => {
        if (check) {
            cy.readFile(userRegisterDetailsFixtures).then(data => {
                clientApplicantP.memo_header_text_profile_popup(`${data.lastName} ${data.firstName}`);
            })
        }
    })
    const memo = faker.lorem.sentence();
    clientApplicantP.type_memo_profile_popup(memo);
    //Click on save button
    clientApplicantP.click_memo_save_btn_profile_popup();
    //Validate if the memo is saved from the API
    clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(response => {
        cy.log(response.memo);
        assert.deepEqual(memo, response.memo, 'Validate if the memo is valid or not');
        cy.wait(1000);
    })
}

function search_user_from_email() {
    //Click search button at the mid header
    clientApplicantP.search_btn_header();
    //Type email in the text field
    cy.checkFileExists(userRegisterDetailsFixtures).then(check => {
        if (check) {
            cy.readFile(userRegisterDetailsFixtures).then(data => {
                cy.wait(1000);
                clientApplicantP.free_search_textField(data.email);
                clientApplicantP.search_btn_popup();
            })
        } else {
            cy.readFile(userRegisterDetailsTestData).then(data => {
                cy.wait(1000);
                clientApplicantP.free_search_textField(data.email);
                clientApplicantP.search_btn_popup();
            })
        }
    })
}


function check_current_VS_actual_user_details(filePath) {
    clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(response => {
        cy.log(response);
        clientApplicantP.current_fullName_text().then(currentFullName => {
            cy.wait(1000);
            assert.deepEqual(currentFullName, `${response.last_name} ${response.name}`, 'Validate if the full name is correct or not');
        })
        clientApplicantP.current_most_recently_registered_company_name_text().then(currentRegisteredCompany => {
            cy.wait(1000);
            assert.deepEqual(currentRegisteredCompany, response.employment.lastCompany, 'Validate if the most recently registered company name is correct or not');
        })

        clientApplicantP.current_concerns_text().then(currentConcerns => {
            cy.wait(1000)
            assert.deepEqual(currentConcerns, response.employment.career_change_reason, 'Validate if the concerns is correct or not')
        })

        //Validation from the json file since these data are not found in API responses
        cy.readFile(filePath).then(data => {
            clientApplicantP.current_email_text().then(currentEmail => {
                cy.wait(1000);
                assert.deepEqual(currentEmail, data.email, 'Validate if the email is correct or not');
            })
            clientApplicantP.current_job_offer_text().then(currentJobOffer => {
                cy.wait(1000)
                assert.deepEqual(currentJobOffer, data.job_offer, 'Validate if the job offer matches or not')
            })
        })
    })
}


export function validate_liked_users() {

    /**NOTE
     * If there are NO liked users then the 'td' count inside the 'tbody' is only 1.
     * If there is one liked user then the 'td' count inside the 'tbody' is 13 and so on.
     * Use this for validation.
     */

    //Click on like icon at the mid header
    clientApplicantP.like_icon_header();

    //Like at least one user if not liked and check if it is shown after clicking like icon again
    clientApplicantP.currently_liked_users_count().then(tdCount => {
        if (tdCount > 1 && tdCount <= 13) {
            cy.log('There is ONE liked user present');
            //Remove that user from liked section for future validations.
            clientApplicantP.unlike_user_icon_NOTE();
        } else if (tdCount > 13) {
            cy.log('There are more than ONE liked user present!!! Remove it and make it to one for future automations!!');
            clientApplicantP.unlike_user_icon_NOTE();
        } else {
            cy.log('There are no liked users curretly!!');
            clientApplicantP.no_registrants_found();
            //Click on unlike icon at the mid header
            clientApplicantP.unlike_icon_header();
            //Like one user by searching first
            search_user_from_email();
            //Get the response of specific user profile
            clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(firstResponse => {

                cy.log(firstResponse.isFavorite);
                //Click like icon inside the NOTE column
                clientApplicantP.like_user_icon_NOTE();
                //Grab the id of the current user
                cy.log(firstResponse.id);

                cy.wait(2000);
                //*Validate if the user has been liked or not from the API
                clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(secondResponse => {
                    cy.log(secondResponse.isFavorite);
                    assert.notDeepEqual(firstResponse.isFavorite, secondResponse.isFavorite, 'Validate if the isFavorite key has changed or not when user profile is liked')
                })

                //Click on search clear button
                clientApplicantP.search_clear_btn();
                //Click on like icon at the mid header
                clientApplicantP.like_icon_header();
                //validate if the td has increased from 1 or not
                clientApplicantP.currently_liked_users_count().should('be.greaterThan', 1);
                cy.wait(2000);
                //Unlike the user again for a fresh start.
                clientApplicantP.unlike_user_icon_NOTE();
            })
        }
    })
    //Click on unlike icon at the mid header
    clientApplicantP.unlike_icon_header();
}


export function validate_add_user_memo() {

    //? The class 'modal fade show d-block' is unique so take it for further selectors
    //Search user
    search_user_from_email();
    //Click on memo icon inside the note column
    clientApplicantP.user_memo_icon_NOTE();
    //Validate the userName shown in the memo popup
    cy.checkFileExists(userRegisterDetailsFixtures).then(check => {
        if (check) {
            cy.readFile(userRegisterDetailsFixtures).then(data => {
                clientApplicantP.memo_header_text(`${data.lastName} ${data.firstName}`)
            })
        } else {
            cy.readFile(userRegisterDetailsTestData).then(data => {
                clientApplicantP.memo_header_text(`${data.lastName} ${data.firstName}`)
            })
        }
    })

    //Add memo only if it is not added previously
    add_memo_if_empty();

}

function add_memo_if_empty() {

    //Add memo if not added before only, if present don't add it
    clientApplicantP.check_empty_memo_class().then(emptyMemo => {
        cy.log(emptyMemo);
        if (emptyMemo) {
            cy.log('There is NO memo added currently')
            //Typing in the textArea
            const memo = faker.lorem.sentence()
            clientApplicantP.memo_textArea(memo);
            //Click save button
            clientApplicantP.memo_save_btn();
            clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(response => {
                cy.log(response.memo);
                //Validate if the memo saved is valid or not
                assert.deepEqual(memo, response.memo, 'Validate if the memo is valid or not');
                cy.wait(1000);
            })
        } else {
            cy.log('There is ALREADY a memo saved previously');
        }
    })
}

export function validate_change_registration_status() {
    //Search user from email
    search_user_from_email();
    clientApplicantP.current_registration_status_text().then(currentRegistrationStatus => {
        cy.log(currentRegistrationStatus);
        //Check the current registration status from the API
        clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(firstResponse => {
            cy.log(firstResponse.status);
            //Click on registration status button   
            clientApplicantP.click_registration_btn();
            //Select random registration status
            clientApplicantP.grab_registration_status_options(currentRegistrationStatus).then(options => {
                cy.log(options.length);
                debugger;
                //Select random registrations status options except for the currently selected one
                clientApplicantP.select_random_registration_status(options);
                cy.wait(2000);
                //Validate if the registration status has changed or not from UI
                clientApplicantP.new_registration_status_text().then(newRegistrationStatus => {
                    cy.log(newRegistrationStatus);
                    assert.notDeepEqual(newRegistrationStatus, currentRegistrationStatus, 'Validate if the new and old registration status are different or not in UI');
                    cy.wait(2000);
                })
                //Validate if the registration status has changed or not from the API
                clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(secondResponse => {
                    cy.log(secondResponse.status);
                    debugger;
                    assert.notDeepEqual(secondResponse.status, firstResponse.status, 'Validate if the registration status has changed or not from the API');
                })
            })
        })
    })
}


export function validate_change_background_color() {

    search_user_from_email();

    //Grab the current Style attribute value of the tr tag
    clientApplicantP.old_background_color_style_value().then(oldStyleAttribute => {
        //Grab the background color before changing from the API
        clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(firstResponse => {
            //Change the background color of the row
            clientApplicantP.get_current_background_color().then(currentColor => {
                cy.log(currentColor);
                //Click background color change button
                clientApplicantP.background_color_change_btn();
                cy.wait(1000);
                //*Change color based on the current color of the row
                if (currentColor === 'White') {
                    select_new_background_color(currentColor);
                } else if (currentColor === 'Red') {
                    select_new_background_color(currentColor)
                } else if (currentColor === 'Yellow') {
                    select_new_background_color(currentColor)
                } else if (currentColor === 'Blue') {
                    select_new_background_color(currentColor)
                } else {
                    select_new_background_color(currentColor)
                }
            })
            //Validate if the style attribute of the row has changed or not after changing the bg color
            clientApplicantP.new_bavkground_color_style_value().then(newStyleAttribute => {
                assert.notDeepEqual(newStyleAttribute, oldStyleAttribute)
                cy.wait(2000);
            })

            //Validate if the color has changed or not from the API
            clientApiObj.grab_Specific_user_profile_From_Applicant_API().then(secondResponse => {
                cy.log(firstResponse.color, secondResponse.color);
                assert.notDeepEqual(firstResponse.color, secondResponse.color, 'Validate if the bg color has changed or not from the API');
                cy.wait(1000);
            })
        })
    })
}

function select_new_background_color(color) {
    //Select new background color, other than the color that is currently selected
    clientApplicantP.grab_background_color_links(color).then(newColor => {
        cy.log(newColor);
        clientApplicantP.select_new_background_color(newColor);
    })
}

export function validate_change_registration_status_of_all_users() {

    //Click on select all
    clientApplicantP.click_select_all();
    //Validate if the every user profile gets selected/checked when clicking on 'Select All'
    clientApplicantP.find_all_checkboxes_checked_or_not();

    //grab all current status of the users
    clientApiObj.grab_unique_registrant_status_from_applicant_API().then(currentRegistrationStatus => {
        cy.log(currentRegistrationStatus, currentRegistrationStatus.length);

        //Click on status batch update button
        clientApplicantP.status_batch_update_button()

        //Grab unique registration status( UNIQUE => total registration status - previously selected registration status) 
        clientApplicantP.grab_registration_status_options(currentRegistrationStatus).then(uniqueRegistrationStatus => {
            cy.log(uniqueRegistrationStatus, uniqueRegistrationStatus.length);

            //Select unique random registration status from the dropdown 
            clientApplicantP.select_random_unique_registration_status(uniqueRegistrationStatus);

            //Validate if the registration before and after changing is different or not from the API of ALL available users
            const totalCurrentRegistrationStatus = currentRegistrationStatus.length;
            for (let i = 0; i < totalCurrentRegistrationStatus; i++) {
                clientApiObj.grab_unique_registrant_status_from_applicant_API().then(newRegistrationStatus => {
                    assert.notDeepEqual(currentRegistrationStatus[i], newRegistrationStatus[0], 'Validate if the registration status of ALL users are different or not after changing');
                    cy.wait(1000);
                })
            }
        })
    });
}


export function validate_save_search_condition() {
    /* Note: Registration status of all users should be same for this to work properly
             So run the test case above it first anyhow
    */
    const searchConditionName = faker.random.word();
    //Remove search templates
    remove_previous_search_templates();
    //Go back to applicant page
    clientHeaderP.bloom_logo();

    clientApiObj.grab_unique_registrant_status_from_applicant_API().then(uniqueStatus => {
        cy.log(uniqueStatus[0]);

        //Click on 'search clear' button at first if the total search buttons are 2
        clientApplicantP.total_search_btn_counts().then(btnCount => {
            if (btnCount == 2) {
                clientApplicantP.search_clear_btn();
            }
        })
        //Filter and search users
        filter_and_search_users(uniqueStatus[0]);

        //Save search template
        save_search_templates(searchConditionName);

        //Validate if the search template is properly saved or not
        check_recent_search_template_saved_or_not(searchConditionName);

        remove_previous_search_templates();
    })
}


//Delete any initial search condition/Search template if previously set
export function remove_previous_search_templates() {
    //Click on save search conditions icon
    clientHeaderP.search_template_icon();

    //Click on delete button
    clientSearchTemplateP.total_template_count().then(templateCount => {
        debugger;
        if (templateCount > 1) {
            cy.log('There are previously saved search templates');
            debugger
            clientSearchTemplateP.total_delete_btn().then(deleteBtnCount => {
                debugger
                for (let i = 1; i <= deleteBtnCount; i++) {
                    clientSearchTemplateP.delete_btn(i);
                    clientSearchTemplateP.delete_OK_btn();
                }
            })
        }
    })
}

//Filter and search users from the popup
function filter_and_search_users(status) {
    //Click on search button
    clientApplicantP.search_btn_header();
    //Click on Via link
    clientApplicantP.via_link();
    //Select 'VIA own website'
    clientApplicantP.click_via_own_website_checkBox();
    //Click on registration status link
    clientApplicantP.registrant_status_link();
    //Select same registration status selected before this it block
    clientApplicantP.select_previous_registrant_status(status);
    //Click on 'Search' button
    clientApplicantP.search_btn_popup();
    //Validate if via own website checkbox is checked or not after clicking Via link in the table
    clientApplicantP.via_btn();
    clientApplicantP.verify_via_own_website_checked_or_not();
    //Validate if the registration status selected before in the search box is checked or not
    clientApplicantP.registrant_status_btn();
    clientApplicantP.verify_proper_registrant_status_checked_or_not(status);
    //Validate if the users registered 'via own website' is filtered properly in the UI or not
    clientApiObj.user_registration_via_own_website_count().then(viaOwnWebsiteCount => {
        // clientApplicantP.get_visible_total_users_count().then(totalVisibleUsers => {
        //     cy.log(viaOwnWebsiteCount, totalVisibleUsers);
        //     debugger;
        //     assert.deepEqual(viaOwnWebsiteCount, totalVisibleUsers, 'Validates if the search filter works properly or not');
        //     cy.wait(1000);
        // })
        expect(viaOwnWebsiteCount).to.not.eq(0);
    })
}

//Save initial search condition
function save_search_templates(conditionName) {
    //Click on 'Search and save' button
    clientApplicantP.search_and_save_btn();
    //Enter search condition name
    clientApplicantP.search_condition_name_textField(conditionName);
    //Select Yes radio button in the popup seen
    clientApplicantP.set_initial_search_condition_YES();
    //Click on save button
    clientApplicantP.save_btn();
}

function check_recent_search_template_saved_or_not(conditionName) {

    //Go to search template page
    clientHeaderP.search_template_icon();

    //Check if the template is getting displayed in the UI
    clientSearchTemplateP.total_template_count().then(templateCount => {
        expect(templateCount).to.be.greaterThan(1);
        if (templateCount > 1) {
            cy.log('There is at least one search condition saved previously');
            //Validate the search condition matches or not
            clientSearchTemplateP.validate_search_condition_name(conditionName);
            cy.wait(1000);
            //Validate if the toggle of initial search condition is turned or not
            clientSearchTemplateP.validate_initial_search_condition_toggle_turned_on();
        }
    })
}

export function check_age_sorting() {

    //Grab the unsorted age from the Applicant api of first page
    clientApiObj.grab_unsorted_user_ages_from_applicant_API().then(unsortedAge => {
        const determineOrder = arr => {
            if (arr.length < 2) {
                return 'not enough items';
            };
            let ascending = null;
            let nextArr = arr.slice(1);
            for (var i = 0; i < nextArr.length; i++) {
                if (nextArr[i] === arr[i]) {
                    continue;
                } else if (ascending === null) {
                    ascending = nextArr[i] > arr[i];
                } else if (ascending !== nextArr[i] > arr[i]) {
                    return 'unsorted';
                };
            }
            if (ascending === null) {
                return 'all items are equal';
            };
            return ascending ? 'ascending' : 'descending';
        };

        //Sort the age only if there are more than one user present
        if (unsortedAge.length < 2) {
            assert.equal(determineOrder(unsortedAge), 'not enough items', 'Validate that there are not enought users available for sorting');
            cy.wait(1000);
        } else {
            //Validate if the age is NOT sorted(unsorted) by default
            assert.equal(determineOrder(unsortedAge), 'unsorted', 'Validate if the unsorted text is returned or not');
            cy.wait(1000);
            //Click on Age heading column to sort the age in ascending order
            clientApplicantP.age_heading();

            //Grab the age sorted in ascending order from the API
            clientApiObj.grab_ascending_user_ages_from_applicant_API().then(ascendingAge => {
                //Valdiate if the age gets sorted or not
                assert.equal(determineOrder(ascendingAge), 'ascending', 'Validate if the age is sorted in ascending order or not');
                cy.wait(1000);
            })

            //Click again on age heading to sort in descending order
            clientApplicantP.age_heading();

            //Grab the age sorted in desceding order from the API
            clientApiObj.grab_descending_user_ages_from_applicant_API().then(descendingAge => {
                //Validate if the age is sorted or not
                assert.equal(determineOrder(descendingAge), 'descending', 'Validate if the age is sorted in descending order or not');
                cy.wait(1000);
            })
        }
    })
}