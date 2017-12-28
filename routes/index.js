var express = require('express');
var router = express.Router();

//my route handlers




router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//app.get('/', (req, res) => {
//  res.send({ hi: 'there' });
//})

module.exports = router;
