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
        hideOnMaskTap:true,
        cls: 'registration-panel',

        items: [
            {
                xtype: 'fieldset',
                title: 'Реєстраційна форма',
                cls: 'input-form',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Ім\'я',
                        name: 'login'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Прізвище',
                        name: 'login'
                    },
                    {
                        xtype: 'emailfield',
                        label: 'Email',
                        name: 'email'
                    },
                    {
                        xtype: 'emailfield',
                        label: 'Повторіть email',
                        name: 'email'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Пароль',
                        name: 'password'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Повторіть пароль',
                        name: 'password'
                    },
                    {
                        xtype: 'datepickerfield',
                        label: 'Birthday',
                        name: 'birthday',
                        value: new Date()
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Статус',
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
        this.down('#submit-btn').setHandler(this.submitRegistrationForm);

    },
    submitRegistrationForm: function submitLoginForm(){
        console.log('Submit Registration Form');
    }
})