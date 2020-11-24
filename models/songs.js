const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({

    songName: {
        type: String
    },
    answer: {
        type: [String]
    },
    count: {
        type: Number,
        default: 1
    }
});


var QuestionModel = mongoose.model('song', QuestionSchema);
module.exports = QuestionModel;



