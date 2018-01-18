const express = require('express');

const router = express.Router();

// my route handlers


router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});


// app.get('/', (req, res) => {
//  res.send({ hi: 'there' });
// })

module.exports = router;
