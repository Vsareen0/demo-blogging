const { Schema, model }  = require('mongoose');

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('User', UserSchema);