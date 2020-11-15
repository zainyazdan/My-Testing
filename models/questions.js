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
    // date: {
    //     type: [String]
    // },
    // time: {
    //     type: [String]
    // },
});


var QuestionModel = mongoose.model('question', QuestionSchema);
module.exports = QuestionModel;



