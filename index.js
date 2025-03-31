require("events").EventEmitter.defaultMaxListeners = 20;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const Message = require("./src/models/Message");  
const path = require("path");



const { initializeSocket } = require("./src/socket");

const app = express();
const server = http.createServer(app);


initializeSocket(server); 

app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));


const authRoutes = require("./src/routes/authRoutes");
const teacherRoutes = require("./src/routes/teacherRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const meetingRoutes = require ("./src/routes/meetingRoutes")
const parentRoutes = require("./src/routes/parentRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
// const meetingRoutes = require("./routes/meetingRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const adminAuthRoutes = require('./src/routes/adminAuthRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');
const contactRoutes = require("./src/routes/contactRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/admin", adminRoutes); 
app.use('/api/admin', adminAuthRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use("/api/contact", contactRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));


app.get("/api/message", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
