const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({
    date: {
        type: String
    },
    time: {
        type: String
    },
    page: {
        type: String
    }
});


var QuestionModel = mongoose.model('visited', QuestionSchema);
module.exports = QuestionModel;



