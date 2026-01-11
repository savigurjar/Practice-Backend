import { useEffect, useState } from "react";
import axios from "axios";

/* -----------------------------
   Heatmap Cell Component
------------------------------*/
const HeatCell = ({ count, maxCount }) => {
  // 0 submissions default
  let color = "bg-gray-200 dark:bg-gray-800";

  if (count > 0 && maxCount > 0) {
    // Scale count to 1-4 (5 levels total including 0)
    const intensity = Math.ceil((count / maxCount) * 4);

    switch (intensity) {
      case 1:
        color = "bg-green-200";
        break;
      case 2:
        color = "bg-green-300";
        break;
      case 3:
        color = "bg-green-400";
        break;
      case 4:
      default:
        color = "bg-green-500";
    }
  }

  return (
    <div
      className={`w-3 h-3 rounded-sm ${color}`}
      title={`${count} accepted`}
    />
  );
};

const DashBoardBody = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/dashboard/getDashboard", { withCredentials: true })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p className="p-10">Loading dashboard...</p>;

  const {
    profile = {},
    stats = { solved: 0, easy: 0, medium: 0, hard: 0 },
    streak = 0,
    points = 0,
    heatmap = {},
    recentSubmissions = [],
    submissions = [],
  } = data;

  /* -----------------------------
     Heatmap (last 90 days)
  ------------------------------*/
  const days = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    days.push({ date: key, count: heatmap[key] || 0 });
  }

  const maxCount = Math.max(...days.map((d) => d.count));

  /* -----------------------------
     Submissions by Year
  ------------------------------*/
  const submissionsByYear = submissions.reduce((acc, s) => {
    const year = new Date(s.createdAt).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(s);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 max-w-7xl mx-auto">

      {/* PROFILE */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          {profile.firstName || ""} {profile.lastName || ""}
        </h1>
        <p className="opacity-60">{profile.emailId || ""}</p>
        <div className="flex gap-6 mt-4 text-sm">
          <span>🔥 Streak: <b>{streak}</b> days</span>
          <span>🏆 Points: <b>{points}</b></span>
          <span>🎯 Rating: <b>{profile.rating || 1200}</b></span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
        {[
          ["Solved", stats.solved],
          ["Easy", stats.easy],
          ["Medium", stats.medium],
          ["Hard", stats.hard],
        ].map(([label, value]) => (
          <div key={label} className="p-5 rounded-xl bg-black/5 dark:bg-white/5">
            <p className="text-sm opacity-60">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* HEATMAP */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold mb-4">Submission Activity</h2>
        <div className="grid grid-rows-7 grid-flow-col gap-1">
          {days.map((d, i) => (
            <HeatCell key={i} count={d.count} maxCount={maxCount} />
          ))}
        </div>
      </div>

      {/* RECENT SUBMISSIONS */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
        {recentSubmissions.map((s) => (
          <div
            key={s._id}
            className="p-4 mb-3 rounded-lg bg-black/5 dark:bg-white/5 flex justify-between"
          >
            <div>
              <p className="font-medium">{s.problemId?.title || s.problem || "Unknown Problem"}</p>
              <p className="text-xs opacity-60">
                {s.language || "Unknown"} · {s.problemId?.difficulty || s.difficulty || "N/A"}
              </p>
            </div>
            <span
              className={`font-semibold ${
                s.status === "accepted" ? "text-green-500" : "text-red-500"
              }`}
            >
              {s.status?.toUpperCase() || "N/A"}
            </span>
          </div>
        ))}
      </div>

      {/* SUBMISSIONS BY YEAR */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Submissions by Year</h2>
        {Object.keys(submissionsByYear)
          .sort((a, b) => b - a)
          .map((year) => (
            <div key={year} className="mb-8">
              <h3 className="font-semibold mb-3">{year}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {submissionsByYear[year].map((s) => (
                  <div
                    key={s._id}
                    className="p-4 rounded-lg bg-black/5 dark:bg-white/5"
                  >
                    <p className="font-medium">{s.problemId?.title || "Unknown Problem"}</p>
                    <div className="flex justify-between text-xs mt-2">
                      <span>{s.language || "Unknown"}</span>
                      <span
                        className={
                          s.status === "accepted" ? "text-green-500" : "text-red-500"
                        }
                      >
                        {s.status || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashBoardBody;
