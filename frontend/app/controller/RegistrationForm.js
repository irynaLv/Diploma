/**
 * Created with JetBrains WebStorm.
 * User: ikush
 * Date: 4/8/14
 * Time: 6:45 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('DL.controller.RegistrationForm', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            searchPanel:{
                xtype:'search-document-panel',
                selector: 'search-document-panel',
                autoCreate:true
            },
            closeSearchPanelBtn:'component[itemId=close-search-panel-btn]',

            titlebar: {
                xtype: 'xtitlebar',
                selector: 'xtitlebar',
                autoCreate:true
            },
            searchField: 'xtitlebar component[itemId= documentSearch]'
        },
        control: {


        }
    }

});
;