/**
 * Created with JetBrains WebStorm.
 * User: ikush
 * Date: 4/8/14
 * Time: 6:45 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('DL.controller.RegistrationForm', {
    extend: 'Ext.app.Controller',

    requires:[
        'Ext.Ajax'
    ],

    config: {
        refs: {
            registrationForm:{
                xtype:'registration-form',
                selector: 'registration-form',
                autoCreate:true
            }
        },
        control: {
            registrationForm: {
                submitRegistrationForm: 'sendRegistrationRequest'
            }

        }
    },

    sendRegistrationRequest: function(data){
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: '/signup',
            params: {
                password: data.password,
                firstName:data.name,
                secondName: data.surname,
                email: data.email,
                role: data.role,
                title: data.status,
                sex: data.sex,
                birthDay: data.birthday
            },
            success: function(response){
                var text = response.responseText;
                if(text != 'false'){
                    me.getRegistrationForm().fireEvent('loginUserAfterRegister', text);
                    me.getRegistrationForm().destroy();
                }

            },
            error:function(){
//                me.closeRegistrationForm()
            }
        })
    }

});
