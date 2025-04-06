const express = require("express");
const { postJob, getJobById, getJob, updateJob, deleteJob } = require("../../controllers/job");
const authMiddleware = require("../../middleware/auth");
const router = express.Router();

router.post("/job",authMiddleware(), postJob);
router.put("/job/:id",authMiddleware(), updateJob);
router.get("/job/:id",authMiddleware(), getJobById);
router.get("/jobs",authMiddleware(), getJob);
router.delete("/job/:id",authMiddleware(), deleteJob);

module.exports = router;