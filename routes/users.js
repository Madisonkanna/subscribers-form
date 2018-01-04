const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json([
    {id: 1, username: "Madison"},
    {id: 2, username: "Madison two"}
    ]);
});

router.post('/', (res, req, next) => {
  console.log('Creating user');
  //pull the data from the form, in post in the request
  // create an object in the database using that data
  //send a response indiciating if it worked

})

//Post request for my user to post data

module.exports = router;
