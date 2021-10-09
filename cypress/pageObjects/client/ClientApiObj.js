//* Grab the response of applicant API of only a 'searched' USER

const currentAdminURL = Cypress.env(Cypress.env(Cypress.env('currentURL')).admin).url;
export function grab_Specific_user_profile_From_Applicant_API() {
    return cy.readFile('cypress/fixtures/user/UserRegisterDetails.json').then(userDetails => {
        cy.readFile('cypress/fixtures/client/ClientToken.json').then(token => {
            cy.request({
                url: `${currentAdminURL}/client_api/v1/applicant`,
                method: 'GET',
                //Sending query parameters to in request URL
                qs: {
                    word: userDetails.email,
                    page: 1
                },
                headers: {
                    Authorization: token.access_token
                }
            }).then(response => {
                debugger;
                return response.body.data[0];
            })
        })
    })
}

//Return unique registration status in the form of array
export function grab_unique_registrant_status_from_applicant_API() {
    return cy.readFile('cypress/fixtures/client/ClientToken.json').then(token => {
        cy.request({
            url: `${currentAdminURL}/client_api/v1/applicant`,
            qs: {
                page: 1
            },
            headers: {
                Authorization: token.access_token
            }
        }).then(response => {
            const responseArray = [];
            const responseBody = response.body.data;
            //Push all the avaiable Status into an array
            responseBody.forEach(a => {
                responseArray.push(a.status);
            })
            //Return only unique registration status of the available users by converting to set and back to array
            let uniqueStatus = [...new Set(responseArray)];
            return uniqueStatus;
        })
    })
}

export function user_registration_via_own_website_count() {
    return cy.readFile('cypress/fixtures/client/ClientToken.json').then(token => {
        cy.request({
            url: `${currentAdminURL}/client_api/v1/applicant`,
            qs: {
                page: 1
            },
            headers: {
                Authorization: token.access_token
            }
        }).then(response => {
            const responseArray = []
            const responseBody = response.body.data;

            //Push all available registration via into the array
            responseBody.forEach(a => {
                responseArray.push(a.companyFrom);
            })
            //Filter the array to contain only '*' ( * => Via own website)
            const filteredArray = responseArray.filter(e => e == '*');
            //Return the length of the array containing only via own website registration
            debugger;
            return filteredArray.length;
        })
    })
}

//Grab the unsorted ages of users at first page into an array
export function grab_unsorted_user_ages_from_applicant_API() {
    return cy.readFile('cypress/fixtures/client/ClientToken.json').then(token => {
        cy.request({
            url: `${currentAdminURL}/client_api/v1/applicant`,
            qs: {
                page: 1
            },
            headers: {
                Authorization: token.access_token
            }
        }).then(response => {
            let ageArray = [];
            const actualResponse = response.body.data
            actualResponse.forEach(a => {
                //Push the age of user into an array;
                ageArray.push(a.age);
            })
            return ageArray;
        })
    })
}

//Grab the user ages sorted in ascending order of first page into an array
export function grab_ascending_user_ages_from_applicant_API() {
    return cy.readFile('cypress/fixtures/client/ClientToken.json').then(token => {
        return cy.request({
            url: `${currentAdminURL}/client_api/v1/applicant?sort=-birth_date`,
            qs: {
                page: 1
            },
            headers: {
                Authorization: token.access_token
            }
        }).then(response => {
            let ageArray = [];
            const actualResponse = response.body.data
            actualResponse.forEach(a => {
                //Push the age of user into an array;
                ageArray.push(a.age);
            })
            return ageArray;
        })
    })
}

//Grab the user ages sorted in desceding order of first page into an array
export function grab_descending_user_ages_from_applicant_API() {
    return cy.readFile('cypress/fixtures/client/ClientToken.json').then(token => {
        return cy.request({
            url: `${currentAdminURL}/client_api/v1/applicant?sort=birth_date`,
            qs: {
                page: 1
            },
            headers: {
                Authorization: token.access_token
            }
        }).then(response => {
            let ageArray = [];
            const actualResponse = response.body.data
            actualResponse.forEach(a => {
                //Push the age of user into an array;
                ageArray.push(a.age);
            })
            return ageArray;
        })
    })
}