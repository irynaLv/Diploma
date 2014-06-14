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
        Ext.Ajax.request({
            method: 'POST',
            url: '/document/:id',
            params: {
                name: data.name,
                description : data.description,
                type:data.type,
                access : data.accessValue,
                file: data.file
            },
            success: function(response){
                var text = response.responseText;
            },
            error:function(){

            }
        })
    }

});
