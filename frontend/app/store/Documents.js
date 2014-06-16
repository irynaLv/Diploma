/**
 * Created by Iruna on 15.06.14.
 */
Ext.define('DL.store.Documents', {
    extend: 'Ext.data.Store',
    model: 'DL.model.Documents',
    autoLoad: false,
    storeId: 'documents',
    autoSync: true
});