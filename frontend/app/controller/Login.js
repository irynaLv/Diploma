/**
 * Created by ikush on 6/14/2014.
 */
Ext.define('DL.controller.Login', {
    extend: 'Ext.app.Controller',

    requires:[
        'Ext.Ajax'
    ],

    config: {
        refs: {
            loginPanel:{
                xtype:'login-form',
                selector: 'login-form',
                autoCreate:true
            },
            submitSearchPanelBtn:'login-form component[itemId=submit-btn]',
            loginBtn:'xtitlebar component[itemId=login-btn]',
            logoutBtn:'xtitlebar component[itemId=logout-btn]',
            newDocumentBtn:'xtitlebar component[itemId= add-document-btn]',
            userDocumentBtn:'xtitlebar component[itemId=user-document-btn]',
            registrationForm:{
                xtype:'registration-form',
                selector: 'registration-form',
                autoCreate:true
            }



        },
        control: {
            loginPanel: {
                sendLoginForm: 'sendLoginRequest'
            },
            logoutBtn:{
                tap:'logoutUser'
            },
            registrationForm: {
                loginUserAfterRegister:'loginUser'
            }

        }
    },

    sendLoginRequest: function(email, password){
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: '/login',
            params: {
                password: password,
                email: email
            },
            success: function(response){
                var text = response.responseText;
                me.loginUser(text);
            },
            error:function(){

            }
        })
    },

    loginUser: function(data){
        var userData = JSON.parse(data);
        if(userData.msg == "Oops! Wrong password." || userData == false){
            return;
        }  else{
            this.userData = userData;
            localStorage.setItem('userData', data);
            this.getLoginBtn().setHidden(true);
            this.getNewDocumentBtn().setHidden(false);
            this.getUserDocumentBtn().setHidden(false);
            this.getLogoutBtn().setHidden(false);
            this.getLoginPanel().destroy();
            this.loadDocuments();
        }


    },

    logoutUser:function(){
        var me = this;
        Ext.Ajax.request({
            method: 'GET',
            url: '/logout',
            params: {
            },
            success: function(response){
                var text = response.responseText;
                me.getLoginBtn().setHidden(false);
                me.getNewDocumentBtn().setHidden(true);
                me.getUserDocumentBtn().setHidden(true);
                me.getLogoutBtn().setHidden(true);
                localStorage.removeItem('userData');
            },
            error:function(){

            }
        })
    },

    loadDocuments: function(){
        var me = this;
        var userId = this.userData._id;
        var timePeriod = {
            from:new Date(new Date(new Date().setMonth(new Date().getMonth()-1)).setHours(0, 0, 0)),
            to: new Date()
        };
        Ext.Ajax.request({
            method: 'GET',
            url: '/api/documents',
            params: {
                title:null,
                userId: userId,
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

    }

});
