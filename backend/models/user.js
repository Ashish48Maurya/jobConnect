const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    postedJob: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    }],
    applied_job: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User;