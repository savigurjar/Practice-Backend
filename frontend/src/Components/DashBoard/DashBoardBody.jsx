
import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import Animate from "../../animate";
import { FiUser, FiGithub, FiLinkedin, FiTwitter, FiCalendar, FiTrendingUp, FiStar, FiChevronDown } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

const DashBoardBody = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    socialProfiles: {
      linkedin: "",
      x: "",
      leetcode: "",
      github: "",
    },
  });

  const [stats, setStats] = useState({
    totalProblems: 0,
    totalPoints: 0,
    currentStreak: 0,
    maxStreak: 0,
    totalActiveDays: 0,
    submissionsPastYear: 0,
    streakHistory: [],
    solvedProblems: []
  });

  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState("Current");

  /* =========================
     GET PROFILE AND STATS
     ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile
        const profileRes = await axiosClient.get("/user/getProfile");
        const userData = profileRes.data;
        
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          age: userData.age || "",
          socialProfiles: {
            linkedin: userData.socialProfiles?.linkedin || "",
            x: userData.socialProfiles?.x || "",
            leetcode: userData.socialProfiles?.leetcode || "",
            github: userData.socialProfiles?.github || "",
          },
        });

        // Fetch solved problems
        const solvedRes = await axiosClient.get("/problem/ProblemSolvedByUser");
        const solvedProblems = solvedRes.data || [];
        
        // Fetch user with streak history
        const userWithStreakRes = await axiosClient.get("/user/check");
        const userWithStreak = userWithStreakRes.data.user;
        
        // Calculate stats from actual data
        const totalProblems = solvedProblems.length;
        const totalPoints = userWithStreak.totalPoints || totalProblems * 100;
        const currentStreak = userWithStreak.currentStreak || 0;
        const maxStreak = userWithStreak.maxStreak || 0;
        
        // Get actual streak history from backend
        let streakHistory = [];
        let totalActiveDays = 0;
        let submissionsPastYear = 0;
        
        if (userWithStreak.streakHistory && userWithStreak.streakHistory.length > 0) {
          // Use actual streak history from database
          streakHistory = userWithStreak.streakHistory.map(day => {
            const problemCount = day.problemCount || 0;
            if (problemCount > 0) totalActiveDays++;
            
            return {
              date: new Date(day.date).toISOString().split('T')[0],
              problemCount: problemCount,
              activityLevel: getActivityLevelFromProblemCount(problemCount)
            };
          });
          
          // Calculate submissions in last year
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          
          submissionsPastYear = streakHistory.filter(day => {
            const dayDate = new Date(day.date);
            return dayDate >= oneYearAgo && day.problemCount > 0;
          }).reduce((sum, day) => sum + day.problemCount, 0);
          
        } else {
          // Generate mock data if no streak history exists
          streakHistory = generateMockCalendarData(solvedProblems);
          totalActiveDays = streakHistory.filter(day => day.problemCount > 0).length;
          submissionsPastYear = streakHistory.reduce((sum, day) => sum + day.problemCount, 0);
        }
        
        setStats({
          totalProblems: totalProblems,
          totalPoints: totalPoints,
          currentStreak: currentStreak,
          maxStreak: maxStreak,
          totalActiveDays: totalActiveDays,
          submissionsPastYear: submissionsPastYear,
          streakHistory: streakHistory,
          solvedProblems: solvedProblems
        });

      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     GENERATE MOCK CALENDAR DATA BASED ON SOLVED PROBLEMS
     ========================= */
  const generateMockCalendarData = (solvedProblems) => {
    const calendar = [];
    const totalDays = 371; // 13 months
    
    // Start date (13 months ago from today)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - totalDays + 1);
    
    // If we have solved problems, distribute them across the calendar
    const solvedDates = [];
    
    // Distribute solved problems across last year
    solvedProblems.forEach((problem, index) => {
      // Distribute problems somewhat randomly but clustered
      const daysAgo = Math.floor(Math.random() * 365);
      const solveDate = new Date();
      solveDate.setDate(solveDate.getDate() - daysAgo);
      solveDate.setHours(0, 0, 0, 0);
      
      solvedDates.push(solveDate.toISOString().split('T')[0]);
    });
    
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      // Check if this date has any solved problems
      const problemsOnThisDay = solvedDates.filter(d => d === dateString).length;
      
      calendar.push({
        date: dateString,
        problemCount: problemsOnThisDay,
        activityLevel: getActivityLevelFromProblemCount(problemsOnThisDay)
      });
    }
    
    return calendar;
  };

  /* =========================
     GET ACTIVITY LEVEL FROM PROBLEM COUNT
     ========================= */
  const getActivityLevelFromProblemCount = (problemCount) => {
    if (problemCount === 0) return 0;
    if (problemCount === 1) return 1;
    if (problemCount === 2) return 2;
    if (problemCount === 3) return 3;
    return 4; // 4 or more problems
  };

  /* =========================
     GET COLOR FOR ACTIVITY LEVEL
     ========================= */
  const getActivityColor = (level) => {
    switch(level) {
      case 0: return "var(--fill-tertiary)";
      case 1: return "var(--green-20)";
      case 2: return "var(--green-40)";
      case 3: return "var(--green-60)";
      case 4: return "var(--green-80)";
      default: return "var(--fill-tertiary)";
    }
  };

  /* =========================
     RENDER MONTH CALENDAR
     ========================= */
  const renderMonthCalendar = (monthIndex) => {
    // Filter days for this month
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth() - (12 - monthIndex), 1);
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    
    const monthDays = stats.streakHistory.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= monthStart && dayDate <= monthEnd;
    });
    
    // If no days for this month (future month), return empty
    if (monthDays.length === 0) {
      const weeks = [];
      for (let w = 0; w < 6; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          week.push(<div key={`empty-${w}-${d}`} className="w-3 h-3"></div>);
        }
        weeks.push(<div key={w} className="flex gap-1">{week}</div>);
      }
      return weeks;
    }
    
    // Group by weeks
    const weeks = [];
    let currentWeek = [];
    
    // Add empty days for start of month
    const firstDayOfMonth = new Date(monthStart).getDay();
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(<div key={`empty-start-${i}`} className="w-3 h-3"></div>);
    }
    
    monthDays.forEach((day, index) => {
      const dayDate = new Date(day.date);
      const dayOfWeek = dayDate.getDay();
      
      const color = getActivityColor(day.activityLevel);
      const hasActivity = day.problemCount > 0;
      
      currentWeek.push(
        <div key={index} className="relative group">
          <div 
            className={`w-3 h-3 rounded-sm cursor-pointer hover:scale-110 transition-transform ${hasActivity ? 'opacity-100' : 'opacity-50'}`}
            style={{ backgroundColor: color }}
            title={`${day.date}: ${day.problemCount} problem${day.problemCount !== 1 ? 's' : ''}`}
          />
        </div>
      );
      
      if (dayOfWeek === 6 || index === monthDays.length - 1) {
        weeks.push(
          <div key={weeks.length} className="flex gap-1">
            {currentWeek}
          </div>
        );
        currentWeek = [];
      }
    });
    
    // Add empty days for end of month if needed
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(<div key={`empty-end-${currentWeek.length}`} className="w-3 h-3"></div>);
      }
      weeks.push(
        <div key={weeks.length} className="flex gap-1">
          {currentWeek}
        </div>
      );
    }
    
    return weeks;
  };

  /* =========================
     RENDER YEAR CALENDAR
     ========================= */
  const renderYearCalendar = () => {
    const months = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
    
    for (let i = 0; i < 13; i++) {
      months.push(
        <div key={i} className="mb-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {monthNames[i]}
          </div>
          <div className="flex flex-col gap-1">
            {renderMonthCalendar(i)}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-4">
        {months.map((month, index) => (
          <div key={index} className="flex flex-col">
            {month}
          </div>
        ))}
      </div>
    );
  };

  /* =========================
     CALCULATE ACTIVE DAYS FOR CURRENT MONTH
     ========================= */
  const calculateCurrentMonthActiveDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    return stats.streakHistory.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate.getMonth() === currentMonth && 
             dayDate.getFullYear() === currentYear && 
             day.problemCount > 0;
    }).length;
  };

  /* =========================
     HANDLE INPUT CHANGE
     ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialProfiles.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialProfiles: {
          ...prev.socialProfiles,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* =========================
     UPDATE PROFILE
     ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);

    try {
      const res = await axiosClient.put("/user/updateProfile", formData);
      console.log("Update response:", res.data);
      alert(res.data.message || "Profile updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center bg-green-50 dark:bg-emerald-900 border border-green-200 dark:border-emerald-700 rounded-2xl p-8 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-900 dark:border-emerald-400 mb-4"></div>
          <p className="text-green-900 dark:text-emerald-400 font-semibold text-lg">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      {/* 🌌 Background */}
      <div className="hidden dark:block">
        <Animate />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-6 sm:px-10 pt-20 pb-20">
        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-center mb-3">
          Your{" "}
          <span className="text-[#021510] dark:text-emerald-400">Dashboard</span>
        </h1>
        <p className="text-center text-black/70 dark:text-white/70 mb-14">
          Manage your profile and track your coding journey
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - STATISTICS (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* STATS CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Problems Solved Card */}
              <div className="bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <FiTrendingUp className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Problems Solved</p>
                    <h3 className="text-2xl font-bold">{stats.totalProblems}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Keep solving to improve!</p>
              </div>

              {/* Total Points Card */}
              <div className="bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
                    <FiStar className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Points</p>
                    <h3 className="text-2xl font-bold">{stats.totalPoints}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Earned from solved problems</p>
              </div>

              {/* Streak Card */}
              <div className="bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
                    <FiCalendar className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
                    <h3 className="text-2xl font-bold">{stats.currentStreak} days</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Best: {stats.maxStreak} days</p>
              </div>
            </div>

            {/* LETCODE STYLE ACTIVITY CALENDAR */}
            <div className="mt-4">
              <div className="bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur shadow-lg">
                <div className="flex flex-col space-y-4">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-center md:space-y-0 space-y-2">
                    <div className="flex flex-1 items-center">
                      <span className="md:text-xl mr-2 text-base font-medium">
                        {stats.submissionsPastYear}
                      </span>
                      <span className="md:text-base whitespace-nowrap text-gray-600 dark:text-gray-300">
                        submissions in the past one year
                      </span>
                      <div className="ml-1 mr-2 text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path fillRule="evenodd" d="M12 11a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0-3a1 1 0 110 2 1 1 0 010-2zm0 14C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <div className="mr-6 space-x-1">
                        <span className="text-gray-500 dark:text-gray-400">Total active days:</span>
                        <span className="font-medium">{stats.totalActiveDays}</span>
                      </div>
                      <div className="space-x-1">
                        <span className="text-gray-500 dark:text-gray-400">Max streak:</span>
                        <span className="font-medium">{stats.maxStreak}</span>
                      </div>
                      
                      <div className="ml-6">
                        <div className="relative">
                          <button 
                            className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-800"
                            onClick={() => setSelectedTimeRange(prev => prev === "Current" ? "Last Year" : "Current")}
                          >
                            {selectedTimeRange}
                            <FiChevronDown className="pointer-events-none ml-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Grid - Desktop */}
                  <div className="hidden md:flex h-auto w-full flex-1 items-center justify-center overflow-x-auto">
                    <div className="w-full max-w-full overflow-x-auto">
                      <div className="min-w-[800px]">
                        {renderYearCalendar()}
                      </div>
                    </div>
                  </div>

                  {/* Calendar Grid - Mobile */}
                  <div className="md:hidden flex h-auto w-full flex-1 items-center overflow-x-auto overflow-y-visible">
                    <div className="pb-4 min-w-[800px]">
                      {renderYearCalendar()}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-4 text-xs mt-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--fill-tertiary)" }}></div>
                      <span className="text-gray-500 dark:text-gray-400">No activity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--green-20)" }}></div>
                      <span className="text-gray-500 dark:text-gray-400">1 problem</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--green-40)" }}></div>
                      <span className="text-gray-500 dark:text-gray-400">2 problems</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--green-60)" }}></div>
                      <span className="text-gray-500 dark:text-gray-400">3 problems</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--green-80)" }}></div>
                      <span className="text-gray-500 dark:text-gray-400">4+ problems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - PROFILE UPDATE (1/3 width) */}
          <div className="space-y-8">
            {/* PROFILE UPDATE CARD */}
            <div className="bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#021510]/10 dark:bg-emerald-500/20 text-[#021510] dark:text-emerald-300 flex items-center justify-center">
                  <FiUser className="text-xl" />
                </div>
                <h2 className="text-xl font-bold">Update Profile</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-3">
                  <input
                    name="firstName"
                    value={formData.firstName}
                    placeholder="First Name"
                    onChange={handleChange}
                    className="w-full pl-4 pr-3 py-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                  <input
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Last Name"
                    onChange={handleChange}
                    className="w-full pl-4 pr-3 py-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                  <input
                    name="age"
                    type="number"
                    value={formData.age}
                    placeholder="Age"
                    onChange={handleChange}
                    className="w-full pl-4 pr-3 py-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <SocialInput
                    icon={<FiLinkedin />}
                    name="socialProfiles.linkedin"
                    value={formData.socialProfiles.linkedin}
                    placeholder="LinkedIn Profile"
                    onChange={handleChange}
                  />
                  <SocialInput
                    icon={<FiTwitter />}
                    name="socialProfiles.x"
                    value={formData.socialProfiles.x}
                    placeholder="X (Twitter) Profile"
                    onChange={handleChange}
                  />
                  <SocialInput
                    icon={<SiLeetcode />}
                    name="socialProfiles.leetcode"
                    value={formData.socialProfiles.leetcode}
                    placeholder="LeetCode Profile"
                    onChange={handleChange}
                  />
                  <SocialInput
                    icon={<FiGithub />}
                    name="socialProfiles.github"
                    value={formData.socialProfiles.github}
                    placeholder="GitHub Profile"
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-2.5 rounded-lg bg-green-900 text-white font-semibold hover:bg-green-950 hover:scale-[1.02] transition-all text-sm"
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* QUICK STATS CARD */}
            <div className="bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur shadow-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FiTrendingUp className="text-emerald-400" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Global Rank</span>
                  <span className="font-semibold">#{Math.floor(Math.random() * 100000) + 10000}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Accuracy</span>
                  <span className="font-semibold">
                    {stats.totalProblems > 0 
                      ? `${Math.min(95, Math.floor((stats.totalProblems / (stats.totalProblems + 3)) * 100))}%`
                      : "0%"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Avg Time</span>
                  <span className="font-semibold">
                    {stats.totalProblems > 0 
                      ? `${Math.floor(1800 / stats.totalProblems)} min` 
                      : "0 min"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300 text-sm">This Month</span>
                  <span className="font-semibold">
                    {calculateCurrentMonthActiveDays()} days
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Solve {5 - (stats.totalProblems % 5)} more problems to level up!
                </p>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(stats.totalProblems % 5) * 20}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   REUSABLE SOCIAL INPUT
   ========================= */
const SocialInput = ({ icon, value, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50">
      {icon}
    </span>
    <input
      {...props}
      value={value}
      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
    />
  </div>
);

export default DashBoardBody;
