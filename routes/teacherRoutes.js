const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teacherController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/", authMiddleware, TeacherController.getAllTeachers);


router.post("/", authMiddleware, TeacherController.createTeacher);


router.delete("/:id", authMiddleware, TeacherController.deleteTeacher);


router.put("/:id", authMiddleware, TeacherController.updateTeacher);

module.exports = router;
