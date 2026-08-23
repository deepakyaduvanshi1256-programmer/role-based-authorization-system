import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Role Based Authorization API Running...");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// User Routes
app.use("/api/users", userRoutes);

// 404 Route

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Start Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server Running On Port ${PORT}`);
});