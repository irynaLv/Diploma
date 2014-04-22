/**
 * Created by Iruna on 22.04.14.
 */
Ext.define('DL.view.AddDocument', {
    extend:'Ext.Panel',
    xtype: 'add-document-panel',
    alias: 'widget.add-document-panel',

    config: {
        layout: {
            type: 'vbox',
            align: 'left'
        },
        modal: true,
        flex: 1,
        hideOnMaskTap:true,
        cls: 'add-document-panel',
        items: [
            {
                xtype: 'segmentedbutton',
                items: [
                    {
                        text: 'Документи'
                    },
                    {
                        text: 'Оголошення'
                    }

                ]

            },
            {
                xtype: 'textfield',
                label:'Назва'
            },
            {
                xtype: 'textareafield',
                label:'Опис'
            },
            {
                xtype: 'selectfield',
                width: '100%',
                label: 'Тип',
                itemId: 'status',
                options: [
                    {text: 'Навчальні матеріали',  value: 1},
                    {text: 'Нормативні документи', value: 2},
                    {text: 'Протоколи засідань',  value: 3},
                    {text: 'Інформаційні матеріали',  value: 4},
                    {text: 'Оголошення',  value: 5},
                    {text: 'Інше',  value: 6}
                ]
            },
            {
                xtype:'container',
                width: '100%',
                items: [
                    {

                        xtype: 'container',
                        html:'Рівень досупу'
                    },
                    {
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                label: 'Працівники'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Студент'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Власник'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Всі'
                            }

                        ]
                    }

                ]
            },
            {
                xtype: 'filefield',
                label: "Файл:"
//                name: 'photo',
//                accept: 'image'

            },
            {
                xtype: 'button',
                text: 'Завантажити'
            }

        ]
    },

    initComponent: function(){
        this.callParent();
    }
})
