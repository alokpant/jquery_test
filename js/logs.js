/**
 * Created by ash on 4/7/17.
 * This class will hold all the calls for login/logout/register/forgotpassword.
 */

class Logs{

    /**
     * Generates login form when clicked on login link
     */

    GenerateLoginForm(){
        BootstrapDialog.show({
            title: 'Sign In',
            message: 'Your sign-in form goes here.',
            cssClass: 'login-dialog',
            buttons: [{
                label: 'Sign In Now!',
                cssClass: 'btn-primary',
                action: function(dialog){
                    dialog.close();
                }
            }]
        });
    }

    /**
     * Deals with login, calls api returns back false for error, true for success
     */

    LoginOnly(){

    }

    /**
     * Deals with logout. Kills all sessions variables
     */

    LogoffOnly(){

    }

    /**
     * Deals with new registration.
     */

    NewRegistration(){


    }

    /**
     * Deals with forgot password
     */

    ForgotPassword(){

    }




}
