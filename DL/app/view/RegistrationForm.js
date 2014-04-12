/**
 * Created by Iruna on 06.04.14.
 */
Ext.define('DL.view.RegistrationForm', {
    extend:'Ext.Panel',
    xtype: 'registration-form',
    alias: 'widget.registrationForm',

    config: {
        layout: {
            type: 'vbox',
            align: 'left'
        },
        modal: true,
//        hideOnMaskTap:true,
        cls: 'registration-panel',

        items: [
            {
                xtype: 'fieldset',
                title: 'Реєстраційна форма',
                cls: 'input-form',
                items: [

                    {
                        xtype: 'emailfield',
                        label: 'Email',
                        itemId: 'email'
                    },
                    {
                        xtype: 'emailfield',
                        label: 'Повторіть email',
                        itemId: 'checkEmail'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Пароль',
                        itemId: 'password'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Повторіть пароль',
                        itemId: 'checkPassword'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Ім\'я',
                        itemId: 'name'
//                        listeners : {
//                            scope : this,
//                            blur: this.checkNameField
//                        }
                    },
                    {
                        xtype: 'textfield',
                        label: 'Прізвище',
                        itemId: 'surname'
                    },
                    {
                        xtype: 'datepickerfield',
                        label: 'День народження',
                        itemId: 'birthday',
                        picker: {
                            yearFrom: 1940,
                            yearTo  : new Date().getFullYear()

                        },
                        value: new Date()
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Статус',
                        itemId: 'status',
                        options: [
                            {text: 'Студент',  value: 'first'},
                            {text: 'Викладач', value: 'second'},
                            {text: 'Бухгалтер',  value: 'third'}
                        ]
                    }

                ]

            },
            {

                xtype: 'container',
                height: '3em',
                itemId: 'errorMsg',
                html:'',
                cls: 'errorPanel'

            },

            {
                xtype: 'container',
                layout: 'hbox',
                items:[
                    {
                        xtype: 'button',
                        text: 'X',
                        cls: 'cancel-btn',
                        itemId: 'cancel-btn'
//                        width:'30%'
                    },
                    {
                        xtype: 'button',
                        text: 'OK',
                        cls: 'submit-btn',
                        itemId: 'submit-btn'
//                        width:'30%'
                    }
                ]
            }



        ]
    },

    initialize:function(){
        this.callParent();
        this.down('#submit-btn').setScope(this);
        this.down('#submit-btn').setHandler(this.checkRegistrationForm);
        this.down('#cancel-btn').setScope(this);
        this.down('#cancel-btn').setHandler(this.closeRegistrationForm);
        this.errorMsg = this.down('#errorMsg');
        this.down("#name").on('keyup', this.checkNameField(), this);
//        this.down("#surname").on('keyup', this.checkNameField(), this);
//        this.down("#email").on('keyup', this.checkNameField(), this);
//        this.down("#checkEmail").on('keyup', this.checkNameField(), this);
//        this.down("#password").on('keyup', this.checkNameField(), this);
//        this.down("#checkPassword").on('keyup', this.checkNameField(), this);


    },

    submitRegistrationForm:function(name, surname, email, password, birthday, status){
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: 'http://localhost:3000/register',
            params: {
                username: name,
                password: password,
                firstName:name,
                secondName: surname,
                email: email,
                role: 1,
                birthDay: birthday
            },
            success: function(response){
                var text = response.responseText;
                // process server response here
                me.closeRegistrationForm()
            },
            error:function(){
                me.closeRegistrationForm()
            }
        })
    },

    checkRegistrationForm: function (){
        var name = this.down("#name").getValue();
        var surname = this.down("#surname").getValue();
        var email = this.down("#email").getValue();
        var checkEmail = this.down("#checkEmail").getValue();
        var password = this.down("#password").getValue();
        var checkPassword = this.down("#checkPassword").getValue();
        var birthday = this.down("#birthday").getValue();
        var status = this.down("#status").getOptions();
        if(email != "" && email != checkEmail){
            this.errorMsg.setHtml('Введіть коректний email адрес');
            return
        }
        if( password != '' && password != checkPassword){
            this.errorMsg.setHtml('Введіть коректний пароль')
            return
        }
        if(name !="" && surname !=""){
           this.submitRegistrationForm(name, surname, email, password, birthday, status);
            return
        } else{
            this.errorMsg.setHtml('Заповніть всі поля')
        }

    },

    closeRegistrationForm:function(){
       this.destroy();
    },
    checkNameField:function(el, e){
        this.name = this.down("#name").getValue();
//       console.log(arguments)
    }
})