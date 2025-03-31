const Teacher = require("../models/Teacher");


exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};

exports.createTeacher = async (req, res) => {
  console.log("Received POST request to /api/teachers"); 
  console.log("Request Body:", req.body); 

  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      console.log("Validation failed: Teacher already exists");
      return res.status(400).json({ message: "Teacher already exists" });
    }

 
    const newTeacher = new Teacher({ name, email, mobile });
    await newTeacher.save();

    console.log("Teacher inserted successfully:", newTeacher);
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error(" Error inserting teacher:", error); // More detailed error
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


exports.updateTeacher = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Error updating teacher", error });
  }
};


exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher", error });
  }
};
