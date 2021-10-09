class MailinatorHomePage {

    search_box(text) {
        return cy.get('#addOverlay').type(text + '{enter}').wait(1000);
    }
}

export default MailinatorHomePage;