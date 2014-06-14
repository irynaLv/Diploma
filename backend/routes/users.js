var User = require('../models/user'),
    express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    var query = User.find({});
    query.exec(function (err, doc) {
        res.json(doc);
    });
});

module.exports = router;