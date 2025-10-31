require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/userAuthDB";

// ✅ MongoDB connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

/* ================================
   REGISTER ROUTE
================================ */
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, confirm } = req.body;

    if (!name || !email || !phone || !password || !confirm)
      return res.status(400).json({ success: false, message: "All fields are required" });

    if (password !== confirm)
      return res.status(400).json({ success: false, message: "Passwords do not match" });

    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists)
      return res.status(409).json({ success: false, message: "User already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashed });
    await user.save();

    return res.status(201).json({ success: true, message: "🎉 Registration successful!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
});

/* =============
   LOGIN ROUTE 
================ */
app.post("/login", async (req, res) => {
  try {
    // Task 2 frontend sends { email, password }
    const { email, password } = req.body;

    // Allow login via either email or phone number
    const user = await User.findOne({
      $or: [{ email }, { phone: email }],
    });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Send name for dashboard greeting
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

/* ================================
   AUTH MIDDLEWARE
================================ */
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

/* ================================
   DASHBOARD ROUTE
================================ */
app.get("/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================================
   START SERVER
================================ */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
