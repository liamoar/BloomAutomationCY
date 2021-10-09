class AdminHeader {

    //*<-- START --> Header
    //Current Language section
    current_language_section() {
        return cy.get(".language-dropdown").should('be.visible').click().wait(300);
    }

    grab_current_language() {
        return cy.get("#selectedvalue").then(current => {
            return current.text();
        })
    }

    grab_new_language() {
        return cy.get("span#selectedvalue").then(lang => {
            return lang.text();
        })
    }

    bloom_logo() {
        return cy.get('.brand-logo').click().wait(500);
    }

    select_english_language() {
        return cy.get(".header .language-list-item span").contains("English").click().wait(1500);
    }

    admin_user_link() {
        return cy.get(".header ul:nth-child(2) li:nth-child(1) > a[data-toggle='dropdown']").should('be.visible')
            .children().should('contain.text', 'Admin User').wait(500).parent().click().wait(1000);
    }

    logout_link() {
        return cy.get('.admin-menu-content a').should('be.visible').and('have.attr', 'href', '/auth/logout').wait(500).click().wait(1000)
            .url().should('contain', '/auth/login').wait(500);
    }
    //*<-- END --> Header

}
export default AdminHeader;