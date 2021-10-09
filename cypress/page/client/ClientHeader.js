class ClientHeader {

    //* <--START--> Header
    bloom_logo() {
        return cy.get('.header-logo a').should('be.visible').and('have.attr', 'href', '/applicant').click().wait(1000).url().should('contain', '/applicant').wait(1000);
    }

    //Grab the client/company name from the header for validation purpose
    client_name() {
        return cy.get('li.d-flex.align-items-center').then(text => {
            const textArr = text[0].textContent.split(' - ');
            return textArr[0];
        })
    }

    setting_icon() {
        return cy.get('#settings').should('be.visible').and('have.attr', 'href', '/setting').click().wait(1000).url().should('contain', '/setting');
    }

    search_template_icon() {
        return cy.get('#searchTemplate').should('be.visible').and('have.attr', 'href', '/searchTemplate').click().wait(1000).url().should('contain', '/searchTemplate').wait(2000);
    }

    grab_client_userName() {
        return cy.get('li.d-flex.align-items-center').then(text => {
            const firstArray = text[0].textContent.split(' - ');
            const secondArray = firstArray[1].split(' ');
            return secondArray[0];
        })
    }

    //!Check if the count of 'li' tag in header is 5 for clients with 'NO' admin access or not 
    //* NOTE: If the count is more than 5, then the admin has admin access
    grab_header_li_count() {
        return cy.get('.d-flex.header-ul li').should('have.length', 5).wait(1000);
    }

    logout_icon() {
        return cy.get('#logout').should('be.visible').and('have.attr', 'href', '/logout').wait(1000).click().wait(1500)
            .url().should('not.contain', '/applicant').wait(500);
    }
    //* <--END--> Header

}

export default ClientHeader;