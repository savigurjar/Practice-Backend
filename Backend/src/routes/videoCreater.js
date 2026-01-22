// const express = require('express');
// const adminMiddleware = require("../middleware/adminMiddleware");
// const videoRouter =  express.Router();
// const {generateUploadSignature,saveVideoMetadata,deleteVideo,getVideoStatus} = require("../controllers/videoSection")

// videoRouter.get("/status",adminMiddleware, getVideoStatus);
// videoRouter.get("/create/:problemId",adminMiddleware,generateUploadSignature);
// videoRouter.post("/save",adminMiddleware,saveVideoMetadata);
// videoRouter.delete("/delete/:problemId",adminMiddleware,deleteVideo);


// module.exports = videoRouter;

const express = require('express');
const adminMiddleware = require("../middleware/adminMiddleware");
const videoRouter = express.Router();
const {
  generateUploadSignature,
  generateLargeUploadSignature,
  saveVideoMetadata,
  deleteVideo,
  getVideoStatus,
  checkUploadStatus
} = require("../controllers/videoSection");

// Get video status for all problems
videoRouter.get("/status", adminMiddleware, getVideoStatus);

// Check upload status for specific problem
videoRouter.get("/status/:problemId", adminMiddleware, checkUploadStatus);

// Regular upload signature (for small files < 100MB)
videoRouter.get("/create/:problemId", adminMiddleware, generateUploadSignature);

// Large file upload signature (for files > 100MB, up to 1GB)
videoRouter.get("/create-large/:problemId", adminMiddleware, generateLargeUploadSignature);

// Save video metadata after upload
videoRouter.post("/save", adminMiddleware, saveVideoMetadata);

// Delete video
videoRouter.delete("/delete/:problemId", adminMiddleware, deleteVideo);

module.exports = videoRouter;