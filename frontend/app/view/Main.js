Ext.define('DL.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'DL.view.XTitlebar',
        'DL.view.News'
    ],
    config: {
        layout: {
            type: 'vbox'


        },
        itemId: 'main',
        width: '100%',
        height: '100%',
        flex: 1,
        items: [
            {
                xtype: 'xtitlebar'
            },
            {
                xtype: 'news-container'
            }
        ]
    },
    initialize: function(){
        this.callParent();
    }
});
