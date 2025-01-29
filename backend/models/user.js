const mongoose = require('mongoose');
const Quiz = require('./quiz');

const schema = new mongoose.Schema({
    name: {type: String, default: "PrakharTheGreat"},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    createdQuizzes:[{type:mongoose.Schema.Types.ObjectId, ref:Quiz}]
});

const User = mongoose.model('User', schema);

module.exports = User;
