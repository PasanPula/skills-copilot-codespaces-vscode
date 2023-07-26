// Create web server

var express = require('express');
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var comment = require('../models/comment.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  comment.all(function(data) {
    var hbsObject = {
      comments: data
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/comments', function(req, res) {
  comment.create(['comment', 'author'], [req.body.comment, req.body.author], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

