class AdminLoginPage {

    //username
    username_field(username) {
        return cy.get("input[name='username']").type(username).wait(1000);
    }
    //password
    password_field(password) {
        return cy.get("input[name='password']").type(password).wait(1000);
    }

    //login button
    login_btn() {
        return cy.get("button[type='submit']").click().wait(2000).url().should('not.contain', '/login');
    }
}

export default AdminLoginPage;