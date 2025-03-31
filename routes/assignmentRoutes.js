const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Assignment = require("../models/Assignment"); 


router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      console.log("Received File:", req.file);
      console.log("Received Data:", req.body);
  
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
     
      const newAssignment = new Assignment({
        title: req.body.title,
        fileType: req.file.mimetype,
        grade: req.body.grade,
        uploadDate: new Date(),
        deadline: req.body.deadline,
        description: req.body.description,
        filePath: `/uploads/${req.file.filename}`, 
      });
      
  
      const savedAssignment = await newAssignment.save();
      console.log("Saved Assignment:", savedAssignment);
  
      res.json({
        message: "File uploaded successfully",
        assignment: savedAssignment,
      });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ message: "Server error while uploading file" });
    }
  });
  


router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Server error while fetching assignments" });
  }
});

module.exports = router;
