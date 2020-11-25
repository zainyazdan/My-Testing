const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({

    index: {
        type: Number,
        default: 1
    }
});


var QuestionModel = mongoose.model('newQuestionIndex', QuestionSchema);
module.exports = QuestionModel;



