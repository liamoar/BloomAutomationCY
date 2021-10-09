class CompanyUsersPage {

    add_new_btn() {
        return cy.get('.add-right').should('be.visible').and('contain.text', 'Add New').click().wait(350);
    }

    search_box(search) {
        return cy.get('#key-search').should('be.visible').and('have.attr', 'placeholder', 'Search ...').wait(500)
            .type(search).wait(500);
    }

    grab_client_name() {
        return cy.get('tr td:nth-child(2)').should('be.visible').then(name => {
            return name.text();
        })
    }
}

export default CompanyUsersPage