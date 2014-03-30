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
                width: '20%'
            },

            {
                xtype:'container',
                html:'<div>Львівський національний університет ім.Івана Франка</div><div> Факультет електроніки</div>',
                cls: 'title',
                width: '63%'

            },

            {
                text: 'Логін',
                cls: 'login-btn',
                itemId: 'login-btn',
                scope:this,
                xtype: 'button',
                width:'8%',
                handler:'getLoginPanel'
            },
            {
                xtype: 'button',
                text:"Реєстрація",
                cls:'singup-btn',
                width:'8%'
            }
        ]
    },

    initialize: function(){
        this.callParent();
//        this.down('#login-btn').setScope(this);
        this.down('#login-btn').setScope(this);
        this.down('#login-btn').setHandler(this.getLoginPanel);

    },

    getLoginPanel:function(){
        var panel = Ext.create('DL.view.LoginForm', {
            width: 320


//            style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'}
        })
//        Ext.getCmp('app-main').add(panel);
        panel.showBy(this.down('#login-btn'));
    }
})