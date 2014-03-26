/**
 * Created by Iruna on 16.03.14.
 */
Ext.define('DL.view.TitleBar', {
    extend: 'Ext.TitleBar',
    xtype: 'xtitlebar',
    alias: 'widget.xtitlebar',

    config: {
        docked: 'top',
        cls: 'xtitlebar',
        isDetailsView: false
    },



    initialize: function () {
        this.callParent();
    }
})