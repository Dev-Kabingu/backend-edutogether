const Notification = require("../models/Notification");
const { sendEmailNotification, sendSMSNotification } = require("../utils/notificationUtils");

exports.sendNotification = async (req, res) => {
  try {
    const { recipientType, recipientId, message, type } = req.body;

    const newNotification = new Notification({ recipientType, recipientId, message, type });
    await newNotification.save();

    
    const io = req.app.get("socketio");
    io.emit("receiveNotification", { recipientType, message, type });

    // Send email and SMS
    sendEmailNotification(recipientType, recipientId, message);
    sendSMSNotification(recipientType, recipientId, message);

    res.status(201).json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
