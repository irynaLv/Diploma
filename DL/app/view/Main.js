Ext.define('DL.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
//        'Ext.TitleBar',
        'DL.view.XTitlebar'
    ],
    config: {

        items: [
            {
                xtype: 'xtitlebar'
            }
        ]
    },
    initialize: function(){
        this.callParent();
    }
});
