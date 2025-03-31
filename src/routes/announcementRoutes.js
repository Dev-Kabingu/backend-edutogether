
const express = require("express");
const router = express.Router();
const { createAnnouncement, getAnnouncements } = require("../controllers/announcementController");
const authMiddleware = require("../middleware/authMiddleware"); 
router.post("/create", authMiddleware, createAnnouncement);
router.get("/", authMiddleware, getAnnouncements);

module.exports = router;
