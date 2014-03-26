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
                align: 'left',
                width:'30%'
            }



//            {
//                xtype: 'container',
//                cls: 'input-form',
////                bodyPadding: 5,
//                width: 300,
////                title: 'Log In',
////                titleAlign: 'center',
//                // The form will submit an AJAX request to this URL when submitted
////                url: 'save-form.php',
//
//                // Fields will be arranged vertically, stretched to full width
////                layout: 'anchor',
////                defaults: {
////                    anchor: '100%'
////                },
//                items: [{
//                    xtype: 'textfield',
////                    inputType:'text',
//                    label: 'Login'
////                    name: 'first'
////                    allowBlank: false
//                },{
//                    xtype: 'field',
//                    inputType:'password',
//                    fieldLabel: 'Password',
//                    name: 'last'
////                    allowBlank: false
//                }],
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
        this.callParent()
    }
})