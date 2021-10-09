import UserHomePage from '../user/UserHomePage'
import ClientApplicantPage from '../client/ClientApplicantPage'
const clientApplicantPage = new ClientApplicantPage();
const userHomeP = new UserHomePage();
const faker = require('faker');

class JobseekersPage {

    search_btn() {
        return cy.get("[data-target='#searchForm']").should('be.visible').and('have.text', 'Search').wait(500).click().wait(500);
    }

    //*<--START-->After clicking on search button
    //Inside the popup
    select_currently_registered_company(current) {
        return cy.get('.row div:nth-child(3) .col-sm-8 label').contains(current)
            .siblings('input').click({
                force: true
            }).wait(500);
    }

    free_search(text) {
        return cy.get(".col-sm-10 input[name='free']").scrollIntoView().wait(600).type(text).wait(500);
    }

    search_btn_popup() {
        return cy.get("#download[type='submit']").should('be.visible').and('have.text', 'Search').wait(500).click().wait(1000);
    }
    //*<--END-->After clicking on search button

    grab_search_box_value() {
        return cy.get('#key-search').should('be.visible').then(search => {
            return search.val();
        })
    }

    //*<--START--> Inside the table of the jobseekers
    grab_company_name() {
        return cy.get('td:nth-child(2)').should('be.visible').then(name => {
            return name.text().trim();
        })
    }

    grab_jobseeker_name() {
        return cy.get('td:nth-child(4)').should('be.visible').then(name => {
            return name.text().trim();
        })
    }

    //<--START--> Like jobseekers test case
    click_like_icon() {
        return cy.get('td .fa.fa-thumbs-o-up').click().wait(500);
    }

    click_unlike_icon() {
        return cy.get('td .fa.fa-thumbs-up').click().wait(500);
    }

    select_new_registration_status(status) {
        return cy.get('td:nth-child(12) button').should('be.visible').contains(status).click().wait(500);
    }

    thumbs_up_icon() {
        return cy.get('td:nth-child(10) i').should('be.visible');
    }

    like_icon_class() {
        return 'fa fa-thumbs-o-up'
    }

    unlike_icon_class() {
        return 'fa fa-thumbs-up'
    }
    //<--END--> Like jobseekers test case

    //<--START--> Change registration status test case
    grab_current_registration_status_text() {
        return cy.get('td:nth-child(12) button').eq(0).scrollIntoView().should('be.visible').then(reg => {
            return reg.text().trim();
        })
    };

    grab_new_registration_status_text() {
        return cy.get('td:nth-child(12) div button').eq(0).scrollIntoView().should('be.visible').then(reg => {
            return reg.text().trim();
        })
    }

    click_registration_button() {
        return cy.get('td:nth-child(12) button').eq(0).scrollIntoView().should('be.visible').click().wait(500);
    }

    grab_registration_status_options(listOptions) {
        return userHomeP.get_dropdown_options('td:nth-child(12) li a', listOptions);
    }

    //Select random unique registration status
    select_random_registration_status(uniqueStatus) {
        return cy.get('td:nth-child(12) li a').contains(uniqueStatus[faker.random.number({
            min: 0,
            max: uniqueStatus.length - 1
        })]).click({
            force: true
        }).wait(500);
    }
    //<--END--> Change registration status test case

    //<--START--> Change background color test case
    click_background_color_btn() {
        return cy.get('td:nth-child(13) button').eq(0).scrollIntoView().should('be.visible').click().wait(500);
    }

    get_current_background_color() {
        return cy.get('tbody tr').then(color => {
            const getStyleValue = color.attr('style')
            if (getStyleValue == 'background-color: #fbfcff;') {
                return 'White';
            } else if (getStyleValue == 'background-color: #f4d6d2;') {
                return 'Red'
            } else if (getStyleValue == 'background-color: #f6f9db;') {
                return 'Yellow'
            } else if (getStyleValue == 'background-color: #d4e3f7;') {
                return 'Blue'
            } else {
                return 'Grey';
            }
        })
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

    grab_background_color_links(options) {
        return userHomeP.get_dropdown_options('td:nth-child(13) li a', options);
    }

    select_new_background_color(color) {
        return cy.get('td:nth-child(13) li a').contains(color[faker.random.number({
            min: 0,
            max: color.length - 1
        })]).click({
            force: true
        }).wait(1000);
    }
    //<--END--> Change background test case

    //<--START--> ADD memo test case
    click_memo_icon() {
        return cy.get('button > i.fa.fa-sticky-note').scrollIntoView().should('be.visible').click().wait(500);
    }

    type_inside_textArea(text) {
        return cy.get(".modal-body div.text-center.mb-2 > textarea[name='memo']:visible").should('be.visible').clear().type(text).wait(500);
    }

    memo_update_btn() {
        return cy.get(".text-center > [type='submit']").contains('Update').click({
            force: true
        }).wait(1000);
    }
    //<--END--> ADD memo test case

    //<--START--> Verify jobseeker profile test case
    grab_jobseeker_fullName_popup() {
        return this.grab_text('h4');
    }

    grab_jobseeker_DOB_popup() {
        return cy.get('.sections li:nth-child(1) span').then(DOB => {
            const DOBArr = DOB.text().split(' ')
            return DOBArr[0];
        })
    }

    grab_jobseeker_email_popup() {
        return this.grab_text('.sections li:nth-child(4) a > span');
    }

    grab_most_recently_registered_company_name_text_popup() {
        return cy.get('.col-md-6:nth-child(1) ul:nth-child(1) li').then(company => {
            const companyText = company.text().trim().split(': ');
            return companyText[1];
        })
    }

    grab_job_offers_text_popup() {
        return this.grab_text('.profile-detail-block div:nth-child(5) .col-md-12 li:nth-child(2)')
    }

    grab_concerns_text_popup() {
        return this.grab_text('.profile-detail-block div:nth-child(6) .col-md-12 li:nth-child(2)');
    }

    //? Grab text of passed element
    grab_text(selector) {
        return cy.get(selector).then(text => {
            return text.text();
        })
    }

    //? Add memo 
    click_memo_icon_popup() {
        return cy.get('a > .fa.fa-sticky-note').should('be.visible').click().wait(500);
    }

    type_inside_textArea_popup(text) {
        return cy.get("[name='memo']:visible").should('be.visible').clear().type(text).wait(500);
    }

    memo_update_btn_popup() {
        return cy.get("button[type='submit']").contains('Update').click({
            force: true
        }).wait(1000);
    }

    //<--END--> Verify jobseeker profile test case
    click_jobseeker_profile() {
        return cy.get('tbody tr').should('be.visible').and('have.length', 1).click().wait(500);
    }

    click_unlike_icon_popup() {
        return cy.get('.modal-body .fa.fa-thumbs-up').click().wait(500);
    }

    click_like_icon_popup() {
        return cy.get('.modal-body .fa.fa-thumbs-o-up').click().wait(500);
    }

    thumbs_up_icon_popup() {
        return cy.get('.favorite-change i');
    }

    grab_registration_status_options_popup(listOptions) {
        return userHomeP.get_dropdown_options('.prof-head-left div:nth-child(3) li a', listOptions);
    }

    //Select random registration status
    select_random_registration_status_popup(unique) {
        return cy.get('.prof-head-left div:nth-child(3) li a').contains(unique[faker.random.number({
            min: 0,
            max: unique.length - 1
        })]).click({
            force: true
        }).wait(1000);
    }

    grab_current_registration_status_text_popup() {
        return cy.get('.prof-head-left div:nth-child(3) button').should('be.visible').then(status => {
            return status.text().trim();
        })
    }

    grab_new_registration_status_text_popup() {
        return cy.get('.prof-head-left div:nth-child(3) div button').should('be.visible').then(status => {
            return status.text().trim();
        })
    }

    click_registration_button_popup() {
        return cy.get('.prof-head-left div:nth-child(3) button').should('be.visible').click().wait(500);
    }

    close_btn_popup() {
        return cy.get('.modal-footer .btn.btn-secondary').contains('Close').should('be.visible').and('have.text', 'Close').click().wait(1000);
    }

    //ALERT
    updated_alert() {
        return cy.get('.alert').should('be.visible').and('contain.text', 'Successfully updated').wait(500);
    }

    close_alert() {
        return cy.get('.alert .close').should('be.visible').click({
            force: true
        }).wait(500);
    }

    //*<--END--> Inside the table of the jobseekers

}

export default JobseekersPage;