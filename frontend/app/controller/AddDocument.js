/**
 * Created by ikush on 6/14/2014.
 */
Ext.define('DL.controller.AddDocument', {
    extend: 'Ext.app.Controller',

    requires:[
        'Ext.Ajax'
    ],

    config: {
        refs: {
            addDocumentPanel:{
                xtype:'add-document-panel',
                selector: 'add-document-panel',
                autoCreate:true
            },
            uploadNewDocumentBtn:'add-document-panel component[itemId=upload-btn]'

        },
        control: {
            addDocumentPanel: {
                uploadNewFile: 'uploadNewDocument'
            }

        }
    },

    uploadNewDocument: function(data){
        var userData = localStorage.getItem('userData');
        if(userData){
            var arr = userData.split('"');
            var indexLastName = arr.indexOf('lastLame');
            var lastName = arr[indexLastName+2];
            var indexUserTitle = arr.indexOf('title');
            var title = arr[indexUserTitle+2];
        }
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/document',
            params: {
                fileName: data.name,
                owner: lastName,
                description : data.description,
                type:data.type,
                accessLayer : data.accessValue,
                binaryFile: data.file,
                title: title,
                creationDate: new Date(),
                updateDate: new Date()
            },
            success: function(response){
                var text = response.responseText;
            },
            error:function(){

            }
        })
    }

});
