// const mongoose = require("mongoose");

// const MeetingSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     date: { type: String, required: true },
//     time: { type: String, required: true },
//     description: { type: String, required: true },
// }, { timestamps: true });

// /models/Meeting.js
const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Meeting", meetingSchema);
