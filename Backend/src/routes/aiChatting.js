const express = require('express');
const aiRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware")
const solveDoubt = require("../controllers/solveDoubt")
const solveQues = require("../controllers/solveQues")

aiRouter.post('/chat',userMiddleware,solveDoubt);
aiRouter.post('/ask',userMiddleware,solveQues);

module.exports = aiRouter;