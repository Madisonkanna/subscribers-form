var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/confirmationpage', function(req, res) {
    res.render('confirmationpage', { title: 'This is my confirmation page!' });
});

module.exports = router;
