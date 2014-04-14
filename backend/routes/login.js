/**
 * Created with JetBrains WebStorm.
 * User: ikush
 * Date: 4/1/14
 * Time: 8:08 PM
 * To change this template use File | Settings | File Templates.
 */
   /*
   *
   *
   *
   * */

/*
 * Login user
 */
require('../models/user');
var mongoose = require('mongoose'),
    db = mongoose.createConnection('mongodb://localhost:27017/DL');

var User = db.model('user');

exports.login = function(req, res){
    //todo add user login
    var user = new User({
        password: req.body.password,
        email: req.body.email
    });
    user.find({email:user.email, password: user.password }, function(err) {
        if (err){
            res.json(err);
        }

        req.logIn(user, function(err) {
            if (err){
                res.json(err);
            }

            res.json(200, {msg: 'registered'});
        });
})
};

exports.register = function(req, res){
    //todo add user login


    var user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName:req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        role: req.body.role,
        birthDay: req.body.birthDay
    });
    user.save(function(err) {
        if (err){
            res.json(err);
        }

        req.logIn(user, function(err) {
            if (err){
                res.json(err);
            }

            res.json(200, {msg: 'registered'});
        });
    });
};
