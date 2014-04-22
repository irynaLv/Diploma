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
        modal: true,
        flex: 1,
        hideOnMaskTap:true,
        cls: 'search-document-panel',
        items:[
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'container',
                        html: 'Дата створення'
                    },
                    {
                        xtype: 'datepickerfield',
                        itemId: 'birthday',
                        label: 'від',
                        picker: {
                            yearFrom: 2010,
                            yearTo  : new Date().getFullYear()

                        },
                        value: new Date()
                    },
                    {
                        xtype: 'datepickerfield',
                        itemId: 'birthday',
                        label: 'до',
                        picker: {
                            yearFrom: 2010,
                            yearTo  : new Date().getFullYear()

                        },
                        value: new Date()
                    }
                ]
            },
            {
                xtype:'container',
                width: '100%',
                items: [
                    {

                        xtype: 'container',
                        html:'Тип документа'
                    },
                    {
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                label: 'Навчальні матеріали'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Нормативні документи'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Протоколи засідань'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Інформаційні матеріали'
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Оголошення'
                            }

                        ]
                    }

                ]
            },
            {
                xtype: 'selectfield',
                width: '100%',
                label: 'Власник документа',
                itemId: 'status',
                options: [
                ]
            },
            {
                xtype: 'button',
                text: 'Пошук'
            }
        ]
    },
    initComponent:function(){
        this.callParent();
    }
})