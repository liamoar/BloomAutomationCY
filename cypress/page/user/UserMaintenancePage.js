class UserMaintenancePage {

    check_error_imamge() {
        return cy.get('.error-image', {
            timeout: 5000
        }).should('be.visible').wait(500);
    }

    check_h1() {
        return cy.get('h1', {
            timeout: 5000
        }).should('be.visible').and('contain.text', 'ただいまメンテナンス作業を行っております。').wait(500);
    }

    check_404_message() {
        return cy.get('p', {
            timeout: 5000
        }).should('be.visible').and('contain.text', 'Page not found').wait(500);
    }
}

export default UserMaintenancePage;