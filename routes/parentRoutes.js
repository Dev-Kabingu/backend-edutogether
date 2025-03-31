const express = require("express");
const Parent = require("../models/Parent");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const parents = await Parent.find();
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parents", error });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, email, mobile, childName, childGrade } = req.body; // ✅ Accept all fields
    const newParent = new Parent({ name, email, mobile, childName, childGrade });
    await newParent.save();
    res.status(201).json(newParent);
  } catch (error) {
    res.status(400).json({ message: "Error adding parent", error });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedParent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedParent);
  } catch (error) {
    res.status(500).json({ message: "Error updating parent", error });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Parent.findByIdAndDelete(req.params.id);
    res.json({ message: "Parent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting parent", error });
  }
});

module.exports = router;
