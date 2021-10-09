class ClientPasswordSettingPage {

    email_address(email) {
        return cy.get('[name="email"]').should('be.visible').type(email).wait(500);
    }

    password(pass) {
        return cy.get("[name='password']").should('be.visible').type(pass).wait(500);
    }

    con_password(pass) {
        return cy.get("[name='confirm_password']").should('be.visible').type(pass).wait(500);
    }

    registration_btn() {
        return cy.get('[type="submit"]').should('be.visible').and('contain.text', '登録').click().wait(500).url().should('not.contain', '/set');
    }

    check_header() {
        return cy.get('h2').should('be.visible').and('contain.text', 'パスワード設定').wait(500);
    }

    check_alert_visibility() {
        return cy.get(".alert").should('be.visible').wait(1000);
    }
}

export default ClientPasswordSettingPage;