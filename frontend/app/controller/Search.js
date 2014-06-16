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
            searchBtn:'component[itemId=search-btn]',

            titlebar: {
                xtype: 'xtitlebar',
                selector: 'xtitlebar',
                autoCreate:true
            },
            searchField: 'xtitlebar component[itemId= documentSearch]',
            dateFrom: 'search-document-panel component[itemId=date-create-from]',
            dateTo: 'search-document-panel component[itemId=date-create-to]',
            owner: 'search-document-panel component[itemId=owner]',
            trainingMaterials: 'search-document-panel component[itemId=trainingMaterials]',
            regulations: 'search-document-panel component[itemId=regulations]',
            minutesOfMeetings: 'search-document-panel component[itemId=minutesOfMeetings]',
            informationMaterials: 'search-document-panel component[itemId=informationMaterials]',
            advertisement: 'search-document-panel component[itemId=advertisement]'
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
                action: 'searchDocument'
            },
            searchBtn:{
                tap:   'searchDocument'
            }

        }
    },

    getType: function(){
        var checkedValue = [];
        if(this.getTrainingMaterials().getChecked()){
            checkedValue.push(this.getTrainingMaterials().getValue())
        }
        if(this.getRegulations().getChecked()){
            checkedValue.push(this.getRegulations().getValue())
        }
        if(this.getMinutesOfMeetings().getChecked()){
            checkedValue.push(this.getMinutesOfMeetings().getValue())
        }
        if(this.getInformationMaterials().getChecked()){
            checkedValue.push(this.getInformationMaterials().getValue())
        }
        if(this.getAdvertisement().getChecked()){
            checkedValue.push(this.getAdvertisement().getValue())
        }
        return checkedValue;
    },


    searchDocument: function(){
        var me = this;
        var dateFrom = this.getDateFrom().getValue().getTime();
        var dateTo = this.getDateTo().getValue().getTime();

        var timePeriod={
            from: dateFrom,
            to:dateTo
        };
        var owner = this.getOwner().getValue();
        var name = this.getSearchField().getValue();
        var types = this.getType();
        Ext.Ajax.request({
            method: 'GET',
            url: '/api/documents',
            params: {
                types:types,
                uploadDate:timePeriod,
                owner: owner,
                fileName: name
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);
                me.getSearchPanel().fireEvent('loadDataBySearch', data);
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
