class UserRegistrationHomePage {

    registration_heading() {
        return cy.get('h1').should('be.visible').wait(500).then($h1 => {
            return $h1.text();
        })
    }

    proceed_to_registration_button() {
        return cy.get('.btn', {
            timeout: 10000
        }).click().url().should('contain', '/register');
    }

    login_link() {
        return cy.get('.login-link').should('have.attr', 'href', '/login').wait(500)
            .children().should('have.text', '登録済みの方で、登録情報の修正をご希望の場合はこちらからログインください').wait(500).click()
            .url().should('contain', '/login').wait(500);
    }
}

export default UserRegistrationHomePage;