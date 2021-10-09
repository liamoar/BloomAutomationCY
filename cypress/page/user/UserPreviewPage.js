class UserPreviewPage {

    fix_btn() {
        return cy.get('.btn.btn-outline-primary').should('be.visible').click().url().should('not.contain', '/preview');

    }

    registration_btn() {
        return cy.get('.btn.btn-primary').should('be.visible').click().url().should('contain', '/thank-you');
    }

    check_heading() {
        return cy.get('.profile-head h2').should('be.visible').and('have.text', '入力内容の確認');
    }
}

export default UserPreviewPage;