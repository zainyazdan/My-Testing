var express = require('express');
var router = express.Router();
// const newQuestions = require('../models/newQuestions');
const messageModel = require('../models/message');
const passwordModel = require('../models/password');
const songsModel = require('../models/songs');
const completelyListened = require('../models/completelyListened');
const newQuestionsModel = require('../models/newQuestions');
const newQuestionIndex = require('../models/newQuestionIndex');



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
router.get('/questionAnswers', async function (req, res, next) {
  try {
    var result = await newQuestionsModel.find({})
      .select('-_id -__v');


    return res.status(200).json({ success: true, data: result })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});





router.post('/addQuestion', async function (req, res, next) {
  try {

    var questions = await newQuestionsModel.find({});

    var data = new newQuestionsModel({
      id: questions.length + 1,
      question: req.body.question,
      date: getCurrentDate(),
      time: getCurrentTime()
    });

    await newQuestionsModel.create(data);

    res.status(200).json({ success: true, message: "New Question inserted" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


router.post('/addanswer/:id/:userId', async function (req, res, next) {
  try {

    // console.log("req.body.answer: " + req.body.answer);

  

    var result = await newQuestionsModel.findOne({ id: req.params.id })

    // console.log("result : " , result);
    if (!result) {
      return res.status(200).json({ success: true, message: "Question not found against this question id" })
    }

    var answer;
    if (req.params.userId == "zain")
    {
      result.ZCount++;
      result.replyRequired == false;
      answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "] ZAIN";
    }
    else if (req.params.userId == "llm")
    {
      result.FCount++;
      answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "] _LLM";
    }

    result.answer.push(answer);
    result.answersCount = result.answer.length;

    await result.save();

    var result2 = await newQuestionIndex.findOne( {_id: "5fd62a70f43e088f0f910347"});
    result2.index++;
    await result2.save();

    return res.status(200).json({ success: true, message: "Answer successfully saved" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});



// /* GET users listing. */
router.get('/questionAnswers/:id', async function (req, res, next) {
  try {
    var result = await newQuestionsModel.findOne({id: req.params.id})
      .select('-_id -__v');


    return res.status(200).json({ success: true, data: result })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});





router.get('/newQuestionIndex', async function (req, res, next) {
  try {
    var result = await newQuestionIndex.findOne({_id: '5fd62a70f43e088f0f910347'});
    res.status(200).json({ success: true, index: result.index })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();
  var newDate = dd + "-" + mm + "-" + yyyy;

  // console.log("date : " + newDate);

  return newDate;
}


function getCurrentTime() {

  var d = new Date(); // for now
  d.getHours(); // => 9
  d.getMinutes(); // =>  30
  d.getSeconds(); // => 51
  var newTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  // console.log("newTime : " + newTime);
  return newTime;
}


module.exports = router;
