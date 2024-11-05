// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const messageRoutes = require("./routes/messages");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
