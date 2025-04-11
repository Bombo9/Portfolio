require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serves HTML/CSS/JS

// Transporter setup using Gmail and app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,  // Use EMAIL from .env
    pass: process.env.EMAIL_PASSWORD,  // Use EMAIL_PASSWORD from .env
  },
});

// Hardcoded recipient email
const recipientEmail = "recipient-email@example.com"; // Replace with the actual recipient's email

// Form handling route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: recipientEmail,  // Directly using the hardcoded recipient email
    subject: `New message from portfolio website`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Fallback route for home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
