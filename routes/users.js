var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/login', async function(req, res, next) {



  res.status(200).json({status: true, message:'THIS IS YOUR GIFT'});
  // res.send('THIS IS YOUR GIFT');
  // res.redirect('/');

});

module.exports = router;
