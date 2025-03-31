const express = require("express");
const { sendNotification, getUserNotifications, markAsRead } = require("../controllers/notificationController"); 
const router = express.Router();

router.get("/:userId", getUserNotifications);
router.post("/send", sendNotification);
router.put("/mark-as-read/:userId", markAsRead);

module.exports = router;
