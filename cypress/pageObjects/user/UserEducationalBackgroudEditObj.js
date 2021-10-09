import UserHomePage from '../../page/user/UserHomePage'
import * as userApiObj from '../user/UserApiObj'
const userHomeP = new UserHomePage()

export function edit_educational_background() {
    //Grab the API response
    userApiObj.get_user_profile_from_API().then(response => {
        cy.log(response.data);

        //Click on edit icon
        userHomeP.educational_back_edit_icon();

        //Change the current details to a new one
        userHomeP.grab_final_education_options(response.data.final_education).then(options => {
            userHomeP.final_education(options);
        })
        userHomeP.graduation_school_name();
        userHomeP.graduation_faculty_name().then(() => {
            userHomeP.grab_graduation_year_options(response.data.year_of_graduation).then(options => {
                userHomeP.graduation_year(options);
            })

            //Validate if the details are updated or not after saving
            userHomeP.new_final_education_value().then(newFinal => {
                assert.notDeepEqual(newFinal, response.data.final_education, 'Validate if the final education is changed or not');
                cy.wait(1000);
            })
            userHomeP.new_graduation_school_name_value().then(newGrad => {
                assert.notDeepEqual(newGrad, response.data.graduation_school_name, 'Validate if the graduation school name is changed or not');
                cy.wait(1000);
            })

            userHomeP.new_graduation_faculty_name_value().then(newFaculty => {
                assert.notDeepEqual(newFaculty, response.data.graduation_department_name, 'Validate if the graduation faculty name is changed or not');
                cy.wait(1000)
            })

            userHomeP.new_graduation_year_value().then(newYear => {
                assert.notDeepEqual(newYear, response.data.year_of_graduation, 'validate if the graduation year is changed or not');
                cy.wait(1000)
            })

            //Click on save icon
            userHomeP.educational_save_icon();
            //Validate the popup after clicking on save button
            userHomeP.i_saved_it_text();
            userHomeP.popup_OK_button();
        })
    })
}