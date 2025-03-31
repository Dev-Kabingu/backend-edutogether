// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["parent", "teacher"], default: "parent" },
// });

// module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["parent", "teacher"], default: "parent" },
  resetToken: { type: String, default: null },  // Store reset token for password reset
  resetTokenExpiry: { type: Date, default: null },  // Store expiry time for the reset token
});

module.exports = mongoose.model("User", UserSchema);
