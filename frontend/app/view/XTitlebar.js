/**
 * Created by Iruna on 16.03.14.
 */
Ext.define('DL.view.XTitlebar', {
    extend: 'Ext.TitleBar',
    xtype: 'xtitlebar',
    alias: 'widget.xtitlebar',


    config: {
        id: 'xtitlebar',
        layout:{
            type:  'hbox',
            align: 'pack'
        },
        left: 0,
        right: 0,
        width: '100%',
        docked:'top',
        items:[
            {
                xtype: 'container',
                itemId: 'logo-container',
                cls: 'logo-container',
                width: '10%'
            },

            {
                xtype:'container',
                layout:'hbox',
                cls: 'main-cont',
                width: '88%',
                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Пошук',
                        itemId: 'documentSearch',
                        cls: 'document-search',
                        width: '68%'
                    },
                    {
                        xtype: 'container',
                        right: 0,
                        cls: 'btn-cont',
                        width: '30%',
                        layout: 'hbox',
                        items:[
                            {
                                xtype: 'button',
                                text: 'Логін',
                                cls: 'login-btn',
                                itemId: 'login-btn',
                                id: 'login-btn',
                                scope:this,
                                width:'80%',
                                maxWidth: '5em',
//                                hidden: true,
                                handler:'getLoginPanel'
                            },
                            {
                                xtype: 'button',
                                cls: 'add-document-btn',
                                width: '50%',
                                icon:'../../resources/images/document_add.png',
                                itemId: 'add-document-btn',
//                                hidden: true,
                                scope:this
                            },
                            {
                                xtype: 'button',
                                cls: 'user-document-btn',
                                width: '50%',
//                                hidden: true,
                                icon:'../../resources/images/My_Documents-64.png',
                                itemId: 'user-document-btn'
                            }
                        ]
                    }

//                    {
//                        xtype: 'button',
//                        cls: 'user-setting-btn',
//                        itemId: 'user-setting-btn',
////                        hidden: true,
//                        text: 'Налаштування',
//                        scope:this
////                        handler:'getLoginPanel'
//                    }
                ]

            }

        ]
    },

    initialize: function(){
        this.callParent();
        this.newDocumentPanel = null;
        this.searchPanel = null;
        this.searchPanel = null;
//        this.down('#login-btn').setScope(this);
        this.down('#login-btn').setScope(this);
        this.down('#add-document-btn').setScope(this);
        this.down('#login-btn').setHandler(this.getLoginPanel);
        this.down('#add-document-btn').setHandler(this.addDocumentPanel);

    },
    addDocumentPanel: function(){
        this.newDocumentPanel = Ext.create('DL.view.AddDocument', {
        })
        this.newDocumentPanel.showBy(this.down('#add-document-btn'));


    },

    getLoginPanel:function(){
        var panel = Ext.create('DL.view.LoginForm', {
            width: '17em'
        })
        panel.showBy(this.down('#login-btn'));
    }
})