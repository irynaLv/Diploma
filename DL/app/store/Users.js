/**
 * Created by Iruna on 16.03.14.
 */
Ext.define('DL.store.Users', {
    extend: 'Ext.data.Store',
    model: 'DL.model.User',
    autoLoad: true,
    autoSync: true,
    remoteFilter: true
});