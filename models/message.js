const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({

    message: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
});


var QuestionModel = mongoose.model('message', QuestionSchema);
module.exports = QuestionModel;



