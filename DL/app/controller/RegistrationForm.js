/**
 * Created with JetBrains WebStorm.
 * User: ikush
 * Date: 4/8/14
 * Time: 6:45 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('DL.controller.RegistrationForm', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            form: {
                xtype: 'registration-form',
                selector: 'registration-form'
            }

        },
        control: {
        }
    }
});