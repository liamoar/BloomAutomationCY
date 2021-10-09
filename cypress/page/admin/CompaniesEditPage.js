class CompaniesEditPage {

    short_description(text) {
        return cy.get("[name='short_description']").should('be.visible').clear().type(text).wait(1000);
    }

    location(text) {
        return cy.get('#company_location').should('be.visible').clear().type(text).wait(1000);
    }

    registration_page_title(text) {
        return cy.get('#registration_page_title').should('be.visible').clear().type(text).wait(1000);
    }

    linkText(text) {
        return cy.get('[name="link_text"]').should('be.visible').clear().type(text).wait(1000);
    }

    update_btn() {
        return cy.get(".ibox-footer [type='submit']")
            .should('be.visible').and('contain.text', 'Update').wait(500).click().wait(1000)
            .url().should('not.contain', '/edit');
    }

    alert_text() {
        return cy.get('.alert').should('be.visible').and('contain.text', 'Company updated successfully.').wait(500);
    }
}

export default CompaniesEditPage