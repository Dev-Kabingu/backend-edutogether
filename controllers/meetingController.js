const Meeting = require("../models/Meeting");
const User = require("../models/User");
const { sendMeetingEmail } = require("../config/nodemailerConfig");
const { sendMeetingNotification } = require("../utils/socket");


exports.createMeeting = async (req, res) => {
    try {
        console.log(" Received meeting data:", req.body);

        const { title, date, time, description } = req.body;

        if (!title || !date || !time || !description) {
            console.log("Missing fields:", { title, date, time, description });
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

       
        const attendees = await User.find({ role: { $in: ["parent", "teacher"] } }).select("_id email");

        if (attendees.length === 0) {
            console.log(" No parents or teachers found!");
            return res.status(400).json({ success: false, message: "No attendees available" });
        }

        const attendeeIds = attendees.map(user => user._id);
        const emails = attendees.map(user => user.email);

        console.log(` Found ${attendees.length} attendees`);

      
        const newMeeting = new Meeting({ title, date, time, description, attendees: attendeeIds });
        await newMeeting.save();

        console.log(" Meeting Created:", newMeeting);

        const emailMessage = `Dear Parent/Teacher,\n\nA new meeting has been scheduled:\n\n Date: ${date}\n Time: ${time}\n📝 Title: ${title}\n📖 Description: ${description}\n\nThank you.`;
        emails.forEach(email => sendMeetingEmail(email, "New Meeting Scheduled", emailMessage));

        
        sendMeetingNotification({ title, description, date, time });

        res.status(201).json({ success: true, message: "Meeting scheduled successfully", newMeeting });
    } catch (error) {
        console.error("Error creating meeting:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};
// meetingController.js
exports.getMeetings = async (req, res) => {
    try {
        console.log(" Fetching all meetings...");
        
        const meetings = await Meeting.find();

        console.log("Fetched Meetings:", meetings);
        res.status(200).json({ success: true, meetings });
    } catch (error) {
        console.error("Error fetching meetings:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteMeeting = async (req, res) => {
    try {
      const meetingId = req.params.id;
      console.log("Attempting to delete meeting with ID:", meetingId); // Log the ID
  
   
      const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);
      if (!deletedMeeting) {
        return res.status(404).json({ success: false, message: "Meeting not found" });
      }
  
      res.status(200).json({ success: true, message: "Meeting deleted successfully", deletedMeeting });
    } catch (error) {
      console.error("Error deleting meeting:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  };
  const handleEditMeeting = (meeting) => {
    setEditingMeeting(meeting);
    setTitle(meeting.title);
    setDescription(meeting.description);
  

    const formattedDate = new Date(meeting.date).toISOString().split('T')[0];
    setDate(formattedDate);
  
    setTime(meeting.time);
    setAttendees(meeting.attendees);
  };
  