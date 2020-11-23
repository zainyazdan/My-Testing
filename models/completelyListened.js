const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({

    songName: {
        type: String
    },
    date:{
        type: String
    },
    noOfTimesComplete: {
        type: Number,
        default: 0
    },
    noOfTimesPlayed: {
        type: Number,
        default: 0
    },
    timeCompeltely:{
        type: [String]
    },
    timePlayed:{
        type: [String]
    },
    duration: {
        type: Number
    }

});


var QuestionModel = mongoose.model('completelyListened', QuestionSchema);
module.exports = QuestionModel;



