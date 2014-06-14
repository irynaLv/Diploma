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

                        xtype: 'container',
                        html:'Рівень доступу',
                        cls: 'title',
                        itemId: 'access-layer-title',
                        width: '30%'
                    },
                    {
                        xtype: 'container',
                        width: '70%',
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
                    }

                ]
            },
            {
                xtype: 'container',
                width: '100%',
                layout:'hbox',
                hidden: false,
                itemId: 'upload-file-container',
                items:[
                    {
                        xtype: 'panel',
                        width: '60%',
                        cls: 'file-name',
                        itemId: 'file-name',
                        html: 'Файл не вибраний'
                    },
                    {
                        xtype: 'button',
                        text: 'Виберіть файл',
                        cls: 'take-file-btn',
                        itemId: 'take-file-btn',
                        handler: 'onAttachFile',
                        scope: this,
                        width:'39%'
                    },
                    {
                        xtype: 'filefield',
                        label: "Файл:",
                        cls: 'file',
                        itemId: 'file',
                        buttonText: 'Виберіть файл',
                        hidden:true

                    }

                ]
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
        this.screenshot = null;
        this.type = this.down('#type');
        this.clearBtn = this.down('#clear-btn');
        this.name = this.down('#name');
        this.description = this.down('#description');
        this.role = this.down('#role');
        this.file = this.down('#file');
        this.uploadBtn = this.down('#upload-btn');
        this.closedBtn = this.down('#close-btn');
        this.workerAccess = this.down('#worker');
        this.studentAccess = this.down('#student');
        this.owner = this.down('#owner');
        this.allUserAccess = this.down('#allUsers');
        this.takeFileBtn = this.down('#take-file-btn');
        this.accessTitle = this.down('#access-layer-title');
        this.fileName = this.down('#file-name');
        this.fileContainer = this.down('#upload-file-container');

        this.takeFileBtn.setScope(this);
        this.takeFileBtn.setHandler(this.onAttachFile);
        this.type.on('change', this.setFileHidden, this);
        this.clearBtn.on('tap', this.clearPanel, this);
        this.uploadBtn.on('tap', this.onUploadBtn, this);
        this.closedBtn.on('tap', this.closeAddDocumentBtn, this);

        this.callParent();

    },

    onAttachFile:function(){
        var input = this.file.element.down('input').dom;
        var me = this;
        input.addEventListener("change", function(event){
            var el = this,
                e = event;
            me.handleFileUpload(e, el);
        }, false);
        input.click();
        console.log('Creating screenshot');
    },

    handleFileUpload: function(event, el){
        var me  = this;
        var fileList = el.files; /* now you can work with the file list */
        if (fileList.length > 0){
            var file = fileList[0];


            var reader = new FileReader();
            reader.onload = function(e) {
                var screenShot = e.target.result;
                me.screenshot = screenShot;
                me.fileName.setHtml(me.file.element.down('input').dom.value)
            };
            reader.readAsDataURL(file);

        }

    },


    setFileHidden: function(field, newValue, oldValue){
        if(newValue == 4){
            this.fileContainer.setHidden(true);
        }else{
            this.fileContainer.setHidden(false);
        }
    },

    clearPanel: function(){
        this.name.setValue('');
        this.description.setValue('');
        this.type.setValue(1);
        this.workerAccess.setChecked(false);
        this.studentAccess.setChecked(false);
        this.owner.setChecked(false);
        this.allUserAccess.setChecked(false);
        this.fileName.setHtml('Файл не вибраний');

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
