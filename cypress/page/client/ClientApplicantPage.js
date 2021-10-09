const faker = require('faker')
import UserHomePage from '../../page/user/UserHomePage'
const userHomeP = new UserHomePage();

class ClientApplicantPage {

    //*<--START--> Header section
    like_icon_header() {
        return cy.get('.client-listing-head i.fa.fa-thumbs-o-up').should('be.visible').click().wait(2000);
    }

    search_btn_header() {
        return cy.get('.one-right .btn.btn-primary').should('be.visible').and('contain.text', '検索').click({
            force: true
        }).wait(1000);
    }

    total_search_btn_counts() {
        return cy.get('.one-right .btn.btn-primary').then(search => {
            return search.length;
        })
    }
    //* Popup after clicking the 'Search' button in the header

    via_own_website_checkbox() {
        return cy.get('#company #own').should('have.attr', 'value', 'own').check();
    }

    free_search_textField(text) {
        return cy.get(".col-md-12.bnt-grp input").type(text).wait(500);
    }

    search_btn_popup() {
        return cy.get("#modal1___BV_modal_footer_ > [type='button'].btn.btn-primary ").contains('検索').click().wait(2000);
    }

    search_and_save_btn() {
        return cy.get('.btn-success').should('contain.text', '検索保存').should('be.visible').click().wait(1000);
    }

    search_clear_btn() {
        return cy.get('.btn.btn-primary.btn-clear.mr-2').should('contain.text', '検索クリアー').click().wait(1000);
    }

    //* Popup after clicking 'Search and Save' button
    search_condition_name_textField(text) {
        return cy.get("[name='title']").type(text).wait(500);
    }

    set_initial_search_condition_YES() {
        return cy.get("#exampleRadios3").should('be.visible').and('have.attr', 'value', 'yes').click().wait(500);
    }

    save_btn() {
        return cy.get("footer .btn.btn-primary").contains('保存').should('be.visible').and('contain.text', '保存').click().wait(500);
    }

    //*<--END--> Header section

    //*<--START--> List of users section(Table)
    get_current_table_row_count() {
        return cy.get('tr').then(table => {
            return table.length;
        })
    }

    click_matching_user_detail_table() {
        return cy.get('tbody .applicant-list').should('be.visible').click().wait(1000);
    }
    //*<--END--> List of users section(Table)

    //*<--START--> User Profile Popup

    //Grab text of a passed element using respective selectors
    grab_text(selector) {
        return cy.get(selector).then(text => {
            return text[0].textContent;
        })
    }

    current_fullName_text() {
        return this.grab_text('.prf-title h1');
    }

    current_email_text() {
        return this.grab_text('.profile-desc li:nth-child(4) span.edit-txt');
    }

    current_most_recently_registered_company_name_text() {
        return this.grab_text('.row > div:nth-child(1) tbody tr:nth-child(1) > td');
    }

    current_job_offer_text() {
        return this.grab_text('.row > div:nth-child(3) tbody tr:nth-child(1) > td');
    }

    current_concerns_text() {
        return this.grab_text('.row > div:nth-child(4) tbody tr:nth-child(1) > td');
    }

    current_registration_status_text_profile_popup() {
        return cy.get('.modal-body #ddown1 button').then(registration => {
            return registration.textContent;
        })
    }

    click_registration_status_button() {
        return cy.get('.modal-body #ddown1 button').should('be.visible').click().wait(500);
    }

    //grab registration status of specific user
    grab_unique_user_registration_status(listOptions) {
        return userHomeP.get_dropdown_options('.modal-body #ddown1 ul li a', listOptions);
    }

    //select random unique registration status
    select_random_registration_status_for_specific_user(options) {
        return cy.get('.modal-body #ddown1 ul li a').contains(options[faker.random.number({
            min: 0,
            max: options.length - 1
        })]).click().wait(1000);
    }

    //?like user profile
    like_user_from_profile_popup() {
        return cy.get('.modal-body .fa.fa-thumbs-o-up').should('be.visible').click().wait(500);
    }

    unlike_user_from_profile_popup() {
        return cy.get('.modal-body .fa.fa-thumbs-up').should('be.visible').click().wait(500);
    }

    //?add memo
    click_memo_icon_profile_header() {
        return cy.get('.modal.fade.show.d-block .fa.fa-sticky-note').should('be.visible').click().wait(500);
    }

    memo_header_text_profile_popup(text) {
        return cy.get('.modal.fade.show.d-block .modal-dialog.modal-md header .modal-title').should('be.visible').and('contain.text', text).wait(500)
    }

    click_memo_save_btn_profile_popup() {
        return cy.get('.modal.fade.show.d-block footer button:nth-child(2)').should('be.visible').and('have.text', '保存').click().wait(1000);
    }

    type_memo_profile_popup(text) {
        return cy.get('.modal.fade.show.d-block .modal-dialog.modal-md #textarea1').should('be.visible').clear().type(text).wait(500);
    }
    //*<--END--> User Profile Popup

    //*<--START--> After clicking Like Icon at the mid header
    currently_liked_users_count() {
        return cy.get('tbody tr td').then(table => {
            return table.length;
        })
    }

    no_registrants_found() {
        return this.grab_text('tbody tr td').then(expectedText => {
            expect(expectedText).to.eq('登録者が見つかりませんでした')
        })
    }

    like_user_icon_NOTE() {
        return cy.get('td .fa.fa-thumbs-o-up').should('be.visible').click().wait(500);
    }

    unlike_user_icon_NOTE() {
        return cy.get('td .fa.fa-thumbs-up').should('be.visible').click({
            multiple: true
        }).wait(500);
    }

    unlike_icon_header() {
        return cy.get('.client-listing-head i.fa.fa-thumbs-up').should('be.visible').click().wait(500);
    }
    //*<--END--> After clicking Like Icon at the mid header

    //*<--START--> User Memo
    user_memo_icon_NOTE() {
        return cy.get('.fa.fa-sticky-note').should('be.visible').click().wait(500);
    }

    memo_header_text(name) {
        return cy.get('.modal.fade.show.d-block header').should('contain.text', name).wait(500);
    }

    memo_textArea(text) {
        return cy.get('#textarea1').clear().type(text).wait(1000);
    }

    memo_save_btn() {
        return cy.get('.modal.fade.show.d-block footer button:nth-child(2)').should('be.visible').and('have.text', '保存').click({
            force: true
        }).wait(1000);
    }

    //If it returns True then the class is present else is not present
    check_empty_memo_class() {
        return cy.get('.fa.fa-sticky-note').parent().then(parent => {
            return parent.hasClass('btn-plain btn-heart')
        })
    }
    //*<--END--> User Memo


    //*<--START--> Change registration status test case
    registration_status_btn() {
        return cy.get('tbody tr:nth-child(1) td:nth-child(11) button').click().wait(500);
    }

    current_registration_status_text() {
        return this.grab_text('tbody tr:nth-child(1) td:nth-child(12) button');
    }

    grab_registration_status_options(listOptions) {
        return userHomeP.get_dropdown_options('td:nth-child(12) li a', listOptions);
    }

    //Select random registration status 
    select_random_registration_status(options) {
        return cy.get('tbody tr:nth-child(1) td:nth-child(12) ul li a').contains(options[faker.random.number({
            min: 0,
            max: options.length - 1
        })]).click().wait(1000);
    }

    new_registration_status_text() {
        return this.grab_text('tbody tr:nth-child(1) td:nth-child(12) div button');
    }

    click_registration_btn() {
        return cy.get('tbody tr:nth-child(1) td:nth-child(12) button').click().wait(500);
    }
    //*<--END--> Change registration status test case

    //*<--START--> Change background color test case

    get_current_background_color() {
        return cy.get('tbody tr').then(color => {
            const getStyleValue = color.attr('style')
            if (getStyleValue == 'background-color: rgb(251, 252, 255);') {
                return 'White';
            } else if (getStyleValue == 'background-color: rgb(244, 214, 210);') {
                return 'Red'
            } else if (getStyleValue == 'background-color: rgb(246, 249, 219);') {
                return 'Yellow'
            } else if (getStyleValue == 'background-color: rgb(212, 227, 247);') {
                return 'Blue'
            } else {
                return 'Grey';
            }
        })
    }

    grab_background_color_links(currentOption) {
        return userHomeP.get_dropdown_options('.color-change ul li a', currentOption);
    }

    //Style attribute value before changing the color 
    old_background_color_style_value() {
        return cy.get('tbody tr').then(color => {
            return color.attr('style');
        })
    }

    //Style attribute value after changing the color
    new_bavkground_color_style_value() {
        return cy.get('table tbody tr').then(color => {
            return color.attr('style');
        })
    }

    //Background color change button
    background_color_change_btn() {
        return cy.get('.color-change button').should('have.attr', 'type', 'button').click().wait(500);
    }

    //Select new colors based on the text 
    select_new_background_color(color) {
        return cy.get('.color-change li').contains(color[faker.random.number({
            min: 0,
            max: color.length - 1
        })]).click().wait(1000);
    }

    //*<--END--> Change background color test case

    //*<--START--> Change registration status of all users available
    click_select_all() {
        return cy.get('th:visible [type="checkbox"]').eq(0).click().wait(1000);
    }

    status_batch_update_button() {
        return cy.get('#ddown1 button').contains('ステータス一括更新').click().wait(1000);
    }

    //grab ALL the registation status into an array
    grab_unique_registration_status(currentRegistrationStatus) {
        const dropdownLength = Cypress.$('.col-sm-2 #ddown1 ul li a').length;
        return cy.get('.col-sm-2 #ddown1 ul li a').then(dropdownText => {
            const newArray = []
            for (let i = 0; i < dropdownLength; i++) {
                newArray.push(dropdownText[i].innerText)
            }
            const uniqueStatus = newArray.filter(e => !currentRegistrationStatus.includes(e));
            return uniqueStatus;
        })
    }

    //Select random unique registration status
    select_random_unique_registration_status(uniqueStatus) {
        return cy.get('.col-sm-2 #ddown1 ul li a').contains(uniqueStatus[faker.random.number({
            min: 0,
            max: uniqueStatus.length - 1
        })]).click({
            force: true
        }).wait(1500);
    }


    find_all_checkboxes_checked_or_not() {
        return cy.get("td [type='checkbox']").should('be.checked').and('be.visible').wait(1000);
    }

    click_registration_batch_status_btn() {
        return cy.get('.col-sm-2 button').click().wait(500);
    }
    //*<--END--> Change registration status of all users available

    //*<--START--> Save initial search condition
    //After clicking on search button in the header
    via_link() {
        return cy.get('.modal-body a').contains('経由').click().wait(500);
    }

    click_via_own_website_checkBox() {
        return cy.get('.form-check.form-check-inline #own').should('not.be.checked').wait(200).click().should('be.checked').wait(600);
    }

    registrant_status_link() {
        return cy.get('.modal-body a').contains('登録者ステータス').click().wait(500);
    }

    select_previous_registrant_status(status) {
        return cy.get("#status .row div label").contains(status).should('not.be.checked').click({
            multiple: true
        }).wait(500);
    }

    //Table heading 
    via_btn() {
        return cy.get('#ddown-aria button').contains('経由').click().wait(500);
    }

    verify_via_own_website_checked_or_not() {
        return cy.get('th:nth-child(4) #own').should('be.checked').and('be.visible').wait(500);
    }

    registrant_status_btn() {
        return cy.get('#ddown-aria button').contains('登録者ステータス').click().wait(500);
    }

    verify_proper_registrant_status_checked_or_not(status) {
        return cy.get('th:nth-child(12) div.form-check label').contains(status).prev().should('be.checked').wait(500);
    }

    //Grab the total users available in the page currently
    get_visible_total_users_count() {
        return cy.get('tbody tr td').then(tableData => {
            // No users are present
            if (tableData.length == 1) {
                return '0';
            }
            // There are one or more users present 
            else if (tableData.length % 13 == 0) {
                debugger;
                return tableData.length / 13;
            }
        })
    }

    //*<--END--> Save initial search condition

    //*<--START--> Sort Age

    age_heading() {
        return cy.get('th').contains('年齢').should('be.visible').click().wait(1500);
    }
    //*<--END--> Sort Age
}

export default ClientApplicantPage;