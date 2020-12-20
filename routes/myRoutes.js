var express = require('express');
var router = express.Router();
const questionModel = require('../models/questions');
const messageModel = require('../models/message');
const passwordModel = require('../models/password');
const songsModel = require('../models/songs');
const completelyListened = require('../models/completelyListened');
const loadingMessages = require('../models/loadingMessages');
const visitedModel = require('../models/visited');
const activitiesModel = require('../models/activities');


/* GET users listing. */
router.get('/questionAnswers', async function (req, res, next) {
  try {
    var result = await questionModel.find({}).select('question answer answersCount');

    res.status(200).json({ success: true, data: result })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


router.get('/getCurrentLoginAndPasswordInfo', async function (req, res, next) {
  try {

    var date = getCurrentDate();
    var login = await visitedModel.find({ date: date });
    var password = await passwordModel.findOne({ date: date });

    if (login.length == 0) {
      return res.status(200).json({ success: false, message: "Us ne abhi login ni kia 😭" })
    }

    return res.status(200).json({ success: true, loginData: login, passwords: password })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});



router.get('/getLoginAndPasswordInfo/:date', async function (req, res, next) {
  try {

    var date = req.params.date;

    var login = await visitedModel.find({ date: date });
    var password = await passwordModel.findOne({ date: date });

    if (login.length == 0) {
      return res.status(200).json({ success: false, message: "Us ne abhi login ni kia 😭" })
    }

    return res.status(200).json({ success: true, loginData: login, passwords: password })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});



router.post('/addActivities', async function (req, res, next) {
  try {


    var activity = await activitiesModel.findOne({ date: getCurrentDate() });

    if (activity) {
      activity.activities.push(req.body.activity + " [" + getCurrentTime() + "]");
      activity.count++;
      await activity.save();
    }
    else {
      var data = new activitiesModel({
        date: getCurrentDate(),
        activities: req.body.activity + " [" + getCurrentTime() + "]",
      })
      await activitiesModel.create(data);
    }

    return res.status(200).json({ success: true, message: "Activity successfully added" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


router.put('/updateQuestion', async function (req, res, next) {
  try {

    var ques = await questionModel.findOne({id: req.body.questionId});
    
    if(!ques)
    {
      return res.status(400).json({ success: true, message: "No Question Found against this questionId" })
    }
    ques.question = req.body.newQuestion;
    await ques.save();
    
    return res.status(200).json({ success: true, message: "Question Updated" })

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
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // Check whether AM or PM 
  var newformat = hours >= 12 ? 'PM' : 'AM';

  // Find current hour in AM-PM Format 
  hours = hours % 12;

  // To display "0" as "12" 
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  var newTime = hours + ':' + minutes + ':' + seconds + ' ' + newformat;

  // console.log("newTime : " + newTime);
  return newTime;
}


module.exports = router;
