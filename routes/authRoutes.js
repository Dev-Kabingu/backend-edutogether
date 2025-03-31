const crypto = require("crypto");
const nodemailer = require("nodemailer");

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Parent = require("../models/Parent");
const Student = require("../models/Student");


const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    const { name, email, password, role, mobilePhone, childName, childGrade } = req.body;

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        let savedParent = null;

       
        if (role === "parent") {
            savedParent = new Parent({ name, email, mobilePhone, childName, childGrade });
            await savedParent.save();

            
            const newStudent = new Student({
                name: childName,
                email: `${childName.toLowerCase()}@example.com`, 
                grade: childGrade,
                parentId: savedParent._id, 
            });
            await newStudent.save();
        } else if (role === "teacher") {
            const teacher = new Teacher({ name, email, mobilePhone });
            await teacher.save();
        }

        
        const token = jwt.sign(
            { id: user._id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User registered successfully", token, user });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token, user });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});


router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

     
        const resetToken = crypto.randomBytes(32).toString("hex");

    
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 

        await user.save();

       
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        res.json({ message: "Reset link sent to email" });

    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
       
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; 
        user.resetPasswordExpires = undefined; 
        await user.save();

        res.status(200).json({ message: "Password reset successful. You can now log in." });

    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});


module.exports = router;
