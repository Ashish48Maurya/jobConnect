const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicantSchema = new Schema({
    desc: {
        type: String,
        required: true,
    },
    exp: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "in-review",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;