
const express = require("express");
const router = express.Router();
const { createMeeting, getMeetings, deleteMeeting } = require("../controllers/meetingController"); // Destructure deleteMeeting

router.post("/create", createMeeting);

router.get("/", getMeetings);

router.delete("/:id", deleteMeeting);

module.exports = router;
