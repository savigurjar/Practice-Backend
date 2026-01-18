// [file name]: userAuth.js
// [file content begin]
const express = require('express');
const authRouter = express.Router();
const { register, login, logout, getProfile, updateProfile, adminRegister, deleteProfile, changePassword, forgotPassword, resetPassword, getAllUsers } = require("../controllers/userAuthenticate")
const userMiddleware = require("../middleware/userMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

// register
authRouter.post('/register', register)
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.get('/getProfile', userMiddleware, getProfile);
authRouter.post('/admin/register', adminMiddleware, adminRegister)
authRouter.delete('/deleteProfile', userMiddleware, deleteProfile)
// login
// logout
// getprofile
// change password
authRouter.post('/changePassword', userMiddleware, changePassword);
// forgot password
authRouter.post('/forgot-password', forgotPassword);
// reset password
authRouter.post('/reset-password/:token', resetPassword);  // kebab-case
authRouter.get('/admin/users', adminMiddleware, getAllUsers);
// delete profile
authRouter.delete('/deleteProfile', userMiddleware, deleteProfile)
authRouter.put("/updateProfile", userMiddleware, updateProfile);

// NEW ROUTE: Get user statistics
authRouter.get("/stats", userMiddleware, async (req, res) => {
  try {
    const user = req.result;
    
    // Get solved problems count
    const Problem = require("../models/problem");
    const solvedCount = user.problemSolved.length;
    
    // Calculate points (assuming 100 points per problem)
    const totalPoints = solvedCount * 100;
    
    // Get submissions for accuracy calculation
    const Submission = require("../models/submission");
    const totalSubmissions = await Submission.countDocuments({ userId: user._id });
    const acceptedSubmissions = await Submission.countDocuments({ 
      userId: user._id, 
      status: "accepted" 
    });
    
    const accuracy = totalSubmissions > 0 
      ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
      : 0;
    
    res.status(200).json({
      success: true,
      stats: {
        totalProblems: solvedCount,
        totalPoints,
        currentStreak: user.currentStreak || 0,
        maxStreak: user.maxStreak || 0,
        accuracy,
        totalSubmissions,
        acceptedSubmissions,
        rank: Math.floor(Math.random() * 1000000) + 100000 // Mock rank
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

authRouter.get("/check", userMiddleware, (req, res) => {
  try {
    const reply = {
      firstName: req.result.firstName,
      lastName: req.result.lastName,
      age: req.result.age,
      emailId: req.result.emailId,
      role: req.result.role,
      _id: req.result._id,
      socialProfiles: req.result.socialProfiles,
      currentStreak: req.result.currentStreak || 0,
      maxStreak: req.result.maxStreak || 0,
      totalPoints: req.result.totalPoints || 0,
      problemSolved: req.result.problemSolved || []
    }
    res.status(200).json({
      user: reply,
      message: "Valid User"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = authRouter;
// [file content end]