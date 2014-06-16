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
//                    '<tpl for=".">',
                    '<div> {[this.getTitle(values)]}</div>',
                    '<div>{owner}</div>',
                    '<div> завантажив файл:</div>',
                    '<div> {fileName}</div>',
                    '<div> {uploadDate}</div>',
                    '<div> {description}</div>',
//                    '</tpl>,
                    {
                        getTitle: function(data){
                            console.log("Loading")
                        }
                    }


                )
            }
        ]
    },
    initComponent: function(){
        this.callParent();
    }
})