class ClientLoginPage {

    email(email) {
        return cy.get("[name='email']").type(email).wait(500);
    }

    password(pass) {
        return cy.get("[name='password']").type(pass).wait(500);
    }

    login_btn() {
        return cy.get('[type="submit"]').should('be.visible').and('have.text', 'ログイン').click().wait(2000).url().should('contain', '/applicant').wait(500);
    }
}

export default ClientLoginPage