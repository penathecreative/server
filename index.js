// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const messageRoutes = require("./routes/messages");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/api/messages", messageRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An internal server error occurred" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
