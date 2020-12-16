const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({
    date: {
        type: String
    },
    activities: {
        type: [String]
    },
    count: {
        type: Number,
        default: 1
    }
});


var QuestionModel = mongoose.model('activity', QuestionSchema);
module.exports = QuestionModel;



