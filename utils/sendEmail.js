const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (userId, type, content) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: `${userId}@gmail.com`,  
            subject: `New ${type} Notification`,
            text: content
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;
