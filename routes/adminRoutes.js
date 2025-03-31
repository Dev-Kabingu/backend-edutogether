const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Parent = require("../models/Parent");


router.get("/teachers", async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});


router.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


router.get("/parents", async (req, res) => {
  const parents = await Parent.find();
  res.json(parents);
});

module.exports = router;
