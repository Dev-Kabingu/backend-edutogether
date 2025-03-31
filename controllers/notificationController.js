const Notification = require("../models/Notification");
const { io, connectedClients } = require("../index");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

const sendNotification = async (userId, type, content) => {
    try {
        const notification = new Notification({ userId, type, content });
        await notification.save();

        if (connectedClients.has(userId.toString())) {
            const socket = connectedClients.get(userId.toString());
            if (socket) {
                socket.emit("newNotification", notification);
            }
        }
        const user = await User.findById(userId);
        if (user && user.email) {
            await sendEmail(user.email, type, content);
        } else {
            console.warn(" No email found for user:", userId);
        }

    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error(" Error fetching notifications:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { userId } = req.params;
        await Notification.updateMany({ userId }, { $set: { isRead: true } });  // ✅ Fix update operation
        res.json({ message: "Notifications marked as read" });
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { sendNotification, getUserNotifications, markAsRead };
