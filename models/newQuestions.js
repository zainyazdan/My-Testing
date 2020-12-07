const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({
    id: {
        type: Number
    },
    question: {
        type: String
    },
    answer: {
        type: [String]
    },
    answersCount: {
        type: Number,
        default: 0
    },
    ZCount: {
        type: Number,
        default: 0
    },
    FCount: {
        type: Number,
        default: 0
    },
    replyRequired: {
        type: Boolean,
        default: true
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
});


var QuestionModel = mongoose.model('newQuestion', QuestionSchema);
module.exports = QuestionModel;



