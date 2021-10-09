class CompanyUserCreatePage {

    company_dropdown() {
        return cy.get('#company option');
    }

    full_name(full) {
        return cy.get('#full_name').clear().type(full);
    }

    email_address(email) {
        return cy.get('#email').clear().type(email);
    }

    add_btn() {
        return cy.get(".row button[type='submit']").should('contain.text', 'Add').click().wait(350)
    }

    admin_btn_no() {
        return cy.get('label:nth-child(2) .input-span').eq(0).should('be.visible').click().wait(500);
    }
}

export default CompanyUserCreatePage;