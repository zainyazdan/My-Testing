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
router.get('/', async function (req, res, next) {
  try {
    var result = await questionModel.find({});

    res.status(200).json({ success: true, data: result })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});

router.get('/totalQuestions', async function (req, res, next) {
  try {
    var result = await questionModel.find({});

    res.status(200).json({ success: true, totalQuestions: result.length })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


/* GET users listing. */
router.get('/getQuestion/:id', async function (req, res, next) {
  try {
    var result = await questionModel.findOne({ id: req.params.id })
      .select('id question answer');

    if (!result)
      return res.status(200).json({ success: false, mesaage: "No question found" })



    return res.status(200).json({ success: true, data: result })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.post('/addQuestion', async function (req, res, next) {
  try {

    var questions = await questionModel.find({});

    var data = new questionModel({
      id: questions.length + 1,
      question: req.body.question,
    });

    var result = await questionModel.create(data);

    res.status(200).json({ success: true, message: "Question inserted" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


router.post('/addanswer/:id', async function (req, res, next) {
  try {

    // console.log("req.body.answer: " + req.body.answer);

    var answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "]";

    var result = await questionModel.findOne({ id: req.params.id })

    // console.log("result : " , result);

    result.answer.push(answer);

    result.answersCount = result.answer.length;

    await result.save();

    if(result.answer.length == 1)
    {
      var result2 = await newQuestionIndex.findById("5fbeebd53019410c2ca5b094");
      result2.index = req.params.id;
      await result2.save();
    }

    return res.status(200).json({ success: true, message: "Answer successfully saved" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.post('/addMessage', async function (req, res, next) {
  try {

    var data = new messageModel({
      message: req.body.message,
      date: getCurrentDate(),
      time: getCurrentTime()
    });

    await messageModel.create(data);

    res.status(200).json({ success: true, message: "Message successfully saved" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});



router.post('/addPassword', async function (req, res, next) {
  try {

    var result = await passwordModel.findOne({ date: getCurrentDate() });

    if (result) {
      result.password.push(req.body.password + " [" + getCurrentTime() + "]");
      // result.time.push(getCurrentTime());
      result.count++;

      await result.save()
      return res.status(200).json({ success: true, message: "Password successfully added" })
    }

    var data = new passwordModel({
      password: req.body.password + " [" + getCurrentTime() + "]",
      date: getCurrentDate()
    });

    await passwordModel.create(data);

    return res.status(200).json({ success: true, message: "New Password successfully saved" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.post('/addSongAnswer', async function (req, res, next) {
  try {

    var answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "]";
    var result = await songsModel.findOne({ songName: req.body.song })

    if (result) {
      result.answer.push(answer);

      result.count = result.answer.length;
      await result.save();
      return res.status(200).json({ success: true, message: "Answer successfully added" })
    }

    var a = new songsModel({
      songName: req.body.song,
      answer: answer
    });

    await songsModel.create(a);

    return res.status(200).json({ success: true, message: "New Song Answer successfully created" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});





router.post('/songCompleted', async function (req, res, next) {
  try {


    // var answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "]";
    var result = await completelyListened.findOne({ date: getCurrentDate(), songName: req.body.song })

    if (result) {
      result.timeCompeltely.push(getCurrentTime());
      result.noOfTimesComplete++;
      await result.save();
      return res.status(200).json({ success: true, message: "Song completely listened successfully added" })
    }

    var a = new completelyListened({
      songName: req.body.song,
      noOfTimesComplete: 1,
      date: getCurrentDate(),
      timeCompeltely: getCurrentTime(),
      duration: req.body.duration
    });

    await completelyListened.create(a);
    return res.status(200).json({ success: true, message: "New completely listened successfully created" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.post('/songPlayed', async function (req, res, next) {
  try {


    // var answer = req.body.answer + "  [data: " + getCurrentDate() + ", time: " + getCurrentTime() + "]";
    var result = await completelyListened.findOne({ date: getCurrentDate(), songName: req.body.song })

    if (result) {
      result.timePlayed.push(getCurrentTime());
      result.noOfTimesPlayed++;
      await result.save();
      return res.status(200).json({ success: true, message: "Song completely listened successfully added" })
    }

    var a = new completelyListened({
      songName: req.body.song,
      noOfTimesPlayed: 1,
      date: getCurrentDate(),
      timePlayed: getCurrentTime(),
      duration: req.body.duration
    });

    await completelyListened.create(a);
    return res.status(200).json({ success: true, message: "New completely listened successfully created" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.get('/getTimeAndDate', async function (req, res, next) {
  try {
    var result = await questionModel.find({});

    res.status(200).json({ success: true, time: getCurrentTime(), date: getCurrentDate() })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});



router.post('/addnewQuestionIndex', async function (req, res, next) {
  try {
    var d = new newQuestionIndex({
      index: req.body.index
    })

    var result = await newQuestionIndex.create(d);

    res.status(200).json({ success: true, message: "Index Inserted successfully" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});


router.get('/newQuestionIndex', async function (req, res, next) {
  try {
    var result = await newQuestionIndex.find({});

    res.status(200).json({ success: true, index: result[0].index })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.post('/addLoadingMessage', async function (req, res, next) {
  try {

    var data = new loadingMessages({
      location: req.body.location,
      message: req.body.message
    });

    await loadingMessages.create(data);

    return res.status(200).json({ success: true, messsage: "Loadming message successfullt inserted" })

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error : ' + error)
  }
});




router.get('/getLoadingMessage/:location', async function (req, res, next) {
  try {

  
    var result = await loadingMessages.findOne( {location : req.params.location}, 'message' );
    if(!result)
      return res.status(400).json({ success: false, messsage: "Loadming message not found" })

    return res.status(200).json({ success: true, data: result })

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


// function getCurrentTime() {

//   var d = new Date(); // for now
//   d.getHours(); // => 9
//   d.getMinutes(); // =>  30
//   d.getSeconds(); // => 51
//   var newTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//   console.log("newTime : " + newTime);

//   return newTime;
// }



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
