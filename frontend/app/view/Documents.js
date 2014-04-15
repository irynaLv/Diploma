/**
 * Created with JetBrains WebStorm.
 * User: ikush
 * Date: 4/13/14
 * Time: 9:48 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('DL.view.Documents', {
    extend: 'Ext.Container',
    xtype: 'documents',
    requires: [

    ],
    config: {
        layout: {
            type: 'vbox',
            align: 'start',
            pack: 'left'
        },
        itemId: 'documents',
        items: [
            {

                xtype: 'file'
            }
        ]
    },
    initialize: function(){
        this.callParent();
    }
});
