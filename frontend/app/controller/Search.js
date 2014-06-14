/**
 * Created by ikush on 6/14/2014.
 */
Ext.define('TL.controller.Search', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            searchPanel:{
                xtype:'search-document-panel',
                selector: 'search-document-panel',
                autoCreate:true
            },
            closeSearchPanelBtn:'search-document-panel component[itemId= tl-new-queue-name]',

            titlebar: {
                xtype: 'xtitlebar',
                selector: 'xtitlebar',
                autoCreate:true
            }
        },
        control: {
            searchPanel: {
//                initialize: 'onInitialize'
            },
            closeSearchPanelBtn:{

            }

        }
    }

});
