/**
 * Created by Iruna on 26.03.14.
 */
var express = require('express')
    , app = express() // Web framework to handle routing requests
    , cons = require('consolidate') // Templating library adapter for Express
    , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
    ,path = require('path'),
    http = require('http')
//    photo = require('./routes');
//    , routes = require('./routes'); // Routes for our application

MongoClient.connect('mongodb://localhost:27017', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
//    app.engine('html', cons.swig);
//    app.set('view engine', 'html');
//    app.set('views', __dirname + '/views');
//
//    // Express middleware to populate 'req.cookies' so we can access cookies
//    app.use(express.cookieParser());
//
//    // Express middleware to populate 'req.body' so we can access POST variables
//    app.use(express.bodyParser());
//
//    // Application routes
//    routes(app, db);
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.listen(3000);
    console.log('Express server listening on port 3000');
});