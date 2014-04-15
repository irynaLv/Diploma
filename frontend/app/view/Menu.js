/**
 * Created by Iruna on 26.03.14.
 */
Ext.define("DL.view.Menu", {
    extend: 'Ext.Container',
    xtype: 'menu',

    config:{
        layout:'hbox',
        docked: 'top',
        fullscreen: true,
        cls: 'menu',
        top: '25%',
        width: '100%',
        items:[
            {
                xtype:'segmentedbutton',
                cls: 'menu-segmentedbuttons',
                width: '100%',
                items:[
                    {
                        text: "Головна",
                        itemId: 'main',
                        width: '25%'
                    },
                    {
                        text: 'Документи',
                        itemId: 'documents',
                        width: '25%'
                    },
                    {
                        text:'Новини',
                        itemId: 'news',
                        width: '25%'
                    },
                    {
                        text: 'Контакти',
                        itemId: 'contacts',
                        width: '25%'
                    }
                ]
            }
        ]
    },
    initialize: function(){
        this.callParent();
        this.down('#documents').setScope(this);
//        this.down('#documents').setHandler(this.);

    }
})