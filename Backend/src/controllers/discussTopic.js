const Discuss = require("../models/discuss");

// CREATE BLOG (Admin only)
exports.createDiscuss = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const discuss = await Discuss.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json({
      message: "Discussion created successfully",
      discuss,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create discussion",
      error: err.message,
    });
  }
};

// GET ALL DISCUSS (Public)
exports.getAllDiscuss = async (req, res) => {
  try {
    const discusses = await Discuss.find({ isPublished: true })
      .populate("author", "firstName  role")
      .sort({ createdAt: -1 });

    res.status(200).json(discusses);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch discussions",
      error: err.message,
    });
  }
};


