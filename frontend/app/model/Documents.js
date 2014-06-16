/**
 * Created by Iruna on 15.06.14.
 */

Ext.define('DL.model.Documents', {
    extend: 'Ext.data.Model',

    config: {
        fields: [

            {name: '_id',  type: 'string'},
            {name: 'accessLayer',   type: 'array'},
            {name: 'description', type: 'string'},
            {name: 'fileName', type: 'string'},
            {name: 'owner', type: 'string'},
            {name: 'title', type: 'int'},
            {name: 'type', type: 'int'},
            {name: 'uploadDate', type: 'int'}
        ]
    }
});