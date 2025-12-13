const express = require('express');
const authRouter = express.Router();
const { register, login, logout ,getProfile,adminRegister} = require("../controllers/userAuthenticate")
const userMiddleware = require("../middleware/userMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

// register
authRouter.post('/register', register)
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.get('/getProfile',userMiddleware,getProfile);
authRouter.post('/admin/register',adminMiddleware,adminRegister)
// login
// logout
// getprofile

module.exports = authRouter;