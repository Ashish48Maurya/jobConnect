const Job = require("../../models/jobs");
const User = require("../../models/user");

const postJob = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "employer") {
        return res.status(403).json({ message: "You are not authorized to post a job" });
    }
    const { jobTitle, jobType, locationType, location, department, salaryMin, salaryMax, description, requirements, benefits, companyName, companyWebsite, companyDescription, applicationDeadline } = req.body
    if (!jobTitle || !jobType || !locationType || !location || !department || !salaryMin || !salaryMax || !description || !requirements || !benefits || !companyName || !companyWebsite || !companyDescription || !applicationDeadline) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }
    const newJob = await Job.create({ jobTitle, jobType, locationType, location, department, salaryMin, salaryMax, description, requirements, benefits, companyName, companyWebsite, companyDescription, applicationDeadline })
    await user?.postedJob.push(newJob._id)
    await user.save()
    return res.status(201).json({ message: "Job posted successfully", job: newJob })
}

const getJob = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID)
        .populate({
            path: "postedJob",
            options: { sort: { createdAt: -1 } }
        });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "employer") {
        return res.status(401).json({ message: "You are not authorized to view posted jobs" });
    }
    if (user.postedJob.length === 0) {
        return res.status(200).json({ message: "You have not posted any jobs", jobs: [] });
    }
    return res.status(200).json({ message: "Jobs fetched successfully", jobs: user.postedJob });
}


const getJobById = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "employer") {
        return res.status(401).json({ message: "You are not authorized to post a job" });
    }

    if (user.postedJob.length === 0) {
        return res.status(404).json({ message: "You have not posted any jobs" });
    }

    const jobId = req.params.id.toString();
    const postedJobIds = user.postedJob.map(id => id.toString());
    if (!postedJobIds.includes(jobId)) {
        return res.status(401).json({ message: "You are not authorized to edit this job" });
    }
    const job = await Job.findById(req.params.id)
    if (!job) {
        return res.status(404).json({ message: "Job not found" })
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ message: "Job updated successfully", job: updatedJob });
}

const updateJob = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "employer") {
        return res.status(401).json({ message: "You are not authorized to edit a job" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    const postedJobIds = user.postedJob.map(id => id.toString());
    if (!postedJobIds.includes(req.params.id.toString())) {
        return res.status(403).json({ message: "You are not authorized to edit this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({
        message: "Job updated successfully",
        job: updatedJob
    });
};

const deleteJob = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "employer") {
        return res.status(401).json({ message: "You are not authorized to edit a job" });
    }
    const job = await Job.findById(req.params.id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }
    const postedJobIds = user.postedJob.map(id => id.toString());
    if (!postedJobIds.includes(req.params.id.toString())) {
        return res.status(403).json({ message: "You are not authorized to edit this job" });
    }
    await Job.findByIdAndDelete(req.params.id);
    const index = user.postedJob.indexOf(req.params.id);
    if (index > -1) {
        user.postedJob.splice(index, 1);
    }
    await user.save();
    return res.status(200).json({ message: "Job deleted successfully" });
}

const getAllJobs = async (req, res) => {
}
module.exports = {
    postJob,
    getJob,
    getJobById,
    updateJob,
    deleteJob,
    getAllJobs
}