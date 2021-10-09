class CompaniesCreatePage {

    //*<-- Company section -->
    //Company name
    company_name_field(name) {
        return cy.get("#company_name").type(name).wait(350);
    }

    short_description(description) {
        return cy.get("[name='short_description']").type(description).wait(350);
    }

    registration_page_title(pageTitle) {
        return cy.get("#registration_page_title").type(pageTitle).wait(350);
    }

    slug(slug) {
        return cy.get("[name='slug']").type(slug).wait(350);
    }

    position(number) {
        return cy.get("[name='position']").type(number).wait(350);
    }

    location(location) {
        return cy.get("#company_location").type(location).wait(350);
    }

    //Type text inside iframe
    description(description) {
        return cy.get('#meta_description_ifr').then($iframe => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type(description);
        })
    }

    //Upload company logo
    company_logo(filepath) {
        return cy.get('#company_logo').attachFile(filepath).wait(350);
    }

    link_text(text) {
        return cy.get("#link_text").type(text).wait(350);
    }

    //*<-- Default User Section -->
    username(username) {
        return cy.get("#user_name").type(username).wait(350);
    }

    email_address(email) {
        return cy.get("#email").type(email).wait(350);
    }

    password(password) {
        return cy.get("[name='password']").type(password).wait(350);
    }

    confirm_password(conpass) {
        return cy.get("[name='confirm_password']").type(conpass).wait(350);
    }

    //Select send activation link radio button
    send_activation_link_btn() {
        return cy.get('#is_activation_link').click().wait(350);
    }

    add_btn() {
        return cy.get(".ibox-footer.row button").click().url().should('not.contain', '/create');
    }

}
export default CompaniesCreatePage;