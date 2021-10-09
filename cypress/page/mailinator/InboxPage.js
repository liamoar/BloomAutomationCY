class InboxPage {
    received_mail() {
        return cy.get('.jambo_table tbody > tr:nth-child(1)', {
            timeout: 30000
        }).click(40, 5).wait(1000);
    }
}

export default InboxPage;