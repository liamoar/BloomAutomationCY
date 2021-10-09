const faker = require('faker');

export function get_user_register_data() {
    if (Cypress.env('faker')) {
        const lastName = faker.name.lastName();
        const firstName = faker.name.firstName();
        const password = 'Reetik@123'
        const user_info = {
            lastName: lastName,
            firstName: firstName,
            SEI: lastName,
            MEI: firstName,
            DOB: {
                year: `${faker.random.number({
                    min: 1950,
                    max: 2002
                })}`,
                month: `${faker.random.number({
                    min: 10,
                    max: 12
                })}`,
                day: `${faker.random.number({
                    min: 10,
                    max: 30
                })}`
            },
            email: `${firstName}@mailinator.com`,
            password: password,
            graduation_school_name: faker.lorem.word(),
            graduation_faculty_name: faker.lorem.word(),
            graduation_year: `${faker.random.number({
                min: 1960,
                max: 2020
            })}`,
            most_recently_registered_company_name: faker.company.companyName(),
            years_of_enrollment: faker.random.number({
                min: 1,
                max: 20
            }),
            recent_income: faker.random.number({
                min: 1,
                max: 1000
            }),
            experienced_companies: faker.random.number({
                min: 1,
                max: 10
            }),
            job_offer: faker.lorem.sentence(),
            concerns: faker.lorem.sentence()
        }
        cy.writeFile('cypress/fixtures/user/UserRegisterDetails.json', user_info);
        return true;
    }
}