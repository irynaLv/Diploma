
/*
 * GET users listing.
 */

var mongoose = require('mongoose'),
    db = mongoose.createConnection('mongodb://localhost:27017/users');

mongoose.set('debug', true);

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', console.error.bind(console, 'connected to DB'));
db.on('close', console.error.bind(console, 'connection closed'));


var userSchema = mongoose.Schema({
    login: String,
    password: String
});

var User = db.model('User', userSchema, 'user');


exports.list = function(req, res){
    function returnResponse (users){
        res.json(200, users);
    }


    try {

        User.find({}, function (err, users) {
            if(err){
                console.log(err);
            }else{
                mongoose.connection.close();
                console.log(users);
                returnResponse(users);
    //                res.json(200, users);
            }
        });// end Team.find
    } catch (e){
        console.log(e);
    }

//    db.once('open', function(){
//        var userSchema = mongoose.Schema({
//            login: String,
//            password: String
//        });
//
//        var User = mongoose.model('User', userSchema);
//        User.find(function (err, users) {
//            if(err){
//                console.log(err);
//            }else{
//                mongoose.connection.close();
//                console.log(users);
//                returnResponse(users);
////                res.json(200, users);
//            }
//        });// end Team.find
//    });// end db.once open


//    var User = mongoose.model('User')
//    User.find(function(err, users){
//        if (err) return next(err);
//        res.json(200, users);
//    })

//    req.db.user.find(function(err, user) {
//            if (err) return next(err);
//            if (user) {
////                req.session.auth = true;
////                req.session.userId = user._id.toHexString();
////                req.session.user = user;
////                if (user.admin) {
////                    req.session.admin = true;
////                }
//                console.info('Login USER: ' + req.session.userId);
//                res.json(200, user);
//            } else {
////                next(new Error('User is not found.'));
//            }
//        });

//  res.send({
//      a:'s',
//      b:'s',
//      c:'s',
//      d:'s'
//  });
};