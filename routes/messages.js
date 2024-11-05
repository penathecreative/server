// server/routes/messages.js
const express = require("express");
const router = express.Router();

// Mock data to be used
const mockMessages = [
  { id: 1, content: "Welcome to my API!" },
  { id: 2, content: "This is a mock message for testing purposes." },
];

router.get("/", (req, res) => {
  res.json(mockMessages);
});

module.exports = router;
