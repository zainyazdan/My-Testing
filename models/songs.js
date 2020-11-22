const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({

    songName: {
        type: String
    },
    answer: {
        type: [String]
    },
    // date: {
    //     type: String
    // },
    // time: {
    //     type: String
    // },
});


var QuestionModel = mongoose.model('song', QuestionSchema);
module.exports = QuestionModel;



