const express = require("express");
const Student = require("../models/Student");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("parentId", "name email");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, email, grade, parentId } = req.body;
    const newStudent = new Student({ name, email, grade, parentId });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: "Error adding student", error });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});

module.exports = router;
