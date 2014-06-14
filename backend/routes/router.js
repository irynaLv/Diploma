/**
 * Created by ahalych on 6/14/2014.
 */

var Document = require('../models/document'),
    User = require('../models/user');

module.exports = function (app, passport) {
    app.get('/api/documents', function(req, res) {
        var query = Document.find({});
        query.exec(function (err, doc) {
            res.json(doc);
        });
    });

    app.get('/api/document/:id', function(req, res) {
        Document.findById(req.params.id, function (err, doc) {
            if (!err && doc) {
                res.json(doc);
            } else {
                res.status(404);
                res.send();
            }
        });
    });
    app.post('/api/document', function(req, res) {
        var doc = new Document(req.body);
        doc.save(function (err, doc) {
            if (!err && doc) {
                res.json(doc[0]);
            } else {
                res.status(404);
                res.send();
            }
        });
    });
    app.post('/api/document/:id', function(req, res) {
        Document.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
            if (!err && doc) {
                res.json(doc);
            } else {
                res.status(404);
                res.send();
            }
        });
    });
    app.delete('/api/document/:id', function(req, res) {
        Document.findByIdAndRemove(req.params.id, function () {
            res.send();
        });
    });

    app.get('/api/users', function(req, res) {
        var query = User.find({});
        query.exec(function (err, doc) {
            res.json(doc);
        });
    });

// normal routes ===============================================================

    // PROFILE SECTION =========================
    app.get('/api/profile', isLoggedIn, function (req, res) {
//        res.render('profile.ejs', {
//            user: req.user
//        });
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // process the login form
    app.post('/login', function(req, res, next){
        passport.authenticate('local-login', function (err, user) {
            res.json(user);
        })(req, res, next);
    });




//        passport.authenticate('local-login'), function(err, user){
//        return user;
//    });

    // SIGNUP =================================

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/users', function (req, res) {

    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}



