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
                        placeHolder: 'Email',
                        itemId: 'email'
                    },
                    {
                        xtype: 'emailfield',
                        placeHolder: 'Повторіть email',
                        itemId: 'checkEmail'
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Пароль',
                        itemId: 'password'
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Повторіть пароль',
                        itemId: 'checkPassword'
                    },
                    {
                        xtype: 'textfield',
                        placeHolder: 'Ім\'я',
                        itemId: 'name'
//                        listeners : {
//                            scope : this,
//                            blur: this.checkNameField
//                        }
                    },
                    {
                        xtype: 'textfield',
                        placeHolder: 'Прізвище',
                        itemId: 'surname'
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Стать',
                        itemId: 'sex',
                        options: [
                            {text: 'Чоловік',  value: 1},
                            {text: 'Жінка', value: 2}
                        ]
                    },

                    {
                        xtype: 'selectfield',
                        label: 'Роль',
                        itemId: 'role',
                        options: [
                            {text: 'Студент',  value: 1},
                            {text: 'Працівник', value: 2}
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Статус',
                        hidden: true,
                        itemId: 'status',
                        usePicker: true,
                        options: [
                            {text: 'Професор',  value: 1},
                            {text: 'Доцент', value: 2},
                            {text: 'Асистент', value: 3},
                            {text: 'Старший викладач', value: 4},
                            {text: 'МНС', value: 5},
                            {text: 'Старший науковий співробітние', value: 6},
                            {text: 'Інженер', value: 7},
                            {text: 'Лаборант', value: 8},
                            {text: 'Завідувач лабораторії', value: 9},
                            {text: 'Бухгалтер', value: 10}
                        ]
                    },


                    {
                        xtype: 'container',
                        layout:'vbox',
                        cls: 'date-field',
                        items:[
                            {
                                xtype: 'container',
                                html:'День народження',
                                cls: 'label'
                            },
                            {
                                xtype: 'datepickerfield',

                                itemId: 'birthday',
                                picker: {
                                    yearFrom: 1940,
                                    yearTo  : new Date().getFullYear()

                                },
                                value: new Date()
                            }
                        ]
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
                xtype: 'container',
                layout: 'hbox',
                items:[
                    {
                        xtype: 'button',
                        text: 'Закрити',
                        cls: 'cancel-btn',
                        itemId: 'cancel-btn'
//                        width:'30%'
                    },
                    {
                        xtype: 'spacer',
                        width: '5.5em'
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
        this.down('#role').on('change', this.setStatusVisible, this);
        this.errorMsg = this.down('#errorMsg');
        this.down("#name").on('keyup', this.checkNameField, this);
        this.on('painted', function(){
            this.on('hide', function(){
                this.destroy();
            })
        })

    },

    setStatusVisible: function(){
      var value =  this.down('#role').getValue();
        if(value == 2){
            this.down('#status').setHidden(false);
        }else{
            this.down('#status').setHidden(true);
        }
    },

    submitRegistrationForm:function(name, surname, email, password, birthday, status, role, sex){
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
                role: role,
                status: status,
                sex: sex,
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
    validateEmail: function validateEmail(email){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    },

    checkRegistrationForm: function (){
        this.errorMsg.setHidden(true);
        var name = this.down("#name").getValue();
        var surname = this.down("#surname").getValue();
        var email = this.down("#email").getValue();
        var checkEmail = this.down("#checkEmail").getValue();
        var password = this.down("#password").getValue();
        var checkPassword = this.down("#checkPassword").getValue();
        var birthday = this.down("#birthday").getValue();
        var role = this.down("#role").getValue();
        var sex = this.down("#sex").getValue();
        var status = this.down("#status").getValue();
        if(role == 1){
            status = 0
        }
        if(email != "" && this.validateEmail(email)){

            if(email != checkEmail){
                this.errorMsg.setHidden(false);
                this.errorMsg.setHtml('Введіть коректний email адрес.');
                return
            }

        } else{
            this.errorMsg.setHidden(false);
            this.errorMsg.setHtml('Введіть коректний email адрес.')
            return
        }

        if( password != '' && password != checkPassword){
            this.errorMsg.setHidden(false);
            this.errorMsg.setHtml('Введіть коректний пароль')
            return
        }
        if(name !="" && surname !=""){
            this.submitRegistrationForm(name, surname, email, password, birthday, role, sex, status);
            return
        } else{
            this.errorMsg.setHidden(false);
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