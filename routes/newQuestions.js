var express = require('express');
var router = express.Router();
// const newQuestions = require('../models/newQuestions');
const messageModel = require('../models/message');
const passwordModel = require('../models/password');
const songsModel = require('../models/songs');
const completelyListened = require('../models/completelyListened');
const newQuestionsModel = require('../models/newQuestions');



// router.get('/newQuestions', async function(req, res, next) {
//   try {
//     var result = await newQuestions.find({});
    
//     res.status(200).json({success: true, totalQuestions : result.length})

//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Internal server error : ' + error)
//   }
// });


// /* GET users listing. */
// router.get('/getQuestion/:id', async function(req, res, next) {
//   try {
//     var result = await newQuestions.findOne({id:req.params.id})
//     .select('id question answer');

//     if(!result)
//       return res.status(200).json({success: false, mesaage : "No question found"})



//     return res.status(200).json({success: true, data : result})

//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Internal server error : ' + error)
//   }
// });




router.post('/addQuestion', async function(req, res, next) {
  try {

    var questions = await newQuestionsModel.find({});

    var data = new newQuestionsModel({
      id: questions.length + 1,
      question: req.body.question,
    });

    await newQuestionsModel.create(data);
    
    res.status(200).json({success: true, message : "New Question inserted"})

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


// router.post('/addanswer/:id', async function(req, res, next) {
//   try {
    
//     // console.log("req.body.answer: " + req.body.answer);

//     var answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "]";

//     var result = await newQuestions.findOne({id:req.params.id})

//     // console.log("result : " , result);

//     result.answer.push(answer);

//     result.answersCount = result.answer.length;

//     await result.save();
    
//     res.status(200).json({success: true, message : "Answer successfully saved"})

//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Internal server error : ' + error)
//   }
// });




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
