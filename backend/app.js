
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
mongoose.set('debug', true);
var http = require('http');
var path = require('path');

var app = express();

require('./models/user');


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('user');

// end of dependencies.

// TODO: добавить done()?
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password,done){
    User.findOne({ username : username},function(err,user){
        return err
            ? done(err)
            : user
            ? password === user.password
            ? done(null, user)
            : done(null, false, { message: 'Incorrect password.' })
            : done(null, false, { message: 'Incorrect username.' });
    });
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        err
            ? done(err)
            : done(null,user);
    });
});






var db = mongoose.createConnection('mongodb://localhost:27017/DL');
//db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection;

var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');



//var userSchema = mongoose.Schema({
//    login: String,
//    password: String
//});
//
//var User = mongoose.model('User', userSchema);

//mongoose.connect('mongodb://localhost:27017/users');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
//Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//Authentication functionality
app.post('/login', login.login);
app.post('/register', login.register);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
