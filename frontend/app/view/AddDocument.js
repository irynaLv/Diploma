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
//            {
//                xtype: 'segmentedbutton',
//                cls: 'choose-segmented-btn',
//                width:'100%',
//                items: [
//                    {
//                        text: 'Документи',
//                        width:'50%',
//                        cls: 'documents',
//                        pressed:true
//                    },
//                    {
//                        text: 'Оголошення',
//                        width:'50%',
//                        cls: 'advert'
//                    }
//
//                ]
//
//            },
            {
                xtype: 'textfield',
                label:'Назва',
                labelWidth:'30%',
                width: '100%',
                cls:'name',
                itemId: 'name'
            },
            {
                xtype: 'textareafield',
                label:'Опис',
                labelWidth:'30%',
                width: '100%',
                itemId: 'description',
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
                usePicker: true,
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
                itemId:'role',
                layout:'hbox',
                items: [
                    {

                        xtype: 'container',
                        html:'Рівень досупу',
                        cls: 'title'
                    },
                    {
                        xtype: 'container',
                        width: '70%',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '70%',
                                itemId: 'worker',
                                label: 'Працівники'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '70%',
                                itemId: 'student',
                                label: 'Студенти'

                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '70%',
                                label: 'Власник',
                                itemId: 'owner'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '70%',
                                label: 'Всі',
                                itemId: 'allUsers'
                            }

                        ]
                    }

                ]
            },
            {
                xtype: 'filefield',
                label: "Файл:",
                cls: 'file',
                itemId: 'file',
                buttonText: 'Виберіть файл',
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%'
//                hidden:true

            },
            {
                xtype: 'container',
                layout: 'hbox',
                items:[
                    {
                        xtype: 'button',
                        buttonText: 'Файл',
                        text: 'Завантажити',
                        cls: 'upload-btn',
                        itemId: 'upload-btn'
                    },
                    {
                        xtype: 'spacer',
                        width: '8em'
                    },
                    {
                        xtype: 'button',
                        text: 'Очистити дані',
                        cls: 'clear-btn',
                        itemId: 'clear-btn'
//                        width:'30%'
                    }
                ]
            }

        ]
    },

    initComponent: function(){
        this.type = this.down('#type');
        this.clearBtn = this.down('#clear-btn');
        this.name = this.down('#name');
        this.description = this.down('#description');
        this.role = this.down('#role');
        this.file = this.down('#file');
        this.uploadBtn = this.down('#upload-btn');
        this.workerAcces = this.down('#worker');
        this.studentAcces = this.down('#student');
        this.owner = this.down('#owner');
        this.allUserAcces = this.down('#allUsers');

        this.type.on('change', this.setFileHidden, this);
        this.clearBtn.on('tap', this.clearPanel, this);
        this.callParent();

    },

    setFileHidden: function(field, newValue, oldValue){
        if(newValue == 5){
            this.down('#file').setHidden(true);
        }
    },
    clearPanel: function(){
        this.name.setValue('');
        this.description.setValue('');
        this.type.setValue(1);
        this.workerAcces.setChecked(false);
        this.studentAcces.setChecked(false);
        this.owner.setChecked(false);
        this.allUserAcces.setChecked(false);
        this.file.element.down('input').dom.value = '';

    }
})
