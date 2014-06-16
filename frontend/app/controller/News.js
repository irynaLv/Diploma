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
                deleteDocument: 'deleteDocument'
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
        var store = Ext.getStore('documents');
//        console.log('Store is ', store);
        store.setData(this.documents);
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

    }
});
