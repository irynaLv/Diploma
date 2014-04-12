/**
 * Created by Iruna on 16.03.14.
 */
Ext.define('DL.view.LoginForm', {
    extend:'Ext.Panel',
    xtype: 'login-form',
    alias: 'widget.loginForm',

    config: {
        layout: {
            type: 'vbox',
            align: 'left'
        },
        modal: true,
        hideOnMaskTap:true,
        cls: 'login-panel',

        items: [
            {
                xtype: 'fieldset',
                title: 'Логін форма',
                cls: 'input-form',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Email',
                        itemId: 'email'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Пароль',
                        itemId: 'password'
                    }

                ]

            },
            {
                xtype: 'button',
                text: 'OK',
                cls: 'submit-btn',
                itemId: 'submit-btn',
                handler: 'submitLoginForm',
                width:'30%'
            }


        ]
    },

    initialize:function(){
        this.callParent();
        this.down('#submit-btn').setScope(this);
        this.down('#submit-btn').setHandler(this.submitLoginForm);

    },
    submitLoginForm: function submitLoginForm(){
        var email = this.down('#email').getValue();
        var password = this.down('#password').getValue();
        Ext.Ajax.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            params: {
                password: password,
                email: email
            },
            success: function(response){
                var text = response.responseText;
                // process server response here
//                me.closeRegistrationForm()
            },
            error:function(){
//                me.closeRegistrationForm()
            }
        })
        console.log('Submit Login Form');
    }
})