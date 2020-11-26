const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var QuestionSchema = new Schema({
    location: {
        type: String
    },
    message: {
        type: String
    }
});


var QuestionModel = mongoose.model('loadingMessage', QuestionSchema);
module.exports = QuestionModel;



