// router/messages.js
const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();

// Initializ AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Mock data to be used
const mockMessages = [
  { id: 1, content: "Welcome to my API!" },
  { id: 2, content: "This is a mock message for testing purposes." },
];

// route for mock messages
router.get("/", (req, res) => {
  res.json(mockMessages);
});

// List all objects in the bucket
router.get("/list", async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    res.json(data.Contents);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Upload an object to the bucket
router.post("/upload", fileUpload(), async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.name,
    Body: file.data,
  };

  try {
    const data = await s3.upload(params).promise();
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve an object from the bucket
router.get("/retrieve/:key", async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.params.key,
  };

  try {
    const data = await s3.getObject(params).promise();
    res.send(data.Body);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an object from the bucket
router.delete("/delete/:key", async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.params.key,
  };

  try {
    const data = await s3.deleteObject(params).promise();
    res.json({ message: "File deleted successfully", data });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get metadata of an object
router.get("/metadata/:key", async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.params.key,
  };

  try {
    const data = await s3.headObject(params).promise();
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
