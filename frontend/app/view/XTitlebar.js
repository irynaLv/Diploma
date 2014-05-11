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
                width: '60%',
                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Пошук',
                        itemId: 'documentSearch'

                    },
                    {
                        xtype: 'button',
                        text: 'Логін',
                        cls: 'login-btn',
                        itemId: 'login-btn',
                        id: 'login-btn',
                        scope:this,
                        width:'12%',
//                        hidden: true,
                        handler:'getLoginPanel'
                    },
                    {
                        xtype: 'button',
                        cls: 'add-document-btn',
                        text: '+',
                        itemId: 'add-document-btn',
//                        hidden: true,
                        scope:this
//                        handler:'getLoginPanel'
                    },
                    {
                        xtype: 'button',
                        cls: 'user-document-btn',
//                        hidden: true,
                        icon:'../../resources/images/My_Documents-64.png',
                        itemId: 'user-document-btn'
//                        handler:'getLoginPanel'
                    },
                    {
                        xtype: 'button',
                        cls: 'user-setting-btn',
                        itemId: 'user-setting-btn',
//                        hidden: true,
                        text: 'Налаштування',
                        scope:this
//                        handler:'getLoginPanel'
                    }
                ]

            }

        ]
    },

    initialize: function(){
        this.callParent();
//        this.down('#login-btn').setScope(this);
        this.down('#login-btn').setScope(this);
        this.down('#add-document-btn').setScope(this);
        this.down('#login-btn').setHandler(this.getLoginPanel);
        this.down('#add-document-btn').setHandler(this.addDocumentPanel);
        this.down('#documentSearch').on('focus', this.createTagPanel, this);
        this.down('#documentSearch').on('blur', this.destroySearchPanel, this);

    },
    addDocumentPanel: function(){
        var panel = Ext.create('DL.view.AddDocument', {
//            width: 320
        })
        panel.showBy(this.down('#add-document-btn'));
    },

    getLoginPanel:function(){
        var panel = Ext.create('DL.view.LoginForm', {
            width: '17em'
        })
        panel.showBy(this.down('#login-btn'));
    },

    createTagPanel: function(){
        if(!this.searchPanel){
            this.searchPanel = Ext.create('DL.view.Search', {
//            width: 320
            })
            this.searchPanel.showBy(this.down('#documentSearch'));
        }

    },
    destroySearchPanel: function(){
//        this.searchPanel.destroy();
//        this.searchPanel = null;
    }
})