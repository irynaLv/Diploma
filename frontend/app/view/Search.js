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
        maxWidth: '24em',
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
                                picker: {
                                    yearFrom: 2010,
                                    yearTo  : new Date().getFullYear()

                                },
                                value: new Date(new Date(new Date().setMonth(new Date().getMonth()-1)).setHours(0, 0, 0))
                            },
                            {
                                xtype: 'datepickerfield',
                                itemId: 'date-create-to',
                                cls: 'date-create-to',
                                label: 'до',
                                picker: {
                                    yearFrom: 2010,
                                    yearTo  : new Date().getFullYear()

                                },
                                value: new Date()
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
                itemId: 'owner',
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
                                value: 0,
                                itemId: 'trainingMaterials',
                                label: 'Навчальні матеріали'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                value: 1,
                                itemId: 'regulations',
                                label: 'Нормативні документи'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                value: 2,
                                itemId: 'minutesOfMeetings',
                                label: 'Протоколи засідань'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                value: 3,
                                itemId:'informationMaterials',
                                label: 'Інформаційні матеріали'
                            },
                            {
                                xtype: 'checkboxfield',
                                labelWidth: '60%',
                                value: 4,
                                itemId:'advertisement',
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
                        width: '35%',
                        handler: 'advancedSearch'
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

        this.down('#search-btn').setScope(this);
        this.down('#search-btn').setHandler(this.advancedSearch);
        this.callParent();
    },

    advancedSearch: function(){
        var dateFrom = this.down("#date-create-from").getValue();
        var dateTo =  this.down("#date-create-to").getValue();
        var owner =  this.down('#owner').getValue();
        var type = this.getType();
        var tags = {
            owner: owner,
            type: type
        };
        var timePeriod = {
            from:dateFrom,
            to:dateTo
        }

        this.fireEvent('sendAdvancedSearch', tags, timePeriod )
    },

    getType: function(){
        var checkedValue = [];
        if(this.down('#trainingMaterials').getChecked()){
            checkedValue.push(this.down('#trainingMaterials').getValue())
        }
        if(this.down('#regulations').getChecked()){
            checkedValue.push(this.down('#regulations').getValue())
        }
        if(this.down('#minutesOfMeetings').getChecked()){
            checkedValue.push(this.down('#minutesOfMeetings').getValue())
        }
        if(this.down('#informationMaterials').getChecked()){
            checkedValue.push(this.down('#informationMaterials').getValue())
        }
        if(this.down('#advertisement').getChecked()){
            checkedValue.push(this.down('#advertisement').getValue())
        }
        return checkedValue;
    }



})