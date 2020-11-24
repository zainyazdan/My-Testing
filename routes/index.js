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

  var result = await visitedModel.findOne({date: getCurrentDate(), page: req.body.page });

  if(result)
  {
    result.time.push(getCurrentTime());
    result.count++;
    await (await result).save();
    return res.status(200).json({success: true, message : "Time saved aginst date"})
  }

  var data = new visitedModel({
    date:  getCurrentDate(),
    time: getCurrentTime(),
    page: req.body.page
  });

  await visitedModel.create(data);
  return res.status(200).json({success: true, message : "Time saved"})

});





function getCurrentDate()
{
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //As January is 0.
  var yyyy = today.getFullYear();
  var newDate = dd+"-"+mm+"-"+yyyy;

  // console.log("date : " + newDate);

  return newDate;
}


function getCurrentTime()
{

  var d = new Date(); // for now
  d.getHours(); // => 9
  d.getMinutes(); // =>  30
  d.getSeconds(); // => 51
  var newTime = d.getHours() + ":" + d.getMinutes() + ":" +  d.getSeconds();
  console.log("newTime : " + newTime);

  return newTime;
}





module.exports = router;
