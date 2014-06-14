var express = require('express'),
    mongoose = require('mongoose'),
    db = mongoose.createConnection(process.env.DB_URL),
    router = express.Router();

var userSchema = mongoose.Schema({
    login: String,
    password: String
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
