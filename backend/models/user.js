const mongoose = require('mongoose');
const Quiz = require('./quiz');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role:{
        type: String,
        enum: ["student", "teacher"], 
    },
    createdQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: Quiz }],
    result: {
        type: Map,
        of: {
            type: {
                score: {type: Number},
                markedAnswers:{
                    type:[Number],
                    default:[]
                },
                timeSpent:{
                    type:[Number],
                    default:[]
                }
            }
        },
        default: {}
    }
});

const User = mongoose.model('User', schema);

module.exports = User;
