class UserChangePasswordPage {

    old_password(old) {
        return cy.get("[name='old_password']").clear().type(old).wait(400)
    }

    new_password(newPass) {
        return cy.get("[name='password']").clear().type(newPass).wait(400);
    }

    confirm_new_password(confirm) {
        return cy.get("[name='password_confirmation']").clear().type(confirm).wait(400);
    }

    save_changes_btn() {
        return cy.get(".btn-toolbar button").should('have.text', '変更を保存').and('be.visible').click().wait(500);
    }

    password_changed_popup() {
        return cy.get('.swal-modal').should('be.visible').wait(500);
    }

    password_changed_text() {
        return cy.get('.swal-title').should('be.visible').and('have.text', 'パスワードを変更しました。').wait(500);
    }

    password_changed_OK() {
        return cy.get('.swal-footer button').should('be.visible').and('have.text', 'はい').click().wait(3000);
    }
}

export default UserChangePasswordPage;