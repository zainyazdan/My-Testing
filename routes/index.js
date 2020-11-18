var express = require('express');
var router = express.Router();

const visitedModel = require('../models/visited');



/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.render('public/timer.html');
  // res.sendFile('public/timer.html');

  console.log("aya re");

});


router.post('/visited', async function(req, res, next) {

  var result = await visitedModel.findOne({date:req.body.date, page: req.body.page });

  if(result)
  {
    result.time.push(req.body.time);
    await (await result).save();
    return res.status(200).json({success: true, message : "Time saved aginst date"})
  }


  var data = new visitedModel({
    date: req.body.date,
    time: req.body.time,
    page: req.body.page
  });

  await visitedModel.create(data);
  return res.status(200).json({success: true, message : "Time saved"})

});






module.exports = router;
