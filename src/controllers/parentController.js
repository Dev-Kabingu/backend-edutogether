const Parent = require("../models/Parent");

const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parents", error });
  }
};

const addParent = async (req, res) => {
  try {
    console.log("Received data from frontend:", req.body); 

    const { name, email, mobile, childName, childGrade } = req.body;

    
    if (!name || !email || !mobile || !childName || !childGrade) {
      console.error(" Missing fields:", { name, email, mobile, childName, childGrade });
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newParent = new Parent({ name, email, mobile, childName, childGrade });
    await newParent.save();

    res.status(201).json(newParent);
  } catch (error) {
    console.error(" Error adding parent:", error);
    res.status(500).json({ message: "Error adding parent", error });
  }
};


const updateParent = async (req, res) => {
  try {
    const updatedParent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedParent);
  } catch (error) {
    res.status(500).json({ message: "Error updating parent", error });
  }
};

const deleteParent = async (req, res) => {
  try {
    await Parent.findByIdAndDelete(req.params.id);
    res.json({ message: "Parent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting parent", error });
  }
};

module.exports = { getAllParents, addParent, updateParent, deleteParent };
