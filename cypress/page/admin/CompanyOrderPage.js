const faker = require('faker')
class CompanyOrderPage {

    //Grab the company name of the first row from the table
    first_company_name() {
        return cy.get('.table tr:nth-child(1) td:nth-child(1)').then(company => {
            return company.text();
        })
    }

    //Grab the position/value of the company of first row before reordering
    old_first_company_position() {
        return cy.get('.table tr:nth-child(1) td:nth-child(1) .position_input').then(position => {
            position.removeAttr('type');
            return parseInt(position.val());
        })
    }

    //Change the position of the first company to the one greater than the older one
    change_first_company_position(text) {
        return cy.get('.table tr:nth-child(1) td:nth-child(1) .position_input').clear().type(text).wait(1000);
    }

    //Reorder button
    reorder_btn() {
        return cy.get("[value='Reorder']").should('have.attr', 'type', 'submit').click().wait(1500);
    }

    //Successfully reordered alert
    success_reorder_alert() {
        return cy.get('.alert').should('be.visible').and('contain.text', 'Successfully reordered.').wait(1000);
    }

    close_alert() {
        return cy.get('.alert .close').should('be.visible').click().wait(500);
    }
    //Grab the position of the company of first row after reordering
    new_first_company_position(firstCompanyName) {
        return cy.get(`tbody tr td:contains(${firstCompanyName})`).then(position => {
            debugger;
            return parseInt(position.find('input:nth-child(2)').val());
        });
    }
}

export default CompanyOrderPage;