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

    app.get('/api/documents/create', function(req, res) {
        var doc = new Document({
            documentId: 12,
            title: 'First Doc',
            owner: 'Some Owner',
            accessLayer: 1,
            description: 'This is first doc',
            fileName: 'path to file',
            uploadDate: new Date(),
            updateDate: new Date(),
            tags: ["pdf", "My work"],
            type: "doc"
        });
        doc.save(function (err) {
            if (err) // ...
                console.log(err);
        });

        console.log(doc);

        var query = Document.find({});
        query.exec(function (err, doc) {
            res.json(doc);
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
    app.get('/profile', isLoggedIn, function (req, res) {
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



