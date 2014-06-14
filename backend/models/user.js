/**
 * Created with JetBrains WebStorm.
 * User: ikush
 * Date: 4/10/14
 * Time: 8:09 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose'),
    UserSchema = new mongoose.Schema({
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
            required: true,
            unique: true
        },
        role: {
            type: Number,
            required: true
        },
        birthDay: {
            type: Date,
            required: true
        },
        title:{
            type: String,
            required:true
        },
        sex:{
            type: String,
            required:true
        }
    });

module.exports = mongoose.model('user', UserSchema, 'users');
