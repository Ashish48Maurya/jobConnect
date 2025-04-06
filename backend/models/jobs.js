const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  locationType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salaryMin: {
    type: Number,
    required: true,
  },
  salaryMax: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    required: true,
  },
  participants:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  companyWebsite: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;