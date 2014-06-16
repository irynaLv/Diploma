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
            userData = JSON.parse(userData);
            var owner = userData.firstName + ' ' + userData.secondName;
            var title = userData.title;
        }
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/document',
            params: {
                fileName: data.name,
                owner: owner,
                description : data.description,
                type:data.type,
                accessLayer : data.access,
                binaryFile: data.file,
                title: title
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);

            },
            error:function(){

            }
        })
    }

});
