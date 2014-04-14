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

                xtype: 'container',
                height: '2em',
                itemId: 'errorMsg',
                html:'',
                cls: 'errorPanel',
                hidden: true

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
        this.down('#submit-btn').setHandler(this.checkLoginForm);
        this.errorMsg = this.down('#errorMsg');

    },
    validateEmail: function validateEmail(email){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    },

    checkLoginForm: function checkLoginForm(){
        var email = this.down('#email').getValue();
        var password = this.down('#password').getValue();
        if(email != ""){
            if(!this.validateEmail(email)){

                this.errorMsg.setHidden(false);
                this.errorMsg.setHtml('Введіть коректний email адрес.')
                return
            }
        }else{
            this.errorMsg.setHidden(false);
            this.errorMsg.setHtml('Заповніть всі поля')
            return
        }

        if(password !="" ){
            this.submitLoginForm( email, password);
            return
        } else{
            this.errorMsg.setHidden(false);
            this.errorMsg.setHtml('Заповніть всі поля')
        }
    },

    submitLoginForm: function submitLoginForm(email, password){
        var me =this;
        Ext.Ajax.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            params: {
                password: password,
                email: email
            },
            success: function(response){
                var text = response.responseText;
                me.destroy();

            },
            error:function(){
//                me.closeRegistrationForm()
            }
        })
    }
})