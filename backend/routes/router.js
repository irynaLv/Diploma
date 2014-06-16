var Document = require('../models/document'),
    User = require('../models/user'),
    multiparty = require('multiparty'),
    fs = require('fs');

module.exports = function (app, passport) {
    app.get('/api/documents', function(req, res) {
        function escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        var query = Document.find({});
        query.select('-md5 -MIMEType -binaryFile');
        if (req.query.from) {
            query.where('uploadDate').gte(req.query.from - 0);
        }

        if (req.query.to) {
            query.where('uploadDate').lte(req.query.to - 0);
        }

        if (req.query.types) {
            query.where('type').in(req.query.types);
        }

        if (req.query.owner) {
            var str = escapeRegExp(req.query.owner),
                regex = new RegExp('.*' + str + '.*');
            query.where('owner').regex(regex);
        }

        if (req.query.fileName) {
            var str = escapeRegExp(req.query.fileName),
                regex = new RegExp('.*' + str + '.*');
            query.where('fileName').regex(regex);
        }

        query.exec(function (err, doc) {
            console.log(err);
            res.json(doc);
        });
    });

    app.get('/api/document/:id/download', function(req, res) {
        Document.findById(req.params.id, function (err, doc) {
            if (!err && doc) {
                res.json(doc);
            } else {
                res.status(404);
                res.send();
            }
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
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            if(err){
                res.status(404);
                res.send();
            }
            var obj = {
                title: fields.name[0] || 'No title',
                owner: fields.owner[0] || 'No owner',
                accessLayer: [fields.access[0]] || [0],
                description: fields.description[0] || 'No description',
                fileName: files.file[0].originalFilename || 'Test.txt',
                uploadDate: new Date().getTime(),
                updateDate: new Date().getTime(),
                tags: fields.tags || ['doc'],
                type: fields.type[0] || 5,
                binaryFile: fs.readFileSync(files.file[0].path)
            };

            var doc = new Document(obj);
            doc.save(function (err, doc) {
                if (!err && doc) {
                    res.json(doc);
                } else {
                    res.status(404);
                    res.send();
                }
            });
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
        passport.authenticate('local-login', function (err, user, message) {
            if(!user){
                res.json({msg: message});
                return;
            }
            res.json(user);
        })(req, res, next);
    });




//        passport.authenticate('local-login'), function(err, user){
//        return user;
//    });

    // SIGNUP =================================

    // process the signup form
    app.post('/signup', function(req, res, next){
        passport.authenticate('local-signup', function(err, user){
            if(err){
                res.json(err);
            }
            res.json(user);
        })(req, res, next)
    });

    app.get('/users', function (req, res) {

    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}



