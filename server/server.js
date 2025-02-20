require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your React app
    methods: ["GET", "POST"], // Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);
app.use(bodyParser.json()); // Parse JSON bodies

// Create Nodemailer transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail email
    pass: process.env.EMAIL_PASSWORD, // Your Gmail app password
  },
});

// Define the POST route to handle form submission
app.post("/send-message", (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const mailOptions = {
      from: email, // Sender's email
      to: process.env.EMAIL, // Recipient's email
      subject: `Message from ${name}`,
      text: `Message: ${message}\n\nFrom: ${name}\nEmail: ${email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error.message);
        return res.status(500).json({
          success: false,
          message: "Error sending email",
          error: error.message,
        });
      }
      console.log("Email sent:", info.response);
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully!", info });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
