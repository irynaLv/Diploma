/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".

 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */

Ext.Loader.setConfig({
    disableCaching: false

});


Ext.Loader.setPath({
    'Ext': '../touch/src',
//    'CoPilot': '../common',
//    'oAuth': '../common/oAuth',
    'TL': 'app'
});


Ext.application({
    name: 'DL',
//	autoCreateViewport: true,

    requires: [
        'Ext.Ajax',
        'Ext.MessageBox'
    ],

    views: [

        "Main",
        'Menu',
        'XTitlebar',
        'LoginForm',
        'RegistrationForm',
        'AddDocument',
        'Search'
    ],

    controllers: [
        // TODO: add controllers here

        'RegistrationForm'
//            'Main'
    ],

    stores: [
        // TODO: add stores here
//            'DL.store.Users'
    ],

    models: [
//            'DL.model.User'
    ],


    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
//
    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
//        Ext.Ajax.request({
//            method: 'POST',
//            url: 'http://localhost:3000/register',
//            params: {
//                username: 'test1',
//                password: 'test1',
//                firstName:'test1',
//                secondName: 'test1',
//                email: 'test1@mail.com',
//                role: 1,
//                birthDay: new Date()
//            },
//            success: function(response){
//                var text = response.responseText;
//                // process server response here
//            }
//        });

        Ext.fly('appLoadingIndicator').destroy();
//
        // Initialize the main view
        Ext.Viewport.add(Ext.create('DL.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});