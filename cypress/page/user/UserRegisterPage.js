class UserRegisterPage {

    check_heading() {
        return cy.get('h2').should('have.text', 'キャリア登録');
    }

    last_name(last) {
        return cy.get("[name='last_name']").clear().type(last).wait(400);
    }

    first_name(first) {
        return cy.get("[name='full_name']").clear().type(first).wait(400);
    }

    sei(last) {
        return cy.get("[name='last_furigana']").clear().type(last).wait(400);
    }

    mei(first) {
        return cy.get('[name="furigana"]').clear().type(first).wait(400);
    }

    gender() {
        return cy.get('#exampleRadios1').should('be.visible').and('have.attr', 'name', 'gender').click().wait(400);
    }

    DOB_year(year) {
        return cy.get("[name='year']").select(year).wait(400);
    }

    DOB_month(month) {
        return cy.get("[name='month']").select(month).wait(400);
    }

    DOB_day(day) {
        return cy.get("[name='day']").select(day).wait(400);
    }

    residence(residence) {
        return cy.get("[name='residence']").select(residence).wait(400);
    }

    email_address(email) {
        return cy.get("[name='email']").clear().type(email).wait(400);
    }

    password(pass) {
        return cy.get("[name='password']").clear().type(pass).wait(400);
    }

    con_password(con) {
        return cy.get("[name='password_confirmation']").clear().type(con).wait(400);
    }

    final_education(final) {
        return cy.get("[name='final_education']").select(final).wait(400);
    }

    graduation_school_name(school_name) {
        return cy.get("[name='graduation_school_name']").clear().type(school_name).wait(400);
    }

    graduation_faculty_name(faculty_name) {
        return cy.get("[name='graduation_department_name']").clear().type(faculty_name).wait(400);
    }

    graduation_year(year) {
        return cy.get("[name='year_of_graduation']").select(year).wait(400);
    }

    most_recently_registered_company_name(name) {
        return cy.get("[name='recent_registered_company_name']").clear().type(name).wait(400);
    }

    years_of_enrollment(enroll) {
        return cy.get("[name='years_of_attendance']").clear().type(enroll).wait(400);
    }

    recent_occupation_major(recent) {
        return cy.get("[name='latest_occupation_main_title']").select(recent).wait(400);
    }

    recent_occupation_middle(middle) {
        return cy.get("[name='latest_occupation_sub_title']").select(middle).wait(400);
    }

    employment_from(emp) {
        return cy.get("[name='employment_status']").select(emp).wait(400);
    }

    position(pos) {
        return cy.get("[name='position']").select(pos).wait(400);
    }

    english_ability(english) {
        return cy.get("[name='english_skills']").select(english).wait(400);
    }

    recent_income(income) {
        return cy.get("[name='last_year_income']").clear().type(income).wait(400);
    }

    experienced_companies(exp) {
        return cy.get("[name='number_of_experience_companies']").clear().type(exp).wait(400);
    }

    job_offer(offerText) {
        return cy.get("[name='job_summary']").clear().type(offerText).wait(400);
    }

    concerns(text) {
        return cy.get("[name='career_change_reason']").clear().type(text).wait(400);
    }

    current_intentions() {
        return cy.get("input[value='5c1ce4719254bb58b4866c63']").click().wait(400);
    }

    status_of_work_preparation() {
        return cy.get("input[value='5c1ce4719254bb58b4866c66']").click().wait(400);
    }

    registration_btn() {
        return cy.get(".btn").click().wait(400).url().should('contain', '/preview');
    }
}

export default UserRegisterPage;