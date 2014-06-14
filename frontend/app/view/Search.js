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
            align:'stretch'
        },
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
//        modal: true,
        flex: 1,
//        hideOnMaskTap:false,
        maxWidth: '18em',
        maxHeight: '22em',
        width: '90%',
        height: '80%',
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
                        width: '30%',
                        html: 'Дата створення'
                    },
                    {
                        xtype: 'container',
                        layout:'vbox',
                        width:'70%',

                        items:[
                            {
                                xtype: 'datepickerfield',
                                itemId: 'date-create-from',
                                cls: 'date-create-from',
                                label: 'від',
//                                width: '100%',
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
//                                width: '100%',
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
//                width: '100%',
                label: 'Власник документа',
                labelWidth:'30%',
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
                        width: '30%',
                        html:'Тип документа'
                    },
                    {
                        xtype: 'container',
                        width: '70%',
                        cls: 'types',
                        layout: 'vbox',
                        items:[
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                label: 'Навчальні матеріали'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                label: 'Нормативні документи'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                label: 'Протоколи засідань'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                label: 'Інформаційні матеріали'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                label: 'Оголошення'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                cls: 'btn-container',
                items:[
                    {
                        xtype: 'button',
                        cls:'search-btn',
                        itemId:'search-btn',
                        text: 'Пошук',
                        width: '35%'
//                        maxWidth: '5em'
                    },
                    {
                        xtype: 'spacer',
                        width: '28%'
                    },
                    {
                        xtype: 'button',
                        text: 'Закрити',
                        cls: 'cancel-btn',
                        itemId: 'close-search-panel-btn',
                        width: '35%'
//                        maxWidth: '5em'
                    }
                ]
            }
        ]
    },
    initComponent:function(){
        this.dateFrom = new Date();
        this.dateTo = new Date(new Date(new Date().setMonth(new Date().getMonth()-1)).setHours(0, 0, 0));
//        this.on('painted', function(){
//            this.on('hide', function(){
////                this.destroy();
//            })
//        });
//        this.down('#cancel-btn').on('tap', this.closeSearchPanel, this);
        this.callParent();
    },

    closeSearchPanel: function(){
//        this.fireEvent('closePanel', this)
    }
})