class ClientSearchTemplatePage {

    total_template_count() {
        return cy.get('tr td').should('be.visible').then(templateCount => {
            return templateCount.length;
        })
    }

    total_delete_btn() {
        return cy.get('.btn-outline-danger').then(deleteBtn => {
            return deleteBtn.length;
        })
    }

    delete_btn(i) {
        return cy.get(`tbody tr:nth-child(${i}) button.btn-danger`).should('be.visible').click().wait(500);
    }

    delete_OK_btn() {
        return cy.get('.modal-content .btn-outline-danger').contains('OK').should('be.visible').click().wait(500);
    }

    validate_search_condition_name(text) {
        return cy.get('tr td:nth-child(1)').then(conditionName => {
            assert.deepEqual(conditionName[0].textContent, text, 'Validate if the search condition name is properly saved or not');
        })
    }

    validate_initial_search_condition_toggle_turned_on() {
        return cy.get('tr td:nth-child(2) label').should('be.visible').and('have.class', 'vue-js-switch toggled').wait(500);
    }
}
export default ClientSearchTemplatePage;