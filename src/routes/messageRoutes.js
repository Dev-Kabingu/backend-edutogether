const express = require("express");
const { createMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting } = require("../controllers/meetingController");

const router = express.Router();


router.post("/create", createMeeting);


router.get("/", getMeetings);


router.get("/:id", getMeetingById);


router.put("/:id", updateMeeting);


router.delete("/:id", deleteMeeting);


module.exports = router;
