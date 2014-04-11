/**
 * Created with JetBrains WebStorm.
 * User: ikush
 * Date: 4/10/14
 * Time: 8:09 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');

// End of dependencies.


var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    }
});

mongoose.model('user', UserSchema, 'users');
