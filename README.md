## Initial Steps
git clone
checkout to uat branch
copy cypess.example.json to cypress.env.json
npm init

### Test Data generation
When 'faker' is set to false in the environment, the Test Data needs to be given in the TestData for both client & Jobseeker.

### Register Flow control
If you don't want to register new client simply set the 'clientRegister' key to false in the environment. Similar steps for jobseekers too.

## Order Of execution of Spec files
1. CompanyModule
2. CompanyUser
3. User_Login_Register
4. User_Profile_Edit
5. CompanyAction
6. ClientApplicant
7. ClientRegistration
8. ClientSetting
