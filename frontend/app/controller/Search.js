/**
 * Created by ikush on 6/14/2014.
 */
Ext.define('DL.controller.Search', {
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
            searchPanel: {
//                initialize: 'onInitialize'
            },
            closeSearchPanelBtn:{
                tap: 'closeSearchPanel'
            },
            searchField: {
                focus: 'openAdvancedSearch'
            }

        }
    },

    closeSearchPanel: function(){
        this.searchPanel.setHidden(true)
    },

    openAdvancedSearch: function(){
        if(!this.searchPanel){
            this.searchPanel = Ext.create('DL.view.Search');
            this.searchPanel.showBy(this.getSearchField());
        }else{
            this.searchPanel.setHidden(false)
        }


    }

});
