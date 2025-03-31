const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Secure SSL port
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMeetingEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"EduTogether" <${process.env.EMAIL_USER}>`, // Display Name
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}: ${info.response}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

module.exports = { sendMeetingEmail };
