class UserLoginPage {

    username(email) {
        return cy.get("[name='username']").clear().type(email).wait(400);
    }

    password(pass) {
        return cy.get("[name='password']").clear().type(pass).wait(400);
    }

    login_btn() {
        return cy.get("[type='submit']").click().wait(2000).url().should('not.contain', '/login').wait(400);
    }
}

export default UserLoginPage;