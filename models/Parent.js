const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true }, 
  childName: { type: String, required: true },
  childGrade: { type: String, required: true },
});

const Parent = mongoose.model("Parent", parentSchema);
module.exports = Parent;
