/**
 * Created by Iruna on 16.03.14.
 */
Ext.define('DL.view.LoginForm', {
    extend:'Ext.Panel',
    xtype: 'login-form',
    alias: 'widget.login-form',


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
                xtype:'container',
                layout:'hbox',
                items:[

                    {
                        xtype: 'button',
                        text: 'OK',
                        cls: 'submit-btn',
                        itemId: 'submit-btn',
                        handler: 'submitLoginForm',
                        width: '30%'
                    },
                    {
                        xtype: 'spacer',
                        width: '5.6em'
                    },
                    {

                        xtype: 'button',
                        itemId: 'registration-btn',
                        text:"Реєстрація",
                        cls:'singup-btn',
//                        width:'8%',
                        handler:'getRegistrationForm'
                    }
                ]


            }


        ]
    },

    initialize:function(){
        this.callParent();
        this.down('#submit-btn').setScope(this);
        this.down('#submit-btn').setHandler(this.submitLoginForm);
        this.down('#registration-btn').setScope(this);
        this.down('#registration-btn').setHandler(this.getRegistrationForm);
        this.on('painted', function(){
            this.on('hide', function(){
                this.destroy();
            })
        })

    },
    submitLoginForm: function submitLoginForm(){
        var email = this.down('#email').getValue();
        var password = this.down('#password').getValue();
        var emailField = this.down('#email');
        var passwordField = this.down('#password') ;
        var error = false;
        if(email != ""){

            if(email != "" && !this.validateEmail(email)){
                emailField.addCls('error');
                error = true;
            } else{
                if(emailField.element.hasCls('error')){
                    emailField.element.removeCls('error');
                    emailField.removeCls('error');
                }
            }
        } else{
            emailField.addCls('error');
            error = true;
        }

        if(password == ""){
            passwordField.addCls('error');
            error = true;
        } else{
            if(passwordField.element.hasCls('error')){
                passwordField.element.removeCls('error');
                passwordField.removeCls('error');
            };

        }
        if(!error){
            this.fireEvent('sendLoginForm', email, password);
        }


    },
    validateEmail: function validateEmail(email){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    },

    getRegistrationForm:function(){
        var email = null;
        if(this.down('#email').getValue().length > 0){
            var email = this.down('#email').getValue();
        }
        var panel = Ext.create('DL.view.RegistrationForm', {
            width: '15em',
            emailValue: email
        })
        panel.showBy(Ext.getBody().down('#login-btn'));
        this.destroy();
    }
})