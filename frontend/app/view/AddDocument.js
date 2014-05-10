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
//        modal: true,
        flex: 1,
        hideOnMaskTap:true,
        cls: 'add-document-panel',
        items: [
            {
                xtype: 'segmentedbutton',
                cls: 'choose-segmented-btn',
                width:'100%',
                items: [
                    {
                        text: 'Документи',
                        width:'50%',
                        cls: 'documents',
                        pressed:true
                    },
                    {
                        text: 'Оголошення',
                        width:'50%',
                        cls: 'advert'
                    }

                ]

            },
            {
                xtype: 'textfield',
                label:'Назва',
                labelWidth:'30%',
                width: '100%',
                cls:'name'
            },
            {
                xtype: 'textareafield',
                label:'Опис',
                labelWidth:'30%',
                width: '100%',
                cls:'description'
            },
            {
                xtype: 'selectfield',
                width: '100%',
                label: 'Тип',
                labelWidth:'30%',
                cls:'type',
                width: '100%',
                itemId: 'type',
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
                cls:'role',
                layout:'hbox',
                items: [
                    {

                        xtype: 'container',
                        html:'Рівень досупу',
                        cls: 'title'
                    },
                    {
                        xtype: 'container',
                        width: '50%',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',

                                label: 'Працівники'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',
                                label: 'Студенти'

                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',
                                label: 'Власник'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',
                                label: 'Всі'
                            }

                        ]
                    }

                ]
            },
            {
                xtype: 'filefield',
                label: "Файл:",
                cls: 'file'

            },
            {
                xtype: 'button',
                text: 'Завантажити',
                cls: 'upload-btn'
            }

        ]
    },

    initComponent: function(){
        this.callParent();
    }
})
