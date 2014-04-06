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
                        label: 'Ім\'я',
                        name: 'login'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Пароль',
                        name: 'password'
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

//
//                // Reset and Submit buttons
//                buttons: [{
//                    text: 'Login',
////                    formBind: true, //only enabled once the form is valid
//                    disabled: true
////                    handler: function() {
////                        var form = this.up('form').getForm();
////                        if (form.isValid()) {
////                            form.submit({
////                                success: function(form, action) {
////                                    Ext.Msg.alert('Success', action.result.msg);
////                                },
////                                failure: function(form, action) {
////                                    Ext.Msg.alert('Failed', action.result.msg);
////                                }
////                            });
////                        }
////                    }
//                }]
////                renderTo: Ext.getBody()
//
//            }
        ]
    },

    initialize:function(){
        this.callParent();
        this.down('#submit-btn').setScope(this);
        this.down('#submit-btn').setHandler(this.submitLoginForm);

    },
    submitLoginForm: function submitLoginForm(){
        console.log('Submit Login Form');
    }
})