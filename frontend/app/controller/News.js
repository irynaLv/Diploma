/**
 * Created by Iruna on 15.06.14.
 */
/**
 * Created by ikush on 6/14/2014.
 */

Ext.define('DL.controller.News', {
    extend: 'Ext.app.Controller',

    requires:[
        'Ext.Ajax',
        'DL.store.Documents'
    ],

    config: {
        refs: {
            newsContainer:{
                xtype:'news-container',
                selector: 'news-container',
                autoCreate:true
            },
            searchPanel:{
                xtype:'search-document-panel',
                selector: 'search-document-panel',
                autoCreate:true
            },
            newsList: 'news-container component[itemId=news-list]',
            logoutBtn:'xtitlebar component[itemId=logout-btn]',
            userDocumentsBtn:'xtitlebar component[itemId=user-document-btn]'


        },
        control: {
            newsContainer: {
                initialize: 'onInitialize'
//                downloadDocument: 'getDocumentById',
//                deleteDocument: 'deleteDocument'
            },
            newsList: {
                downloadDocument: 'getDocumentById',
                deleteDocument: 'deleteDocumentFromList'
            },
            logoutBtn:{
                tapOnLogout:'updateMainPageAfterLogout'
            },

            userDocumentsBtn: {
                showUserDocuments: 'showUserDocuments',
                showAllDocuments: 'updateMainPage'
            },
            searchPanel: {
                loadDataBySearch:'updateMainPage'
            }
        }
    },

    onInitialize: function(){
        var me = this;
        var timePeriod = {
            from:new Date(new Date(new Date().setMonth(new Date().getMonth()-1)).setHours(0, 0, 0)),
            to: new Date()
        };
        Ext.Ajax.request({
            method: 'GET',
            url: '/api/documents',
            params: {
                title:null,
                userId: null,
                tags: null,
                timePeriod: timePeriod
            },
            success: function(response){
                var text = response.responseText;
                me.documents = JSON.parse(text);
                me.updateMainPage();
            },
            error:function(){

            }
        })
    },

    updateMainPage: function(loadData){
        var data = [];
        var mainData;
        if(loadData){
            mainData = loadData
        } else{
            mainData = this.documents;
        }
        var store = Ext.getStore('documents');
        var item = null;
        var documentOwner = null;
        if(localStorage.getItem('userData')) {
            var userData = JSON.parse(localStorage.getItem('userData'));
            var role = userData.role;
            var userName = userData.firstName + ' '+userData.secondName;
            if(role ==1){
                for(var i=0; i<mainData.length; i++){
                    item = mainData[i];
                    if(item.accessLayer.indexOf(3) != -1 ||
                        item.accessLayer.indexOf(1) != -1 ||
                        item.accessLayer.indexOf('3') != -1 ||
                        item.accessLayer.indexOf('1') != -1 ){
                        data.push(item);
                    }else if(item.accessLayer.indexOf(2) != -1 || item.accessLayer.indexOf('2') != -1){
                        documentOwner = item.owner;
                        if(userName == documentOwner){
                            data.push(item);
                        }
                    }
                }
            } else if(role == 2){
                for(var i=0; i<mainData.length; i++){
                    item = mainData[i];
                    documentOwner = item.owner;
                    if(item.accessLayer.indexOf(3) != -1 ||
                        item.accessLayer.indexOf(1) != -1 ||
                        item.accessLayer.indexOf('3') != -1 ||
                        item.accessLayer.indexOf('1') != -1 ||
                        item.accessLayer.indexOf(0) != -1 ||
                        item.accessLayer.indexOf('0') != -1) {
                        data.push(item);
                    } else if(item.accessLayer.indexOf('2') != -1 || item.accessLayer.indexOf(2) != -1){
                        if(userName == documentOwner){
                            data.push(item);
                        }

                    }
                }
            }
        } else{
            for(var i=0; i<mainData.length; i++){
                item = mainData[i];

                if(item.accessLayer.indexOf('3') != -1){
                    data.push(item);
                }
            }
        }

        store.setData(data);
        this.getNewsList().refresh();
    },

    getDocumentById: function(record){
        window.location = '/api/document/' + record.get('_id') + '/download';
//        var me = this;
//        var url = '/api/document/' + record.get('_id') + '/download';
//        Ext.Ajax.request({
//            method: 'GET',
//            url: url
//
//        })

    },

    deleteDocumentFromList: function(record){
        var me = this;
        var record = record;
        var url = '/api/document/' + record.get('_id');
        Ext.Ajax.request({
            method: 'DELETE',
            url: url,
            success: function (response) {
                var text = response.responseText;
                Ext.getStore('documents').remove(record)
            },
            error: function () {

            }
        })
    },
    updateMainPageAfterLogout: function(){
        var store = Ext.getStore('documents');
        var data = [];
        var item = null;

        for(var i=0; i<this.documents.length; i++){
            item = this.documents[i];

            if(item.accessLayer.indexOf('3') != -1){
                data.push(item);
            }
        }

        store.setData(data);
        this.getNewsList().refresh();
    },

    showUserDocuments: function(){
        var store = Ext.getStore('documents');
        var data = [];
        var item = null;
        var userData = JSON.parse(localStorage.getItem('userData'));
        var userName = userData.firstName + ' '+userData.secondName;
        for(var i=0; i<this.documents.length; i++){
            item = this.documents[i];
            var documentOwner = item.owner;
            if(userName == documentOwner){
                data.push(item);
            }
        }

        store.setData(data);
        this.getNewsList().refresh();
    }
});
