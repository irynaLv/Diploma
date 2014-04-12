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
                        xtype: 'textfield',
                        label: 'Username',
                        itemId: 'username'
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
//                    {
//                        xtype: 'container',
//                        layout: 'hbox',
//                        cls: 'sex-container',
//                        items: [
//                            {
//                                xtype: 'container',
//                                html: 'Стать',
//                                cls: 'sex-title',
//                                width: '30%'
//                            },
//                            {
//                            xtype: 'container',
//                            layout: 'hbox',
//                            cls: 'radiobutton-container',
//                            width: '70%',
//                            items: [
//                                {
//                                    xtype: 'radiofield',
//                                    label: 'Чоловіча',
//                                    checked: true,
//                                    width: '50%'
//                                },
//                                {
//                                    xtype: 'radiofield',
//                                    label: 'Жіноча',
//                                    width: '50%'
//                                }
//                            ]
//                        }
//                        ]
//                    },




                ]

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
        this.down('#submit-btn').setHandler(this.submitRegistrationForm);
        this.down('#cancel-btn').setScope(this);
        this.down('#cancel-btn').setHandler(this.closeRegistrationForm);
//       this.down("#name").element.on('blur', this.checkNameField(), this);
        var surname = this.down("#surname").getValue();
        var surname = this.down("#username").getValue();
        var email = this.down("#email").getValue();
        var checkEmail = this.down("#checkEmail").getValue();
        var password = this.down("#password").getValue();
        var checkPassword = this.down("#checkPassword").getValue();
        var birthday = this.down("#birthday").getValue();
        var status = this.down("#status").getOptions();

    },
    submitRegistrationForm: function (){
        var name = this.down("#name").getValue();
        var surname = this.down("#surname").getValue();
        var email = this.down("#email").getValue();
        var checkEmail = this.down("#checkEmail").getValue();
        var password = this.down("#password").getValue();
        var checkPassword = this.down("#checkPassword").getValue();
        var birthday = this.down("#birthday").getValue();
        var status = this.down("#status").getOptions();
        console.log(name,surname, email, checkEmail, password, checkPassword, birthday, status )
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
            }
        })
        console.log('Submit Registration Form');
    },

    closeRegistrationForm:function(){
       this.destroy();
    },
    checkNameField:function(el, e){
       console.log(arguments)
    }
})