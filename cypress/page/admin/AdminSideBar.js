class AdminSideBar {

    //*<-- START --> Sidebar
    //Company 
    company_module() {
        return cy.get(".side-menu.metismenu li:nth-child(2) a span").should('contain.text', 'Companies').click().wait(500);
    }

    //Company management
    company_management() {
        return cy.get(".side-menu.metismenu li:nth-child(2) ul li:nth-child(1) a").should('contain.text', "Company Management").click().wait(1000).url().should('contain', '/companies/companies');
    }

    //Company order
    company_order() {
        return cy.get('.side-menu.metismenu li:nth-child(2) ul li:nth-child(3) a').should('contain.text', 'Company Order').click().wait(1000).url().should('contain', '/companies/companyorder');
    }

    //Company Users
    company_users() {
        return cy.get('.side-menu.metismenu li:nth-child(2) ul li:nth-child(2) a').should('contain.text', 'Company Users').click().wait(1000).url().should('contain', '/companies/companyusers');
    }
    //*<-- END --> Sidebar

}
export default AdminSideBar;