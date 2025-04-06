const Applicant = require("../../models/applicants");
const Job = require("../../models/jobs");
const User = require("../../models/user");
const sendAcceptanceEmail = require("../../utils/accept");
const sendRejectionEmail = require("../../utils/reject");

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
    try {
        const jobs = await Job.find({}).sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(200).json({ message: "No jobs found", jobs: [] });
        }

        return res.status(200).json({ message: "Jobs fetched successfully", jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        return res.status(500).json({ message: "Server error while fetching jobs" });
    }
};

const applyJob = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID);
    const { desc, exp, resume } = req.body

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (!desc || !exp || !resume) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const jobId = req.params.id.toString();
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const applicant = await Applicant.create({
            desc,
            exp,
            resume,
            user: userID,
            job: jobId,
        });

        user.applied_job.push(jobId);
        await user.save();

        job.participants.push(user._id);
        await job.save();
        return res.status(200).json({ message: "Job applied successfully" });
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Server error while applying for job" })
    }
}


const getAppliedJobs = async (req, res) => {
    const userID = req.userID;

    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.applied_job || user.applied_job.length === 0) {
            return res.status(200).json({ message: 'No applied jobs found', jobs: [] });
        }

        const applied_jobs = await Promise.all(
            user.applied_job.map(async (jobId) => {
                const job = await Job.findById(jobId).select('jobTitle companyName');
                return job;
            })
        );

        const applied = await Promise.all(
            applied_jobs.map(async (jobId) => {
                const job = await Applicant.findOne({ job: jobId, user: userID })
                    .populate('job', 'jobTitle companyName')
                    .populate('user', 'name email')
                    .select('status createdAt');
                return job;
            })
        );


        return res.status(200).json({
            message: 'Applied jobs fetched successfully',
            jobs: applied,
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: 'Server error while fetching applied jobs',
        });
    }
};

const listParticipants = async (req, res) => {
    const userID = req.userID;

    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const postedJobs = user.postedJob; // array of job IDs

        const participantsData = await Promise.all(
            postedJobs.map(async (jobId) => {
                const applicants = await Applicant.find({ job: jobId })
                    .populate('user', 'name email')
                    .populate('job', 'jobTitle')
                    .select('status createdAt desc exp resume');

                return {
                    participants: applicants.map(app => ({
                        jobId,
                        jobTitle: applicants[0]?.job?.jobTitle || 'Untitled',
                        name: app.user.name,
                        email: app.user.email,
                        status: app.status,
                        appliedAt: app.createdAt,
                        description: app.desc,
                        experience: app.exp,
                        resume: app.resume,
                        applicantId: app._id,
                    }))
                };
            })
        );

        return res.status(200).json({
            message: 'Participants fetched successfully',
            jobs: participantsData
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: 'Server error while fetching participants',
        });
    }
};


const acceptApplication = async (req, res) => {
    const userID = req.userID;
    const {email,name,role} = req.body
    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== "employer") {
            return res.status(401).json({ message: "You are not authorized to post a job" });
        }

        const jobId = req.params.id.toString();
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        const applicantId = req.params.applicantId.toString();
        const applicant = await Applicant.findById(applicantId);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }
        if (applicant.status === "Accepted") {
            return res.status(400).json({ message: "Applicant already accepted" });
        }
        applicant.status = "Accepted";
        await applicant.save();
        await sendAcceptanceEmail(email, name, role)

        return res.status(200).json({ message: "Application accepted and email sent successfully " });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: 'Server error while fetching participants',
        });
    }
}

const rejectApplication = async (req, res) => {
    const userID = req.userID;
    const {email,name,role} = req.body
    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== "employer") {
            return res.status(401).json({ message: "You are not authorized to post a job" });
        }

        const jobId = req.params.id.toString();
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        const applicantId = req.params.applicantId.toString();
        const applicant = await Applicant.findById(applicantId);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }
        if (applicant.status === "Rejected") {
            return res.status(400).json({ message: "Applicant already rejected" });
        }
        applicant.status = "Rejected";
        await applicant.save();
        await sendRejectionEmail(email, name, role)

        return res.status(200).json({ message: "Application rejected and email sent successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: 'Server error while fetching participants',
        });
    }
}

module.exports = {
    postJob,
    getJob,
    getJobById,
    updateJob,
    deleteJob,
    getAllJobs,
    applyJob,
    getAppliedJobs,
    listParticipants,
    acceptApplication,
    rejectApplication
}