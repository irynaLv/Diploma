/**
 * Created by ikush on 5/29/2014.
 */
Ext.define('DL.view.News', {
    extend: 'Ext.Container',
    xtype: 'news-container',
    alias: 'widget.news-container',

    config: {
        layout: {
            type: 'vbox',
            align:'stretch'
        },
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        width: '100%',
        height: '90%',
        flex: 1,
        left: 0,
        top: '10%',
        right: 0,
        cls: 'news-container',
        items:[
            {
                xtype:'dataview',
                store: 'documents',
                itemId: 'news-list',
                height: '100%',

                flex: 1,
                cls: 'news-list',
                itemTpl: new Ext.XTemplate(
                        '<div class="news-item">' +
                        '<div class="main-cont">' +
                            '<div class="date">{[this.getDate(values)]}</div>',
                            '<div class="news">{[this.getUserTitle(values)]}{owner} {[this.getNewsType(values)]}{fileName}</div>',
                            '<div class="btn-container"> ' ,

                                '<div class="download" style="display:{[this.checkIfAdvert(values)]}"></div>',
                                '<div class="delete-btn {[this.checkIfUserOwner(values)]}"></div>',

                            '</div>',
                        '</div>',
                    '<div class="description"> {description}</div>',
                    '</div>',
                    {
                        getNewsType: function(data){
                            var type = data.type;
                            if(type == 4){
                                return ' додав оголошення: '
                            } else{
                               return 'завантажив файл '
                            }
                        },

                        checkIfAdvert: function(data){
                            var type = data.type;
                            if(type == 4){
                                return 'none'
                            } else{
                                return 'block'
                            }
                        },

                        checkIfUserOwner: function(data){
                             var documentOwner = data.owner;
                            var deleteClass = 'not-owner';
                            if(localStorage.getItem('userData')){
                                var userData = JSON.parse(localStorage.getItem('userData'));
                                var userName = userData.firstName + ' '+userData.secondName;
                                if(documentOwner == userName){
                                    deleteClass = 'owner'
                                }
                            }
                            return deleteClass;
                        },
                        getDate: function(data){
                            var fullDate = data.uploadDate;
                            var date = null;
                            var month = null;
                            var year = null;
                            if(fullDate){
                                date = new Date(fullDate).getDate();
                                month = new Date(fullDate).getMonth();
                                year = new Date(fullDate).getFullYear();

                            }else{
                                date = new Date().getDate();
                                month = new Date().getMonth();
                                year = new Date().getFullYear();
                            }
                            if(Ext.os.deviceType == 'Phone'){
                                return  date + '.' + month;
                            }
                            return date + '.' + month +"."+ year

                        },
                        getUserTitle: function(data){
                            var title = data.title;
                            if(title){
                                switch (title){
                                    case 1:
                                        return 'проф.'
                                    case 2:
                                        return 'доц.'
                                    case 3:
                                        return 'ас.'
                                    case 4:
                                        return 'ст.викл.'
                                    case 5:
                                        return 'мнс.'
                                    case 6:
                                        return 'ст.наук.співр.'
                                    case 7:
                                        return 'інжн.'
                                    case 8:
                                        return 'лаб.'
                                    case 9:
                                        return 'зав.лаб.'
                                    case 10:
                                        return 'бухг.'
                                }
                            } else {
                                return 'студ.'
                            }
                        }

                    }


                ),
                listeners: [
                    {
                        event: 'itemtap',
                        fn: function (view, index, target, record, e, eOpts) {
                            if(e.target.classList.contains('download')){
                                this.fireEvent('downloadDocument', record);
                            } else if (e.target.classList.contains('delete-btn')) {
                                this.fireEvent('deleteDocument', record);
                            } else if (e.target.classList.contains('news')) {
                                //TODO add logic for styling
//                                this.fireEvent('deleteDocument', record);
                            }
                        }
                    }
                ]
            }
        ]
//        listeners:[
//            {
//                delegate: 'div.download',
////                element: 'element',
//                event: 'tap',
//                fn: function (event, target, element, e, eOpts) {
//                    var innerEl = Ext.get(event.delegatedTarget.parentElement);
//                    this.fireEvent('downloadDocument');
//
//                }
//            },
//            {
//                delegate: 'div.delete-btn',
//                element: 'element',
//                event: 'tap',
//                fn: function (event, target, element, e, eOpts) {
//                    var innerEl = Ext.get(event.delegatedTarget.parentElement);
//                    this.fireEvent('deleteDocument');
//
//                }
//            },
//            {
//                delegate: 'div.news',
//                element: 'element',
//                event: 'tap',
//                fn: function (event, target, element, e, eOpts) {
//                    var innerEl = Ext.get(event.delegatedTarget.parentElement);
//                    var visibility = innerEl.dom.nextElementSibling.getAttribute('style', 'display');
//                    if(visibility == "display:block"){
//                        innerEl.dom.nextElementSibling.setAttribute('style', 'display:none')
//                    } else{
//                        innerEl.dom.nextElementSibling.setAttribute('style', 'display:block')
//                    }
//
//
//                }
//            }
//            ]
    },
    initialize: function(){
        this.callParent();
    }
})