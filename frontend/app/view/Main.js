Ext.define('DL.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'DL.view.XTitlebar'
    ],
    config: {
        layout: {
            type: 'vbox',
            align: 'start'

        },
        itemId: 'main',
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
