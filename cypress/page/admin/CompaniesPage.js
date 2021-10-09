class CompaniesPage {

    add_new_btn() {
        return cy.get(".add-right a").should('contain.text', 'Add New').and('be.visible').click().wait(1000).url().should('contain', '/create');
    }

    //Grab the total companies avilable before registration
    old_total_companies_count() {
        return cy.get("#datatable_info").then(entry => {
            const text = entry.text();
            const data = text.split(' ');
            data.pop();
            return data[data.length - 1];
        })
    }

    //Grab the total available companies after successful registration
    new_total_companies_count() {
        return cy.get("[role='status']").then(entry => {
            const text = entry.text();
            const data = text.split(' ');
            data.pop();
            return data[data.length - 1];
        })
    }

    //Alert box
    company_added_alert() {
        return cy.get('.alert').should('be.visible').and('contain.text', 'Company added successfully.').wait(500);
    }

    //Search box
    search_box(text) {
        return cy.get('#key-search').should('be.visible').and('have.attr', 'placeholder', 'Search ...').type(text).wait(500);
    }

    //Grab link from info of the company at the table
    grab_user_registration_link() {
        return cy.get('.p-url').then(data => {
            const linkText = data.text();
            const linkArray = linkText.split('Link:');
            return linkArray[linkArray.length - 1].trim();
        })
    }

    //* <--START--> Status column
    //Grab the current status of the company
    grab_current_company_status() {
        return cy.get('.btn.btn-info.btn-sm.dropdown-toggle').then(status => {
            let statusText = status.text().trim();
            return statusText;
        })
    }

    select_new_company_status(text) {
        return cy.get('td:nth-child(6) li a').contains(text).click().wait(500);
    }

    click_company_status_btn() {
        return cy.get('.dropdown > .btn').click();
    }
    //* <--END--> Status column

    //* <--START--> Action Column
    first_action_icon() {
        return cy.get('td .fa-users').should('be.visible').click().wait(1000)
            .url().should('contain', '/companyusers?company=').wait(500);
    }

    second_action_icon() {
        return cy.get('td .fa-search').should('be.visible').click().wait(1000)
            .url().should('contain', '/jobseekers/jobseekers?company=').wait(500);
    }

    third_action_icon() {
        return cy.get('td .ti-pencil-alt').should('be.visible').click().wait(1000)
            .url().should('contain', '/edit').wait(500);
    }
    //* <--END--> Action Column

}

export default CompaniesPage;