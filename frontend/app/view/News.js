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
                        '<div class="news">{owner} завантажив файл {fileName}</div>',
                    '<div class="download"></div>',
                    '</div>',
                    '<div class="description"> {description}</div>',
                    '</div>',
                    {
                        getDate: function(data){

                        }
                    }


                )
            }
        ],
        listeners:[
            {
                delegate: 'div.download',
                element: 'element',
                event: 'tap',
                fn: function (event, target, element, e, eOpts) {
                    var innerEl = Ext.get(event.delegatedTarget.parentElement);
                    this.fireEvent('downloadDocument');

                }
            },
            {
                delegate: 'div.news',
                element: 'element',
                event: 'tap',
                fn: function (event, target, element, e, eOpts) {
                    var innerEl = Ext.get(event.delegatedTarget.parentElement);
                    var visibility = innerEl.dom.nextElementSibling.getAttribute('style', 'display');
                    if(visibility == "display:block"){
                        innerEl.dom.nextElementSibling.setAttribute('style', 'display:none')
                    } else{
                        innerEl.dom.nextElementSibling.setAttribute('style', 'display:block')
                    }


                }
            }
            ]
    },
    initComponent: function(){
        this.callParent();
    }
})