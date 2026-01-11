const express = require("express");
const dashRouter = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const userMiddleware = require("../middleware/userMiddleware");

dashRouter.get("/getDashboard", userMiddleware, getDashboard);

module.exports = dashRouter;
