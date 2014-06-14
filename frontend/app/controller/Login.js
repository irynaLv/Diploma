/**
 * Created by ikush on 6/14/2014.
 */
Ext.define('DL.controller.Login', {
    extend: 'Ext.app.Controller',

    requires:[
        'Ext.Ajax'
    ],

    config: {
        refs: {
            loginPanel:{
                xtype:'login-form',
                selector: 'login-form',
                autoCreate:true
            },
            submitSearchPanelBtn:'login-form component[itemId=submit-btn]'



        },
        control: {
            loginPanel: {
                sendLoginForm: 'sendLoginRequest'
            }

        }
    },

    sendLoginRequest: function(email, password){
        Ext.Ajax.request({
            method: 'POST',
            url: '/login',
            params: {
                password: password,
                email: email
            },
            success: function(response){
                var text = response.responseText;
            },
            error:function(){

            }
        })
    }

});
