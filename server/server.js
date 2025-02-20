require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000; // Use dynamic port for deployment

// Middleware for CORS
const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://localhost:3000", // Allow requests from your React app
  "http://localhost:3000", // Allow local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"], // Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Create Nodemailer transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail email
    pass: process.env.EMAIL_PASSWORD, // Your Gmail app password
  },
});

// Define the POST route to handle form submission
app.post("/send-message", async (req, res) => {
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

    // Send email using Nodemailer
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error sending email",
      error: error.message,
    });
  }
});

// Serve the React app for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
