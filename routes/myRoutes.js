var express = require('express');
var router = express.Router();
const questionModel = require('../models/questions');
const messageModel = require('../models/message');
const passwordModel = require('../models/password');
const songsModel = require('../models/songs');
const completelyListened = require('../models/completelyListened');
const loadingMessages = require('../models/loadingMessages');
const visitedModel = require('../models/visited');


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
    var login = await visitedModel.find({date: date});
    var password = await passwordModel.findOne({date: date});

    if(login.length == 0)
    {
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
     
    var login = await visitedModel.find({date: date});
    var password = await passwordModel.findOne({date: date});

    if(login.length == 0)
    {
      return res.status(200).json({ success: false, message: "Us ne abhi login ni kia 😭" })
    }

    return res.status(200).json({ success: true, loginData: login, passwords: password })

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


module.exports = router;
