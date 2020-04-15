const { Schema, model }  = require('mongoose');

var BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    post: {
        type: String,
        required: true,
        minlength: 150
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = model('Blog', BlogSchema);