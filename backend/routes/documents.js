var Document = require('../models/document'),
    express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    var query = Document.find({});
    query.exec(function (err, doc) {
        res.json(doc);
    });
});

router.get('/create', function(req, res) {
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

module.exports = router;