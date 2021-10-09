const faker = require('faker')

//Get the random options of the dropwdown
const createRandomOptions = function (options) {
    const randomNumber = faker.random.number({
        min: 0,
        max: options.length - 1
    })
    return randomNumber;
}

class UserHomePage {

    //!<-- START --> Profile Edit Section
    profile_edit_icon() {
        return cy.get(".profile-desc .fa.fa-pencil").should('be.visible').click().wait(600);
    }

    heading() {
        return cy.get('.modal-title').should('have.text', 'Edit Profile');
    }

    //Grab texts

    new_full_name_text() {
        return cy.get('.profile-desc ul li:nth-child(1)').then(newFull => {
            return newFull.text().trim();
        })
    }

    new_gender_text() {
        return cy.get('.profile-desc ul li:nth-child(2)').then(current => {
            return current.text().trim();
        })
    }

    old_DOB_text() {
        return cy.get('.profile-desc li:nth-child(3)').then(old => {
            return old.text().trim();
        })
    }

    new_DOB_text() {
        return cy.get('.profile-desc ul li:nth-child(3)').then(newDOB => {
            return newDOB.text().trim();
        })
    }

    new_residence_text() {
        return cy.get('.profile-desc ul li:nth-child(4)').then(newRes => {
            return newRes.text().trim();
        })
    }

    profile_save_btn() {
        return cy.get('.modal-footer button:nth-child(2)').should('have.text', '保存').click().wait(600);
    }

    last_name(last) {
        return cy.get("[name='last_name']").clear().type(last).wait(600);
    }

    first_name(first) {
        return cy.get("[name='full_name']").clear().type(first).wait(600);
    }

    sei(last) {
        return cy.get("[name='last_furigana']").clear().type(last).wait(600);
    }

    mei(first) {
        return cy.get('[name="furigana"]').clear().type(first).wait(600);
    }

    male() {
        return cy.get('#exampleRadios1').should('be.visible').and('have.attr', 'name', 'gender').click().wait(600);
    }

    female() {
        return cy.get('#exampleRadios2').should('be.visible').and('have.attr', 'name', 'gender').click().wait(600);
    }

    DOB_year(options) {
        cy.log(options[createRandomOptions(options)]);
        debugger;
        return cy.get("[name='year']").select(options[createRandomOptions(options)]).wait(600);
        debugger;
    }

    DOB_month(options) {
        return cy.get("[name='month']").select(options[createRandomOptions(options)]).wait(600);
    }

    DOB_day(options) {
        return cy.get("[name='day']").select(options[createRandomOptions(options)]).wait(600);
    }

    residence(options) {
        return cy.get("[name='residence']").select(options[createRandomOptions(options)]).wait(600);
    }

    //Grab the full name of the user
    grab_current_full_name() {
        return cy.get('h1').then(full => {
            return full.text();
        })
    }

    //! Returns the array containing all the 'VALUES' of options inside the dropdown box for cy.select
    get_dropdown_options_values(selector, selectedOption) {
        return cy.get(selector).then(options => {
            var optionValues = [];
            options.each(function () {
                optionValues.push(Cypress.$(this).val());
            })
            debugger;
            optionValues.shift();
            return optionValues.filter(e => e != selectedOption)
        })
    }

    //! Returns the array containing all the texts of options inside the dropdown box for cy.select
    get_dropdown_options(selector, options) {
        return cy.get(selector).then(optionsText => {
            //Return an array containing all dropdown options
            let optionsArray = optionsText.text().split(/\s+/);
            optionsArray.pop();
            optionsArray.shift();
            //*Filtering the array to not contain the passed dropdown options/element
            let newOptionsArray = optionsArray.filter(e => e != options)
            return newOptionsArray;
        })
    }

    //Grab all the options inside residence dropdown
    grab_residence_options(selectedOption) {
        return this.get_dropdown_options_values("[name='residence'] option", selectedOption);
    }

    //Grab the options inside DOB_year
    grab_DOB_year_options(selectedOption) {
        return this.get_dropdown_options("[name='year']", selectedOption);
    }

    //Grab the options inside DOB_month
    grab_DOB_month_options(selectedOption) {
        return this.get_dropdown_options("[name='month']", selectedOption);
    }

    //Grab the options inside DOB_day
    grab_DOB_day_options(selectedOption) {
        return this.get_dropdown_options("[name='month']", selectedOption);
    }

    //Popup after saving the profile
    i_saved_it_text() {
        return cy.get('.swal-text').should('be.visible').and('have.text', '保存しました。').wait(600);
    }

    popup_OK_button() {
        return cy.get('.swal-button-container button').should('be.visible').and('have.text', 'OK').click().wait(1000);
    }

    //!<-- END --> Profile Edit section

    //!<-- START --> Educational Background Edit Section

    educational_back_edit_icon() {
        return cy.get(".profile-detail > div:nth-child(2) .edit-block").should('be.visible').click().wait(600);
    }

    //! Grab NEW option values
    new_final_education_value() {
        return this.grab_current_option_value('[name="final_education"]');
    }

    new_graduation_school_name_value() {
        return this.grab_current_option_value("[name='graduation_school_name']");
    }

    new_graduation_faculty_name_value() {
        return this.grab_current_option_value("[name='graduation_department_name']");
    }

    new_graduation_year_value() {
        return this.grab_current_option_value("[name='year_of_graduation']");
    }

    //! Acutal selectors
    final_education(options) {
        return cy.get('[name="final_education"]').select(options[createRandomOptions(options)]).wait(600);
    }

    graduation_school_name() {
        return cy.get('[name="graduation_school_name"]').clear().type(faker.lorem.word()).wait(600);
    }

    graduation_faculty_name(name) {
        return cy.get('[name="graduation_department_name"]').clear().type(faker.lorem.word()).wait(600);
    }

    graduation_year(options) {
        return cy.get('[name="year_of_graduation"]').select(options[createRandomOptions(options)]).wait(600);
    }

    grab_final_education_options(selectedOption) {
        return this.get_dropdown_options_values("[name='final_education'] option", selectedOption);
    }

    grab_graduation_year_options(selectedOption) {
        return this.get_dropdown_options_values("[name='year_of_graduation'] option", selectedOption);
    }

    educational_save_icon() {
        return cy.get('.fa.fa-floppy-o').click().wait(1000);
    }
    //!<-- END --> Educational Background Edit Section

    //!<-- START --> Work History

    work_history_edit_icon() {
        return cy.get('.profile-detail div:nth-child(3) .edit-block').should('be.visible').click().wait(600);
    }

    //! Grab current option value
    grab_current_option_value(selector) {
        return cy.get(selector).then(optionValue => {
            return optionValue.val();
        })
    }

    //! Grab new work history row values
    new_registered_company_name_value() {
        return this.grab_current_option_value('input[name="recent_registered_company_name"]')
    }

    new_years_of_enrollment_value() {
        return this.grab_current_option_value('input[name="years_of_attendance"]')
    }

    new_recent_occupation_major_value() {
        return this.grab_current_option_value('[name="latest_occupation_main_title"]');
    }

    new_recent_occupation_middle_value() {
        return this.grab_current_option_value('[name="latest_occupation_sub_title"]');
    }

    new_employment_form_value() {
        return this.grab_current_option_value('[name="employment_status"]')
    }

    new_position_value() {
        return this.grab_current_option_value('[name="position"]')
    }

    new_english_ability_value() {
        return this.grab_current_option_value('[name="english_skills"]')
    }

    new_recent_income_value() {
        return this.grab_current_option_value('[name="last_year_income"]');
    }

    new_experienced_companies_value() {
        return this.grab_current_option_value("[name='number_of_experience_companies']");
    }

    new_job_offer_value() {
        return this.grab_current_option_value('[name="job_summary"]')
    }

    new_change_career_reason_value() {
        return this.grab_current_option_value('[name="career_change_reason"]')
    }

    //! Actual selectors
    recent_registered_company_name(name) {
        return cy.get('[name="recent_registered_company_name"]').clear().type(name).wait(600);
    }

    years_of_enrollment() {
        return cy.get('[name="years_of_attendance"]').clear().type(faker.random.number({
            min: 1,
            max: 100
        })).wait(600);
    }

    recent_occupation_major(options) {
        return cy.get('[name="latest_occupation_main_title"]').select(options[createRandomOptions(options)]).wait(600);
    }

    recent_occupation_middle(options) {
        return cy.get('[name="latest_occupation_sub_title"]').select(options[createRandomOptions(options)]).wait(600);
    }

    employment_form(options) {
        return cy.get('[name="employment_status"]').select(options[createRandomOptions(options)]).wait(600);
    }

    position(options) {
        return cy.get('[name="position"]').select(options[createRandomOptions(options)]).wait(600);
    }

    english_ability(options) {
        return cy.get('[name="english_skills"]').select(options[createRandomOptions(options)]).wait(600);
    }

    recent_income() {
        return cy.get('[name="last_year_income"]').clear().type(faker.random.number({
            min: 1,
            max: 1000
        })).wait(600);
    }

    companies_experienced() {
        return cy.get('[name="number_of_experience_companies"]').clear().type(faker.random.number({
            min: 1,
            max: 100
        })).wait(600);
    }

    job_offer(offer) {
        return cy.get('[name="job_summary"]').clear().type(offer).wait(600);
    }

    change_career_reason(reason) {
        return cy.get('[name="career_change_reason"]').clear().type(reason).wait(600);
    }

    //! Grab the options inside the dropdown
    grab_recent_occupation_major_values(selectedOption) {
        return this.get_dropdown_options_values('[name="latest_occupation_main_title"] option', selectedOption);
    }

    grab_recent_occupation_middle_values(selectedOption) {
        return this.get_dropdown_options_values('[name="latest_occupation_sub_title"] option', selectedOption);
    }

    grab_employment_form_values(selectedOption) {
        return this.get_dropdown_options_values('[name="employment_status"] option', selectedOption);
    }

    grab_position_values(selectedOption) {
        return this.get_dropdown_options_values('[name="position"] option', selectedOption);
    }

    grab_english_ability_values(selectedOption) {
        return this.get_dropdown_options_values('[name="english_skills"] option', selectedOption);
    }

    work_history_save_icon() {
        return cy.get('.fa.fa-floppy-o').click().wait(600);
    }

}
export default UserHomePage;