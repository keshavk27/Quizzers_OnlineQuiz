const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    token:{type: String},
    email: { type: String, required: true, unique: true },
});

const Token = mongoose.model('Token', schema);

module.exports = Token;
