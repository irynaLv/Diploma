/**
 * Created by Iruna on 23.04.14.
 */
Ext.define('DL.view.Search', {
    extend:'Ext.Panel',
    xtype: 'search-document-panel',
    alias: 'widget.search-document-panel',

    config: {
        layout: {
            type: 'vbox',
            align: 'left'
        },
//        modal: true,
        flex: 1,
        hideOnMaskTap:false,
        cls: 'search-document-panel',
        items:[
            {
                xtype: 'container',
                layout: 'hbox',
                cls: 'date-container',
                items: [
                    {
                        xtype: 'container',
                        cls: 'title',
                        width: '45%',
                        html: 'Дата створення'
                    },
                    {
                        xtype: 'container',
                        layout:'vbox',
                        width:'50%',

                        items:[
                            {
                                xtype: 'datepickerfield',
                                itemId: 'date-create-from',
                                cls: 'date-create-from',
                                label: 'від',
                                width: '100%',
                                picker: {
                                    yearFrom: 2010,
                                    yearTo  : new Date().getFullYear()

                                },
                                value: new Date()
                            },
                            {
                                xtype: 'datepickerfield',
                                itemId: 'date-create-to',
                                cls: 'date-create-to',
                                label: 'до',
                                width: '100%',
                                picker: {
                                    yearFrom: 2010,
                                    yearTo  : new Date().getFullYear()

                                },
                                value: new Date(new Date(new Date().setMonth(new Date().getMonth()-1)).setHours(0, 0, 0))
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'textfield',
                width: '100%',
                label: 'Власник документа',
                labelWidth:'45%',
                placeHolder:"Прізвище власника",
                itemId: 'status',
                cls: 'title owner'

            },
            {
                xtype:'container',
                width: '100%',
                layout:'hbox',
                cls: 'document-type',
                items: [
                    {

                        xtype: 'container',
                        cls: 'title',
                        width: '45%',
                        html:'Тип документа'
                    },
                    {
                        xtype: 'container',
                        width: '50%',
                        cls: 'types',
                        layout: 'vbox',
                        items:[
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',
                                label: 'Навчальні матеріали'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',
                                label: 'Нормативні документи'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',
                                label: 'Протоколи засідань'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',
                                label: 'Інформаційні матеріали'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '80%',
                                label: 'Оголошення'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items:[
                    {
                        xtype: 'button',
                        cls:'search-btn',
                        text: 'Пошук'
                    },
                    {
                        xtype: 'button',
                        text: 'Закрити',
                        cls: 'cancel-btn',
                        itemId: 'cancel-btn'
                        //                        width:'30%'
                    }
                ]
            }
        ]
    },
    initComponent:function(){
        this.dateFrom = new Date();
        this.dateTo = new Date(new Date(new Date().setMonth(new Date().getMonth()-1)).setHours(0, 0, 0));
        this.on('painted', function(){
            this.on('hide', function(){
                this.destroy();
            })
        })
        this.callParent();
    }
})