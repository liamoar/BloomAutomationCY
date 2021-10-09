import UserChangePasswordPage from '../../page/user/UserChangePasswordPage'
import UserHeader from '../../page/user/UserHeader'
import UserHomePage from '../../page/user/UserHomePage'
import * as userApiObj from '../user/UserApiObj'
const userHeaderP = new UserHeader()
const userChangePasswordP = new UserChangePasswordPage()
const userHomeP = new UserHomePage()

//! File Paths
const userRegisterDetailsFixtures = 'cypress/fixtures/user/UserRegisterDetails.json'
const defaultUserLoginDetails = 'cypress/TestData/user/DefaultUserLoginDetails.json'
const userRegisterDetailsTestData = 'cypress/TestData/user/UserRegisterDetails.json'

const faker = require('faker')
const new_password = `Reetik@${faker.random.number({min:1, max:400})}`;


export function validate_change_password() {

    //Click on change password icon at the header
    userHeaderP.change_password_icon();

    //Check if userRegisterDetailsFixtures json file exists
    cy.checkFileExists(userRegisterDetailsFixtures).then(check => {
        if (check) {
            //Change the fixtures file containing fake data
            change_password(userRegisterDetailsFixtures)
        } else {
            //Change the TestData folder containing provided data
            change_password(defaultUserLoginDetails);
        }
    })
}


function change_password(filePath) {

    cy.readFile(filePath).then(data => {
        userChangePasswordP.old_password(data.password);
        userChangePasswordP.new_password(new_password);
        userChangePasswordP.confirm_new_password(new_password);
        userChangePasswordP.save_changes_btn();

        //Verify if the popup appears after changing the password or not
        userChangePasswordP.password_changed_popup();
        userChangePasswordP.password_changed_text();
        userChangePasswordP.password_changed_OK();

        //Replace only password in the fixtures with new password
        data.password = new_password;

        //Writing 'new password' into the 'password' key of the JSON file
        cy.writeFile(filePath, data);
    })
}

//Edit the profile section of the user
export function edit_profile() {

    //todo: The firstName and lastName of the user should be updated in the json due to the validation error in the UserAction module(verify_jobseeker_profile Test case);

    userApiObj.get_user_profile_from_API().then(response => {
        cy.log(response.data);
        userHomeP.old_DOB_text().then(oldDOB => {

            //Click on profile edit icon
            userHomeP.profile_edit_icon();
            //Validate the popup heading
            userHomeP.heading();

            //Change the last name and first Name
            const firstName = faker.name.firstName()
            const lastName = faker.name.lastName();

            userHomeP.last_name(lastName);
            userHomeP.first_name(firstName);
            userHomeP.sei(lastName);
            userHomeP.mei(firstName);
            //Select female if male is selected or vice versa
            if (response.data.gender === '男性') {
                userHomeP.female();
            } else {
                userHomeP.male();
            }
            //Select new DOB-year
            userHomeP.grab_DOB_year_options().then(options => {
                userHomeP.DOB_year(options);
            })
            //Select new DOB-month
            userHomeP.grab_DOB_month_options().then(options => {
                userHomeP.DOB_month(options);
            })

            //Select new DOB-day
            userHomeP.grab_DOB_day_options().then(options => {
                userHomeP.DOB_day(options);
            })

            //Select new residence
            userHomeP.grab_residence_options(response.data.residence).then(options => {
                userHomeP.residence(options);
            })

            //Validations of the new updated VALUES with the older VALUES
            userHomeP.new_full_name_text().then(newFull => {
                assert.notDeepEqual(newFull, `${response.data.last_name} ${response.data.full_name}`, 'Validate if the full name has changed after editing or not')
                cy.wait(1000);
            })
            userHomeP.new_gender_text().then(newGender => {
                assert.notDeepEqual(newGender, response.data.gender, 'Validate if the new gender is changed or not')
                cy.wait(1000)
            })
            userHomeP.new_residence_text().then(newResidence => {
                assert.notDeepEqual(newResidence, response.data.residence, 'Validate if the residence is different or not');
                cy.wait(1000);
            })

            //Click on save button
            userHomeP.profile_save_btn();
            //Validate the popup after clicking save button
            userHomeP.i_saved_it_text();
            userHomeP.popup_OK_button();

            //Validate DOB text
            userHomeP.new_DOB_text().then(newDOB => {
                assert.notDeepEqual(newDOB, oldDOB, 'Validate if the new DOB is different or not')
                cy.wait(1000);
            })
            //Save the new firstName,lastName, SEI and MEI in the fixtures
            cy.readFile(userRegisterDetailsFixtures).then(oldData => {
                oldData.firstName = firstName;
                oldData.lastName = lastName;
                oldData.SEI = lastName;
                oldData.MEI = firstName;
                cy.writeFile(userRegisterDetailsFixtures, oldData);
            })
        })
    })
}