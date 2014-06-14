/**
 * Created by ikush on 6/14/2014.
 */
Ext.define('DL.controller.AddDocument', {
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
