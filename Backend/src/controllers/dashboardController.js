const Submission = require("../models/submission");
const User = require("../models/users");

/**
 * GET FULL DASHBOARD (Optimized)
 */
const getDashboard = async (req, res) => {
  try {
    const userId = req.result._id;

    /* -----------------------------
       1. FETCH SUBMISSIONS
       - Only fetch last 1000 submissions for safety
       - Populate problem details
    -------------------------------*/
    const submissions = await Submission.find({ userId })
      .populate("problemId", "title difficulty points")
      .sort({ createdAt: -1 })
      .limit(1000);

    /* -----------------------------
       2. FILTER ACCEPTED SUBMISSIONS
    -------------------------------*/
    const acceptedSubs = submissions.filter(s => s.status === "accepted");

    /* -----------------------------
       3. SOLVED STATS
    -------------------------------*/
    const solvedMap = new Map(); // problemId -> difficulty
    acceptedSubs.forEach(s => solvedMap.set(s.problemId._id.toString(), s.problemId.difficulty));

    const stats = { solved: solvedMap.size, easy: 0, medium: 0, hard: 0 };
    for (const diff of solvedMap.values()) stats[diff]++;

    /* -----------------------------
       4. HEATMAP (last 90 days)
    -------------------------------*/
    const heatmap = {};
    acceptedSubs.forEach(s => {
      const date = s.createdAt.toISOString().split("T")[0];
      heatmap[date] = (heatmap[date] || 0) + 1;
    });

    /* -----------------------------
       5. DAILY STREAK
    -------------------------------*/
    const acceptedDates = new Set(
      acceptedSubs.map(s => s.createdAt.toISOString().split("T")[0])
    );

    let streak = 0;
    let currentDate = new Date();
    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];
      if (acceptedDates.has(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else break;
    }

    /* -----------------------------
       6. POINTS (Leaderboard logic)
    -------------------------------*/
    let points = 0;
    solvedMap.forEach(diff => {
      if (diff === "easy") points += 100;
      if (diff === "medium") points += 200;
      if (diff === "hard") points += 300;
    });

    /* -----------------------------
       7. RECENT SUBMISSIONS (limit 5)
    -------------------------------*/
    const recentSubmissions = submissions.slice(0, 5).map(s => ({
      _id: s._id,
      problem: s.problemId.title,
      difficulty: s.problemId.difficulty,
      language: s.language,
      status: s.status,
      runtime: s.runtime,
      memory: s.memory,
      createdAt: s.createdAt
    }));

    /* -----------------------------
       8. USER PROFILE
    -------------------------------*/
    const user = await User.findById(userId).select(
      "firstName lastName emailId rating age"
    );

    /* -----------------------------
       9. FINAL RESPONSE
    -------------------------------*/
    res.status(200).json({
      profile: user,
      stats,
      streak,
      points,
      heatmap,
      recentSubmissions,
      submissions // For yearly grouping
    });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboard };
