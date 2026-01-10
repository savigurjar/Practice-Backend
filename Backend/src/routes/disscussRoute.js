const express = require("express");
const discussRouter = express.Router();

const { createDiscuss, getAllDiscuss } = require("../controllers/discussTopic");
const authMiddleware = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth");

// Admin creates blog
router.post("/create", authMiddleware, adminAuth, createDiscuss);

// Public blogs list
router.get("/", getAllDiscuss);

module.exports = discussRouter;
