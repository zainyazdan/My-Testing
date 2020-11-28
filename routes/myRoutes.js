var express = require('express');
var router = express.Router();
const questionModel = require('../models/questions');
const messageModel = require('../models/message');
const passwordModel = require('../models/password');
const songsModel = require('../models/songs');
const completelyListened = require('../models/completelyListened');
const loadingMessages = require('../models/loadingMessages');
const newQuestionIndex = require('../models/newQuestionIndex');


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




module.exports = router;
