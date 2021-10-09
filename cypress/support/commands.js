import 'cypress-file-upload'

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("checkFileExists", (filePath) => {
    return cy.task('checkFileExists', filePath).then(result => {
        if (result) {
            return true;
        }
    })
})

Cypress.Commands.add("getFilesData", (filePath) => {
    return cy.task('getFilesdata', filePath).then(result => {
        return result;
    })
})

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach((key) => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('switchToIframe', (iframeSelector, ...elSelector) => {
    return cy.get(`${iframeSelector || ''}`).should($iframe => {
        for (let i = 0; i < elSelector.length; i++) {
            expect($iframe.contents().find(elSelector[i] || 'body')).to.exist;
        }
    }).then($iframe => {
        return cy.wrap($iframe.contents().find('body'));
    });
})