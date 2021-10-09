import CompanyOrderPage from '../../page/admin/CompanyOrderPage';
import SideBar from '../../page/admin/AdminSideBar';
const sideP = new SideBar();
const companyOrderP = new CompanyOrderPage();
const faker = require('faker');

export function change_client_order() {

    //Click company order
    sideP.company_order();

    //Grab the text of the first company from the table
    companyOrderP.first_company_name().then(firstCompanyName => {
        cy.log(firstCompanyName);

        //Grab the position of first company before re-ordering
        companyOrderP.old_first_company_position().then(oldFirstCompanyPosition => {
            debugger;
            //Generate position always greater than current first tr position
            const randomPosition = faker.random.number({
                //Min should be greater than the older company position
                min: oldFirstCompanyPosition + 1,
                max: oldFirstCompanyPosition + 10
            })
            //Change the position only if new position is greater than the older one 
            if (randomPosition > oldFirstCompanyPosition) {

                companyOrderP.change_first_company_position(randomPosition);
            }
            //Click on reorder button
            companyOrderP.reorder_btn();
            //Valdiate if Successfully reordered alert is shown or not and then CLOSE it.
            companyOrderP.success_reorder_alert();
            companyOrderP.close_alert();

            //Verify if the position of company has changed or not after reordering
            companyOrderP.new_first_company_position(firstCompanyName).then(newPosition => {
                cy.log(`The position of ${firstCompanyName} before reordering was ${oldFirstCompanyPosition}`);
                cy.log(`The position of ${firstCompanyName} after reordering is ${newPosition}`);
                assert.notDeepEqual(newPosition, oldFirstCompanyPosition, 'Validate if the position has changed or not after Reordering it!!');
                cy.wait(1000);
                //Validate if the postion has changed or not after clicking Reorder button
                assert.deepEqual(newPosition, randomPosition, 'Validate if the previous position set is saved or not');
            })
        })
    })
}