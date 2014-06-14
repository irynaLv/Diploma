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
            align:'stretch'
        },
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
//        modal: true,
        maxWidth: '20em',
        maxHeight: '22em',
        width: '90%',
        height: '80%',
        flex: 1,
//        hideOnMaskTap:true,
        cls: 'add-document-panel',
        items: [
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
                    {text: 'Навчальні матеріали',  value: 0},
                    {text: 'Нормативні документи', value: 1},
                    {text: 'Протоколи засідань',  value: 2},
                    {text: 'Інформаційні матеріали',  value: 3},
                    {text: 'Оголошення',  value: 4},
                    {text: 'Інше',  value: 5}
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
                                xtype: 'checkboxfield',
                                labelWidth: '70%',
                                itemId: 'worker',
                                value:0,
                                label: 'Працівники'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '70%',
                                itemId: 'student',
                                value: 1,
                                label: 'Студенти'

                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '70%',
                                label: 'Власник',
                                value: 2,
                                itemId: 'owner'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '70%',
                                label: 'Всі',
                                value: 3,
                                itemId: 'allUsers'
                            }

                        ]
                    },
                    {
                        xtype: 'filefield',
                        label: "Файл:",
                        cls: 'file',
                        itemId: 'file',
                        buttonText: 'Виберіть файл',
//                        buttonWidth: '3em',
                        msgTarget: 'side',
                        allowBlank: false,
                        anchor: '100%'
//                hidden:true

                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        cls: 'btn-container',
                        items:[
                            {
                                xtype: 'button',
                                buttonText: 'Файл',
                                text: 'Завантажити',
                                cls: 'upload-btn',
                                itemId: 'upload-btn',
                                width:'35%'
                            },
                            {
                                xtype: 'spacer',
                                width: '10%'
                            },
                            {
                                xtype: 'segmentedbutton',
                                width:'55%',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'Очистити дані',
                                        cls: 'clear-btn',
                                        itemId: 'clear-btn',
                                        width:'50%'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Закрити',
                                        cls: 'close-btn',
                                        itemId: 'close-btn',
                                        width:'50%'
                                    }
                                ]
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
        this.uploadBtn.on('tap', this.onUploadBtn, this)

        this.callParent();

    },

    setFileHidden: function(field, newValue, oldValue){
        if(newValue == 4){
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

    },
    onUploadBtn: function(){
        var name = this.name.getValue();
        var description  =  this.description.getValue();
        var type =  this.type.getValue();
        var workerAccess = this.workerAccess.getChecked();
        var studentAccess = this.studentAccess.getChecked();
        var owner = this.owner.getChecked();
        var allUserAccess =this.allUserAccess.getChecked();
        var file = this.screenshot;
        var error = false;
        var accessValue = [];
        if(!name){
            this.name.addCls('error');
            error = true;
        }else{
            this.name.element.removeCls('error');
            this.name.removeCls('error');

        };
         if(!description){
             this.description.addCls('error');
             error = true;
         }else{
             this.description.element.removeCls('error');
             this.description.removeCls('error');
         }
        if(workerAccess || studentAccess || owner || allUserAccess){
            this.accessTitle.element.removeCls('error');
            this.accessTitle.removeCls('error');
            accessValue = this.getAccessValue();

        }else{
            this.accessTitle.addCls('error');
            error = true;
        }
        if(!this.fileContainer.getHidden()){
            if(!file){
                this.fileName.addCls('error');
                error = true;
            }else{
                this.fileName.element.removeCls('error');
                this.fileName.removeCls('error');
            }
        }

        if(!error){
            var data = {
                name: name,
                description : description,
                type:type,
                access : accessValue,
                file: file

            }
            this.fireEvent('uploadNewFile', data);
        }
    },

    getAccessValue: function(){
        var array = [];
       if(this.workerAccess.getChecked()){
           array.push(this.workerAccess.getValue())
       };
        if(this.studentAccess.getChecked()){
            array.push(this.studentAccess.getValue())
        };
        if(this.owner.getChecked()){
            array.push(this.owner.getValue())
        };
        if(this.allUserAccess.getChecked()){
            array.push(this.allUserAccess.getValue())
        };
         return array;
    },

    closeAddDocumentBtn: function(){
        this.destroy();
    }
})
