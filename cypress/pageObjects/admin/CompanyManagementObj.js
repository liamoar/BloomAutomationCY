import CompaniesCreatePage from '../../page/admin/CompaniesCreatePage';
import CompaniesPage from '../../page/admin/CompaniesPage';
import AdminHeader from '../../page/admin/AdminHeader';
import AdminSideBar from '../../page/admin/AdminSideBar'
import UserMaintenancePage from '../../page/user/UserMaintenancePage'
import CompanyUsersPage from '../../page/admin/CompanyUsersPage'
import JobseekersPage from '../../page/admin/JobseekersPage'
import CompaniesEditPage from '../../page/admin/CompaniesEditPage'
import * as utils from '../../utils/client/client_loginRegisterController'
import * as userApiObj from '../../pageObjects/user/UserApiObj'

const adminSideP = new AdminSideBar();
const adminHeaderP = new AdminHeader();
const companiesP = new CompaniesPage();
const companiesCreateP = new CompaniesCreatePage()
const userMaintenanceP = new UserMaintenancePage();
const companyUsersP = new CompanyUsersPage();
const jobSeekersP = new JobseekersPage();
const companiesEditP = new CompaniesEditPage();
const faker = require('faker')

//! File Paths
const clientRegisterDetailsFixtures = 'cypress/fixtures/client/ClientRegisterDetails.json'
const clientRegisterDetailsTestData = 'cypress/TestData/client/ClientRegisterDetails.json'
const userRegisterDetailsFixtures = 'cypress/fixtures/user/UserRegisterDetails.json'

export function translate_to_english() {

    //Grab the current language selected
    adminHeaderP.grab_current_language().then(current => {
        //Click the dropdown
        adminHeaderP.current_language_section();
        //Select English
        adminHeaderP.select_english_language();
        //Check the language is changed to English or not
        adminHeaderP.grab_new_language().then(newLanguage => {
            assert.notEqual(current, newLanguage, 'Validate if the old and new languages are different');
            cy.wait(1000);
        })
    });
}

export function go_to_company_management() {

    //Click on company modules in sidebar
    adminSideP.company_module();
    //Click on company management
    adminSideP.company_management();
}

export function validate_new_company_registration() {

    //Grab the count of available companies/clients before registration
    companiesP.old_total_companies_count().then(oldCount => {
        cy.log(oldCount);

        //Click on 'Add new' button 
        companiesP.add_new_btn();

        //Register using fake data
        if (utils.get_client_register_data()) {

            //* Register new client/company
            register_new_company_with_password(clientRegisterDetailsFixtures);

            //Verify if the count of companies increases by one after registration
            companiesP.new_total_companies_count().then(newCount => {
                cy.log(newCount);
                cy.log(`The total number of companies before registration was ${oldCount}`);
                cy.log(`The total number of companies after registration is ${newCount}`);
                assert.equal(parseInt(newCount), parseInt(oldCount) + 1, 'The new Count of companies should be one more than the old one');
            })

            search_new_client(clientRegisterDetailsFixtures);
        }

        //Register using real data provided
        else {

            //* Register new client/company
            register_new_company_with_password(clientRegisterDetailsTestData);

            //Verify if the count of companies increases by one after registration
            companiesP.new_total_companies_count().then(newCount => {
                cy.log(newCount);
                cy.log(`The total number of companies before registration was ${oldCount}`);
                cy.log(`The total number of companies after registration is ${newCount}`);
                assert.equal(parseInt(newCount), parseInt(oldCount) + 1, 'The new Count of companies should be one more than the old one');
            })
            search_new_client(clientRegisterDetailsTestData);
        }
    })
}

function upload_company_logo() {
    const logoPath = 'cypress/fixtures/client/logo/'
    cy.checkFileExists(logoPath).then(check => {
        if (check) {
            cy.getFilesData(logoPath).then(photo => {
                cy.log(photo);
                cy.log(`There are ${photo.length} logo inside the fixtures`);
                if (photo.length > 0) {
                    companiesCreateP.company_logo(`client/logo/${photo[0]}`);
                    cy.log('the logo is sucessfully uploaded');
                } else {
                    cy.log('There are no logo inside => client/logo folder of the fixtures. Please add one');
                }
            })
        } else {
            cy.log('There is no folder named logo in the fixtures');
        }
    })
}

//Store the new registered company in the given json file
function search_new_client(filePath) {
    //Search the client name at the search box and write the user registration link into a file
    cy.readFile(filePath).then(data => {
        cy.log(data.companyName)
        companiesP.search_box(data.companyName);
        companiesP.grab_user_registration_link().then(link => {
            cy.writeFile('cypress/fixtures/user/registrationLink.json', {
                userRegistrationLink: link
            })
        });
    })
}

//Store the old registered company in the given json file
export function search_old_client() {
    companiesP.search_box('Altenwerth - Farrell');
    companiesP.grab_user_registration_link().then(link => {
        cy.writeFile('cypress/fixtures/user/registrationLink.json', {
            userRegistrationLink: link
        })
    })
}

function register_new_company_with_password(filePath) {
    cy.checkFileExists(filePath).then(exists => {
        if (exists) {
            cy.readFile(filePath).then(data => {
                companiesCreateP.company_name_field(data.companyName);
                companiesCreateP.short_description(data.shortDescription);
                companiesCreateP.registration_page_title(data.registrationPageTitle);
                companiesCreateP.slug(data.slug);
                companiesCreateP.position(data.position);
                companiesCreateP.location(data.location);
                companiesCreateP.description(data.description);

                //Upload company logo
                upload_company_logo();
                companiesCreateP.link_text(data.linkText);
                companiesCreateP.username(data.username);
                companiesCreateP.email_address(data.email);
                companiesCreateP.password(data.password);
                companiesCreateP.confirm_password(data.password);
                companiesCreateP.add_btn();
                //Check if alert message displays with required text or not
                companiesP.company_added_alert();
            })
        } else {
            cy.log('The files with register Test Data is not available. Check it ASAP!!!');
        }
    })
}

function register_new_company_from_activation_link() {

    //todo: Ask the API to be made for this scenario
    cy.checkFileExists(filePath).then(exists => {
        if (exists) {
            cy.readFile(filePath).then(data => {
                companiesCreateP.company_name_field(data.companyName);
                companiesCreateP.short_description(data.shortDescription);
                companiesCreateP.registration_page_title(data.registrationPageTitle);
                companiesCreateP.slug(data.slug);
                companiesCreateP.position(data.position);
                companiesCreateP.location(data.location);
                companiesCreateP.description(data.description);

                //Upload company logo
                upload_company_logo();
                companiesCreateP.link_text(data.linkText);
                companiesCreateP.username(data.username);
                companiesCreateP.email_address(data.email);
                companiesCreateP.send_activation_link_btn();
                companiesCreateP.add_btn();
                //Check if alert message displays with required text or not
                companiesP.company_added_alert();
            })
        } else {
            cy.log('The files with register Test Data is not available. Check it ASAP!!!');
        }
    })

}

export function click_logo() {
    adminHeaderP.bloom_logo();
}

export function select_blocked_status() {

    //Search NEW client if registered else search a default OLD client
    cy.checkFileExists(clientRegisterDetailsFixtures).then(check => {
        if (check) {
            search_new_client(clientRegisterDetailsFixtures);
        } else {
            search_old_client();
        }
        companiesP.grab_current_company_status().then(currentStatus => {
            debugger;
            if (currentStatus == 'active') {
                //Select blocked from the dropdown
                companiesP.click_company_status_btn();
                companiesP.select_new_company_status('Blocked');
                cy.wait(1500);
            } else if (currentStatus == 'Blocked' || 'Inactive') {
                cy.log('The status is already set to  blocked before');
            }
        })
    })
}

export function visit_blocked_url() {
    cy.readFile('cypress/fixtures/user/registrationLink.json').then(data => {
        cy.visit(data.userRegistrationLink).wait(500)
            .url().should('contain', '/maintenance').wait(500);
        userMaintenanceP.check_error_imamge();
        userMaintenanceP.check_h1();
        // userMaintenanceP.check_404_message();
        cy.wait(1000);
    })
}

export function reselect_active_status() {
    cy.readFile('cypress/fixtures/user/registrationLink.json').then(data => {
        companiesP.search_box(data.userRegistrationLink);
        //Re-Select active from the dropdown
        companiesP.click_company_status_btn();
        companiesP.select_new_company_status('Active');
        cy.wait(1500);
    })
}

export function search_company_users() {
    cy.checkFileExists(clientRegisterDetailsFixtures).then(check => {
        if (check) {
            cy.readFile(clientRegisterDetailsFixtures).then(data => {
                //Search a company with company name
                companiesP.search_box(data.companyName);
                //Click on the 1st icon inside the Action column
                companiesP.first_action_icon();
                //Search company user with valid email
                cy.log(data.email)
                //Search the user
                companyUsersP.search_box(data.email);
                //Validate if the client name is correct or not
                companyUsersP.grab_client_name().then(acutalName => {
                    assert.deepEqual(acutalName, data.username, 'Validate if the client name in fixtures and UI is same or not');
                    cy.wait(1000);
                })
            })
        } else {
            cy.log('the user register details fixture file is not available');
        }
    })
}

export function search_jobseekers() {

    cy.checkFileExists(clientRegisterDetailsFixtures).then(check => {
        if (check) {
            cy.readFile(clientRegisterDetailsFixtures).then(data => {
                //Search a company with company name
                companiesP.search_box(data.companyName);
                //Click on 2nd icon inside the Action Column
                companiesP.second_action_icon();
                //Click on search button
                jobSeekersP.search_btn();
                //Select current registered company
                jobSeekersP.select_currently_registered_company(data.companyName);

                cy.checkFileExists(userRegisterDetailsFixtures).then(checks => {
                    if (checks) {
                        cy.readFile(userRegisterDetailsFixtures).then(userData => {
                            //Type email of jobseeker
                            jobSeekersP.free_search(userData.email);
                            //Click on search button of the popup
                            jobSeekersP.search_btn_popup();
                            //Validate if the search box is filled with the searched email or not
                            jobSeekersP.grab_search_box_value().then(actualValue => {
                                cy.log(actualValue);
                                assert.deepEqual(actualValue, userData.email, 'Validate if the email shown in the search box is valid or not');
                                cy.wait(1000);
                            })
                            //Validate the found result is valid or not
                            jobSeekersP.grab_company_name().then(companyName => {
                                assert.deepEqual(companyName, data.companyName, 'Validate if the company name is shown correctly or not');
                                cy.wait(1000);
                            })
                            jobSeekersP.grab_jobseeker_name().then(jobSeekerName => {
                                assert.deepEqual(jobSeekerName, `${userData.lastName} ${userData.firstName}`, 'Validate if the jobseeker name is valid or not');
                                cy.wait(1000);
                            })
                        })
                    }
                })
            })
        }
    })
}


export function edit_company_details() {
    cy.checkFileExists(clientRegisterDetailsFixtures).then(check => {
        if (check) {
            cy.readFile(clientRegisterDetailsFixtures).then(data => {
                companiesP.search_box(data.companyName);
                //Click the 3rd icon inside the action column
                companiesP.third_action_icon();

                if (utils.edit_client_register_data()) {
                    cy.readFile(clientRegisterDetailsFixtures).then(newData => {
                        cy.log(data.shortDescription);
                        debugger;
                        //Change some details of the client
                        companiesEditP.short_description(newData.shortDescription);
                        companiesEditP.registration_page_title(newData.registrationPageTitle);
                        companiesEditP.location(newData.location);
                        companiesEditP.linkText(newData.linkText);
                        //Click on update button
                        companiesEditP.update_btn();
                        //validate alert text
                        companiesEditP.alert_text();
                    })
                } else {
                    cy.log('The faker is set to false in the environment');
                }
            })
        }
    })
}


export function like_jobseeker() {

    //Search a valid jobseeker
    search_jobseekers();
    //Click on like icon inside the favourite column if not liked before
    //Else click on unlike icon
    jobSeekersP.thumbs_up_icon().then(thumbsUp => {
        if (thumbsUp.hasClass(jobSeekersP.unlike_icon_class())) {
            jobSeekersP.click_unlike_icon();
        } else {
            jobSeekersP.click_like_icon();
        }
        //Check if alert is visible and close it
        jobSeekersP.updated_alert();
        jobSeekersP.close_alert();
    })
}


export function change_registration_status() {

    cy.readFile(clientRegisterDetailsFixtures).then(data => {
        //Go to jobseeker page of a particular company
        companiesP.search_box(data.companyName);
        companiesP.second_action_icon();
    })
    //Grab the current registration status for future validations
    jobSeekersP.grab_current_registration_status_text().then(currentStatus => {
        cy.log(currentStatus);
        //CLick on registration stautus button
        jobSeekersP.click_registration_button();
        //Select random registration status 
        jobSeekersP.grab_registration_status_options(currentStatus).then(options => {
            cy.log(options.length);
            //Select random registrations status options except for the currently selected one
            jobSeekersP.select_random_registration_status(options);
            cy.wait(1000);
            //validate if the registration status has changed or not
            jobSeekersP.grab_new_registration_status_text().then(newStatus => {
                assert.notDeepEqual(currentStatus, newStatus, 'Validate if the registration status has changed');
                cy.wait(1000);
            })
            //Check if alert is visible and close it
            jobSeekersP.updated_alert();
            jobSeekersP.close_alert();
        })
    })
}

export function change_background_color() {

    //Grab the current Style attribute value of the tr tag
    jobSeekersP.old_background_color_style_value().then(oldStyleAttribute => {
        //Change the background color of the row
        jobSeekersP.get_current_background_color().then(currentColor => {
            cy.log(currentColor);
            //Click background color change button
            jobSeekersP.click_background_color_btn();
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
        //Validate if the style attribute of tr tag has changed or not
        jobSeekersP.new_bavkground_color_style_value().then(newStyleAttribute => {
            assert.notDeepEqual(oldStyleAttribute, newStyleAttribute, 'Validate if the style attribute has changed or not');
            cy.wait(1000);
        })
        //Check if alert is visible and close it
        jobSeekersP.updated_alert();
        jobSeekersP.close_alert();
    })
}

function select_new_background_color(color) {

    //Select new background color, other than the color that is currently selected
    jobSeekersP.grab_background_color_links(color).then(newColor => {
        cy.log(newColor);
        jobSeekersP.select_new_background_color(newColor);
    })
}


export function verify_jobseeker_profile() {

    //click on the middle of table row of the user details
    jobSeekersP.click_jobseeker_profile();

    //Like the user from popup
    like_jobseeker_from_popup();
    cy.wait(1500);
    //Change Registration status from teh popup
    change_jobseeker_registration_status_from_popup();
    cy.wait(1500)
    //Add memo from the popup
    add_memo_from_popup();
    cy.wait(1500);
    //Validate the jobseeker details in the profile
    check_jobseeker_profile();
}

function like_jobseeker_from_popup() {

    //Like the jobseeker if not liked and vice versa
    jobSeekersP.thumbs_up_icon_popup().then(thumbsUp => {
        if (thumbsUp.hasClass(jobSeekersP.unlike_icon_class())) {
            jobSeekersP.click_unlike_icon_popup();
        } else {
            jobSeekersP.click_like_icon_popup();
        }
        //Check if alert is visible and close it
        jobSeekersP.updated_alert();
        jobSeekersP.close_alert();
    })
}

function change_jobseeker_registration_status_from_popup() {

    //Change the current registration status of the jobseeker to a unique one
    jobSeekersP.grab_current_registration_status_text_popup().then(currentStatus => {
        //Click on registration status button
        jobSeekersP.click_registration_button_popup();
        jobSeekersP.grab_registration_status_options_popup(currentStatus).then(options => {
            cy.log(options);
            jobSeekersP.select_random_registration_status_popup(options);
        })
        cy.wait(3000);
        //Validate if the registration status has changed or not
        jobSeekersP.grab_new_registration_status_text_popup().then(newStatus => {
            assert.notDeepEqual(newStatus, currentStatus, 'Validate if the registration status has changed or not');
            cy.wait(1000);
        })
        //Check if alert is visible and close it
        jobSeekersP.updated_alert();
        jobSeekersP.close_alert();
    })
}

export function add_memo() {

    //Click on memo icon
    jobSeekersP.click_memo_icon();
    //Type something
    jobSeekersP.type_inside_textArea(faker.lorem.sentence());
    //Click update button
    jobSeekersP.memo_update_btn();
    //Validate if the alert is present or not with valid message
    jobSeekersP.updated_alert();
    jobSeekersP.close_alert();
}

function add_memo_from_popup() {

    //CLick on memo icon
    jobSeekersP.click_memo_icon_popup();
    //Type something
    jobSeekersP.type_inside_textArea_popup(faker.lorem.sentence());
    //Click update button
    jobSeekersP.memo_update_btn_popup();
    //Validate if the alert is present and close it
    jobSeekersP.updated_alert();
    jobSeekersP.close_alert();
}

function check_jobseeker_profile() {

    //Validate if the jobseeker profile is valid or not
    cy.checkFileExists(userRegisterDetailsFixtures).then(check => {
        if (check) {
            userApiObj.get_user_profile_from_API().then(response => {
                cy.log(response.data);
                const actualResponse = response.data;
                debugger;

                //*Compare the Jobseeker details from the UI and API
                jobSeekersP.grab_jobseeker_fullName_popup().then(fullName => {
                    assert.deepEqual(fullName, `${actualResponse.last_name} ${actualResponse.full_name}`, 'Validate if the fullName is valid');
                    cy.wait(1000);
                })
                jobSeekersP.grab_jobseeker_DOB_popup().then(DOB => {
                    const longDate = actualResponse.birth_date;
                    const shortDateArray = longDate.replace('T', ' ').split(' ');
                    const actualDate = shortDateArray[0].replaceAll('-', '/');
                    assert.deepEqual(DOB, actualDate, 'Validate if the DOB is valid');
                    cy.wait(1000);
                })
                jobSeekersP.grab_jobseeker_email_popup().then(email => {
                    assert.deepEqual(email, actualResponse.email, 'Verify if the email is valid');
                    cy.wait(1000);
                })
                jobSeekersP.grab_most_recently_registered_company_name_text_popup().then(company => {
                    assert.deepEqual(company, actualResponse.recent_registered_company_name, 'verify if the recently registered company is valid');
                    cy.wait(1000);
                })
                jobSeekersP.grab_job_offers_text_popup().then(offers => {
                    assert.deepEqual(offers, actualResponse.job_summary, 'Validate the job offer is valid');
                    cy.wait(1000);
                })
                jobSeekersP.grab_concerns_text_popup().then(concerns => {
                    assert.deepEqual(concerns, actualResponse.career_change_reason, 'Validate job concerns is valid');
                    cy.wait(1000);
                })
                //Click on close button of the popup
                jobSeekersP.close_btn_popup();
            })
        } else {
            cy.log('No register details present at the fixtures!!');
        }
    })
}