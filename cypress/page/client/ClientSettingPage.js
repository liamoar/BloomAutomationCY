class ClientSettingPage {

    check_change_password_heading() {
        return cy.get('h2.mb-5').should('be.visible').and('have.text', 'パスワードの変更').wait(500);
    }

    current_password(pass) {
        return cy.get("[name='current_password']").type(pass).wait(500);
    }

    new_password(pass) {
        return cy.get("[name='new_password']").type(pass).wait(500);
    }

    confirm_new_password(pass) {
        return cy.get("#confirm_password").type(pass).wait(500);
    }

    reset_btn() {
        return cy.get("[type='submit']").should('be.visible').and('contain.text', 'リセット').click().wait(1000);
    }

    alert_message_text() {
        return cy.get('.alert span').should('be.visible').and('have.text', 'パスワードの変更が完了しました').wait(500);
    }

}

export default ClientSettingPage;