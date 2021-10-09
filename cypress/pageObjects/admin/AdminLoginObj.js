import AdminLoginPage from '../../page/admin/AdminLoginPage'
import AdminHeader from '../../page/admin/AdminHeader'
const adminLoginP = new AdminLoginPage();
const adminHeaderP = new AdminHeader();

const username = Cypress.env(Cypress.env("currentURL")).admin.username;
const password = Cypress.env(Cypress.env("currentURL")).admin.password


export function getCurrrentAdminUrl() {
    return Cypress.env(Cypress.env("currentURL")).admin.url;
}

export function admin_login() {
    adminLoginP.username_field(username);
    adminLoginP.password_field(password);
    adminLoginP.login_btn();
}

export function admin_url_visit_and_login() {
    cy.visit(getCurrrentAdminUrl() + '/auth/login').url().should('contain', 'auth/login');
    admin_login();
}

export function admin_logout() {
    //Click on 'Admin User' link 
    adminHeaderP.admin_user_link();
    //Click on logout link
    adminHeaderP.logout_link();
}