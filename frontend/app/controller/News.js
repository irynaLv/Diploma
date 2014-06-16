/**
 * Created by Iruna on 15.06.14.
 */
/**
 * Created by ikush on 6/14/2014.
 */
Ext.define('DL.controller.News', {
    extend: 'Ext.app.Controller',

    requires:[
        'Ext.Ajax'
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
        Ext.getStore('documents').setData(this.documents);
        this.getNewsList().refresh();
    }



});
