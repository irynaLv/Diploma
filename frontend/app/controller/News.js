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
            newsList: 'news-container component[itemId=news-list]'


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

    updateMainPage: function(){
        var data = [];
        var store = Ext.getStore('documents');
        var item = null;
        var documentOwner = null;
        if(localStorage.getItem('userData')) {
            var userData = JSON.parse(localStorage.getItem('userData'));
            var role = userData.role;
            var userName = userData.firstName + ' '+userData.secondName;
            if(role ==2){
                for(var i=0; i<this.documents.length; i++){
                    item = this.documents[i];
                    if(item.accessLayer.indexOf(3) != -1 ||
                        item.accessLayer.indexOf(1) != -1 ||
                        item.accessLayer.indexOf('3') != -1 ||
                        item.accessLayer.indexOf('1') != -1){
                        data.push(item);
                    }else if(item.accessLayer.indexOf(2) != -1 || item.accessLayer.indexOf('2') != -1){
                        documentOwner = item.owner;
                        if(userName == documentOwner){
                            data.push(item);
                        }
                    }
                }
            } else if(role == 1){
                for(var i=0; i<this.documents.length; i++){
                    item = this.documents[i];
                    documentOwner = item.owner;
                    if(item.accessLayer.indexOf('2') != -1 || item.accessLayer.indexOf(2) != -1){
                        if(userName == documentOwner){
                            data.push(item);
                        }

                    }
                }
            }
        } else{
            for(var i=0; i<this.documents.length; i++){
                item = this.documents[i];

                if(item.accessLayer.indexOf('3') != -1){
                    data.push(item);
                }
            }
        }

        store.setData(data);
        this.getNewsList().refresh();
    },

    getDocumentById: function(record){
        var me = this;
        var url = '/api/document/' + record.get('_id');
        Ext.Ajax.request({
            method: 'GET',
            url: url,
            success: function (response) {
                var text = response.responseText;
                me.getLoginBtn().setHidden(false);
                me.getNewDocumentBtn().setHidden(true);
                me.getUserDocumentBtn().setHidden(true);
                me.getLogoutBtn().setHidden(true);
                localStorage.removeItem('userData');
            },
            error: function () {

            }
        })

    },

    deleteDocumentFromList: function(event, target, element, e, eOpts){
        var innerEl = Ext.get(event.delegatedTarget);
        var   idList = innerEl.up('.x-dataview-item').getId();
        var    el = Ext.getCmp(idList);
//        var    record = el.getRecord();
//        var    memberId = record.get('_id')
    }
});
