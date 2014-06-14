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
                sendAdvancedSearch: 'searchByTags'
            },
            closeSearchPanelBtn:{
                tap: 'closeSearchPanel'
            },
            searchField: {
                focus: 'openAdvancedSearch',
                action: 'searchByName'
            }

        }
    },

    searchByName: function(){
        this.dateFrom = new Date();
        this.dateTo = new Date(new Date(new Date().setMonth(new Date().getMonth()-1)).setHours(0, 0, 0));
        var timePeriod={
            from: this.dateTo,
            to:this.dateFrom
        };
        var name = this.getSearchField().getValue();
        var dateFrom =
        Ext.Ajax.request({
            method: 'GET',
            url: '/getDocuments',
            params: {
                name: name,
                tags : null,
                timePeriod:timePeriod
            },
            success: function(response){
                var text = response.responseText;
            },
            error:function(){

            }
        })
    },

    searchByTags: function(tags, timePeriod){
        var name = this.getSearchField().getValue();
        Ext.Ajax.request({
            method: 'GET',
            url: '/getDocuments',
            params: {
                name: name,
                tags : tags,
                timePeriod:timePeriod
            },
            success: function(response){
                var text = response.responseText;
            },
            error:function(){

            }
        })
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
