//Gets entire User profile from the Response of the given API
export function get_user_profile_from_API() {
    return cy.readFile('cypress/fixtures/user/UserToken.json').then(data => {
        debugger
        return cy.request({
            url: `${Cypress.env(Cypress.env(Cypress.env('currentURL')).admin).url}/job_seeker_api/v1/profile`,
            headers: {
                Authorization: data.access_token
            }
        }).then(response => {
            return response.body;
        })
    })
}