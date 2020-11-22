var express = require('express');
var router = express.Router();
const questionModel = require('../models/questions');
const messageModel = require('../models/message');
const passwordModel = require('../models/password');
const songsModel = require('../models/songs');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    var result = await questionModel.find({});
    
    res.status(200).json({success: true, data : result})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});

router.get('/totalQuestions', async function(req, res, next) {
  try {
    var result = await questionModel.find({});
    
    res.status(200).json({success: true, totalQuestions : result.length})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


/* GET users listing. */
router.get('/getQuestion/:id', async function(req, res, next) {
  try {
    var result = await questionModel.findOne({id:req.params.id})
    .select('id question answer');

    if(!result)
    return res.status(200).json({success: false, mesaage : "No question found"})



    return res.status(200).json({success: true, data : result})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.post('/addQuestion', async function(req, res, next) {
  try {

    var data = new questionModel({
      id: req.body.id,
      question: req.body.question,
    });

    var result = await questionModel.create(data);
    
    res.status(200).json({success: true, message : "Question inserted"})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


router.post('/addanswer/:id', async function(req, res, next) {
  try {
    
    // console.log("req.body.answer: " + req.body.answer);

    var answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "]";

    var result = await questionModel.findOne({id:req.params.id})

    // console.log("result : " , result);

    result.answer.push(answer);

    await result.save();
    
    res.status(200).json({success: true, message : "Answer successfully saved"})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.post('/addMessage', async function(req, res, next) {
  try {

    var data = new messageModel({
      message: req.body.message,
      date: getCurrentDate(),
      time: getCurrentTime()
    });

    await messageModel.create(data);
    
    res.status(200).json({success: true, message : "Message successfully saved"})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});



router.post('/addPassword', async function(req, res, next) {
  try {

    var data = new passwordModel({
      password: req.body.password,
      date: getCurrentDate(),
      time: getCurrentTime()
    });

    await passwordModel.create(data);
    
    return res.status(200).json({success: true, message : "Password successfully saved"})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.post('/addSongAnswer', async function(req, res, next) {
  try {
    
    var answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "]";
    var result = await songsModel.findOne({songName: req.body.song})

    if(result)
    {
      result.answer.push(answer);
      await result.save();
      return res.status(200).json({success: true, message : "Answer successfully added"})
    }
    
    var a = new songsModel({
      songName: req.body.song,
      answer: answer
    });

    await songsModel.create(a);
    
    return res.status(200).json({success: true, message : "New Song Answer successfully created"})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
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
