import * as userProfileEditObj from '../../pageObjects/user/UserProfileEditObj'
import * as userLoginObj from '../../pageObjects/user/UserLoginObj'
import * as userEducationalBackgroundEditObj from '../../pageObjects/user/UserEducationalBackgroudEditObj'
import * as userWorkHistoryEditObj from '../../pageObjects/user/UserWorkHistoryEditObj'

describe('Profile Edit Scenario', () => {
    before(() => {
        userLoginObj.visitCurrentUserUrl();
        userLoginObj.NEW_user_login();
        userLoginObj.check_full_name();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.wait(1500);
    });

    afterEach(() => {
        cy.saveLocalStorage();
    })

    it('Validate if the user can change their password', () => {
        userProfileEditObj.validate_change_password();
    });

    it('Validate if the user can edit their profile details', () => {
        userProfileEditObj.edit_profile();
    })

    it('Validate if the user can edit their educational background', () => {
        userEducationalBackgroundEditObj.edit_educational_background();
    })

    it('Validate if the user can edit their work history', () => {
        userWorkHistoryEditObj.edit_work_history();
    })
});