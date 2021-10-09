class UserHeader {

    change_password_icon() {
        return cy.get('.header-section .d-flex.header-ul li:nth-child(1) a').should('be.visible').click().wait(500).url().should('contain', '/change-password').wait(400);
    }

    logout_icon() {
        return cy.get('.fa.fa-sign-out').should('be.visible').click().wait(1000).url().should('contain', '/login').wait(1000);
    }
}

export default UserHeader;