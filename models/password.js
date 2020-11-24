const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({

    password: {
        type: [String]
    },
    date: {
        type: String
    },
    // time: {
    //     type: [String]
    // },
    count: {
        type: Number,
        default: 1
    }
});


var QuestionModel = mongoose.model('password', QuestionSchema);
module.exports = QuestionModel;



