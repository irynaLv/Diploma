
/*
 * GET users listing.
 */

exports.list = function(req, res){
    User.find(function(err, users){
        if (err) return next(err);
        res.json(200, users);
    })

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