// import { FaLaptopCode, FaGlobe, FaBolt, FaUsers } from "react-icons/fa";
// import Animate from "../animate";

// const PlatformFeaturesPage = () => {
//   const features = [
//     {
//       title: "Practice Problems",
//       icon: <FaLaptopCode size={24} />,
//       desc: "Solve 2000+ coding problems, from beginner to expert, with step-by-step solutions.",
//     },
//     {
//       title: "Global Contests",
//       icon: <FaGlobe size={24} />,
//       desc: "Join weekly competitions and see how you rank against coders worldwide.",
//     },
//     {
//       title: "Real-time Battles",
//       icon: <FaBolt size={24} />,
//       desc: "Compete in live coding battles with anti-cheat protection and instant feedback.",
//     },
//     {
//       title: "Community",
//       icon: <FaUsers size={24} />,
//       desc: "Connect with fellow developers, share solutions, and grow together.",
//     },
//   ];

//   const stats = [
//     { label: "Problems Solved", value: "1.2M+" },
//     { label: "Active Users", value: "50K+" },
//     { label: "Weekly Contests", value: "52" },
//     { label: "Learning Paths", value: "15" },
//   ];

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">

//       {/* 🌌 Background animation */}
//       <div className="hidden dark:block ">
//         <Animate />
//       </div>

//       {/* HERO */}
//       <div className="relative px-6 sm:px-12 pt-20 pb-16 text-center">
//         <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-black dark:text-white">
//           Everything You Need to Excel
//         </h1>
//         <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto mb-10">
//           Our comprehensive platform provides all the tools, challenges, and community support to help you become an exceptional programmer.
//         </p>

//         {/* STATS */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
//   {stats.map((stat) => (
//     <div
//       key={stat.label}
//       className="
//         bg-white dark:bg-white/5
//         border border-black/10 dark:border-white/10
//         rounded-xl p-6 text-center
//         backdrop-blur
//         hover:shadow-md transition
//       "
//     >
//       <p className="text-2xl font-bold text-[#021510] dark:text-emerald-400">
//         {stat.value}
//       </p>
//       <p className="text-sm text-black/60 dark:text-white/60">
//         {stat.label}
//       </p>
//     </div>
//   ))}
// </div>

//       </div>

//       {/* FEATURE CARDS */}
//      <div className="relative px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-16">
//   {features.map((feature) => (
//     <div
//       key={feature.title}
//       className="
//         bg-white dark:bg-white/5
//         border border-black/10 dark:border-white/10
//         rounded-2xl p-6
//         backdrop-blur
//         hover:scale-[1.03]
//         hover:shadow-lg
//         transition-all
//       "
//     >
//       {/* Icon */}
//       <div
//         className="
//           w-12 h-12 flex items-center justify-center mb-4
//           rounded-lg
//           bg-[#021510]/10 text-[#021510]
//           dark:bg-emerald-500/20 dark:text-emerald-300
//         "
//       >
//         {feature.icon}
//       </div>

//       <h3 className="font-semibold text-xl mb-2 text-green-950 dark:text-white">
//         {feature.title}
//       </h3>

//       <p className="text-sm text-black/60 dark:text-white/60 mb-5">
//         {feature.desc}
//       </p>

//       <button
//         className="
//           px-4 py-2 rounded-lg
//           bg-[#021510] text-white
//           dark:bg-emerald-600
//           font-semibold
//          hover:bg-[#03261d]
//           dark:hover:bg-emerald-700
//           transition
//         "
//       >
//         Explore
//       </button>
//     </div>
//   ))}
// </div>


//       {/* CTA */}
//       <div className="mt-28 px-6 sm:px-12 mb-20 relative z-10">
//         <div className="relative overflow-hidden max-w-3xl mx-auto rounded-2xl p-10 text-center bg-[#021510] text-white dark:bg-gradient-to-r dark:from-emerald-900 dark:to-emerald-950">
//         <div className="absolute inset-0 bg-emerald-500/10 blur-3xl pointer-events-none" />
//           <h2 className="text-3xl font-extrabold mb-4 text-white">
//             Ready to Boost Your Programming Career?
//           </h2>
//           <p className="mb-6 text-white/90">
//             Join thousands of developers practicing, competing, and learning every day.
//           </p>
//           <button className="
//               px-8 py-3 rounded-lg
//               bg-white text-[#021510]
//               font-semibold
//               hover:bg-emerald-100 hover:scale-105
//               transition-all
//             ">
//             Start Practicing Now
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default PlatformFeaturesPage;

import { useState, useEffect } from "react";
import { 
  FaLaptopCode, FaGlobe, FaBolt, FaUsers, FaChartLine, 
  FaMobileAlt, FaCodeBranch, FaShieldAlt, FaTrophy, 
  FaBookOpen, FaHeadset, FaCertificate, FaPlayCircle,
  FaLightbulb, FaBrain, FaRobot, FaCloud, FaSyncAlt,
  FaStar, FaCheckCircle, FaArrowRight
} from "react-icons/fa";
import { 
  TrendingUp, Target, Clock, Zap, Award, Globe,
  Code, Database, Cpu, Server, Network, GitBranch,
  Users as UsersIcon, BookOpen, Shield, Bell,
  BarChart3, PieChart, LineChart
} from "lucide-react";
import Animate from "../animate";

const PlatformFeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({
    problemsSolved: 1250000,
    activeUsers: 52300,
    weeklyContests: 52,
    learningPaths: 15,
    avgImprovement: 72,
    satisfactionRate: 96
  });

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        problemsSolved: prev.problemsSolved + Math.floor(Math.random() * 10),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5)
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const coreFeatures = [
    {
      id: 1,
      title: "Intelligent Practice Problems",
      icon: <FaLaptopCode size={28} />,
      desc: "Access 2000+ curated coding problems with AI-powered difficulty adjustment and personalized recommendations.",
      color: "from-blue-500 to-cyan-500",
      stats: ["2000+ Problems", "25+ Languages", "AI Difficulty"],
      link: "/practice"
    },
    {
      id: 2,
      title: "Global Coding Contests",
      icon: <FaGlobe size={28} />,
      desc: "Compete in weekly global contests with live leaderboards, real-time scoring, and performance analytics.",
      color: "from-emerald-500 to-green-500",
      stats: ["Weekly Contests", "Global Ranking", "Live Leaderboard"],
      link: "/contests"
    },
    {
      id: 3,
      title: "Real-time Code Battles",
      icon: <FaBolt size={28} />,
      desc: "Challenge other developers in 1v1 coding duels with instant feedback, anti-cheat protection, and ELO ranking.",
      color: "from-purple-500 to-pink-500",
      stats: ["1v1 Battles", "Instant Feedback", "ELO System"],
      link: "/battles"
    },
    {
      id: 4,
      title: "Developer Community",
      icon: <FaUsers size={28} />,
      desc: "Join our thriving community of 50K+ developers for code reviews, mentorship, and collaborative learning.",
      color: "from-orange-500 to-red-500",
      stats: ["50K+ Members", "Mentor Network", "Code Reviews"],
      link: "/community"
    },
  ];

  const additionalFeatures = [
    {
      icon: <FaChartLine size={24} />,
      title: "Progress Analytics",
      desc: "Track your improvement with detailed insights and personalized growth plans.",
      color: "text-cyan-500"
    },
    {
      icon: <FaMobileAlt size={24} />,
      title: "Mobile App",
      desc: "Practice on the go with our iOS and Android apps featuring offline mode.",
      color: "text-emerald-500"
    },
    {
      icon: <FaCodeBranch size={24} />,
      title: "Git Integration",
      desc: "Sync your GitHub repositories and track your coding activity automatically.",
      color: "text-purple-500"
    },
    {
      icon: <FaShieldAlt size={24} />,
      title: "Privacy First",
      desc: "Your data is encrypted and secure. We never share your personal information.",
      color: "text-blue-500"
    },
    {
      icon: <FaTrophy size={24} />,
      title: "Achievements",
      desc: "Unlock badges, certificates, and recognition for your coding milestones.",
      color: "text-yellow-500"
    },
    {
      icon: <FaBookOpen size={24} />,
      title: "Learning Paths",
      desc: "Structured roadmaps for specific roles like Frontend, Backend, Data Science, etc.",
      color: "text-red-500"
    },
    {
      icon: <FaHeadset size={24} />,
      title: "24/7 Support",
      desc: "Get help from our community moderators and technical support team anytime.",
      color: "text-green-500"
    },
    {
      icon: <FaCertificate size={24} />,
      title: "Certification",
      desc: "Earn verified certificates recognized by top tech companies worldwide.",
      color: "text-indigo-500"
    },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Senior Engineer @ Google",
      content: "This platform helped me crack Google's coding interview. The company-specific problems were spot on!",
      avatar: "GC",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Software Developer @ Amazon",
      content: "The real-time battles improved my problem-solving speed dramatically. Landed my dream job in 3 months!",
      avatar: "SJ",
      rating: 5
    },
    {
      name: "Marcus Lee",
      role: "Engineering Manager @ Microsoft",
      content: "As a hiring manager, I recommend this platform to all candidates. The quality of problems is exceptional.",
      avatar: "ML",
      rating: 5
    },
  ];

  const upcomingEvents = [
    {
      title: "Global Coding Championship",
      date: "Feb 15, 2024",
      participants: "10K+",
      prize: "$50,000",
      difficulty: "Hard"
    },
    {
      title: "Weekly Algorithm Challenge",
      date: "Every Monday",
      participants: "5K+",
      prize: "Premium Subscription",
      difficulty: "Medium"
    },
    {
      title: "Beginner's Bootcamp",
      date: "Feb 10, 2024",
      participants: "2K+",
      prize: "Certificates",
      difficulty: "Easy"
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      {/* 🌌 Background animation */}
      <div className="hidden dark:block">
        <Animate />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HERO SECTION */}
      <div className="relative px-6 sm:px-12 pt-20 pb-16 text-center z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
            <Zap size={16} className="fill-emerald-500" />
            <span>Trusted by 50,000+ Developers Worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#021510] via-emerald-600 to-cyan-600 dark:from-white dark:via-emerald-400 dark:to-cyan-400">
              Everything You Need
            </span>
            <br />
            <span className="text-black dark:text-white">to Excel at Coding</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-black/70 dark:text-white/70 max-w-3xl mx-auto mb-10">
            Master coding interviews, compete with developers worldwide, and accelerate your career with our comprehensive platform.
            From beginners to experts, we've got you covered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#021510] to-emerald-700 text-white font-bold hover:shadow-xl hover:scale-105 transition-all">
              <FaPlayCircle size={20} />
              Start Free Trial (14 Days)
              <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold hover:bg-white/20 dark:hover:bg-white/10 transition">
              Schedule a Demo
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-5xl mx-auto mb-8">
            {[
              { 
                icon: <FaLaptopCode size={24} />, 
                label: "Problems Solved", 
                value: `${(stats.problemsSolved / 1000000).toFixed(1)}M+`,
                color: "text-emerald-500"
              },
              { 
                icon: <UsersIcon size={24} />, 
                label: "Active Users", 
                value: `${(stats.activeUsers / 1000).toFixed(0)}K+`,
                color: "text-blue-500"
              },
              { 
                icon: <FaGlobe size={24} />, 
                label: "Countries", 
                value: "150+",
                color: "text-purple-500"
              },
              { 
                icon: <TrendingUp size={24} />, 
                label: "Avg. Improvement", 
                value: `${stats.avgImprovement}%`,
                color: "text-green-500"
              },
              { 
                icon: <FaTrophy size={24} />, 
                label: "Contests", 
                value: stats.weeklyContests,
                color: "text-yellow-500"
              },
              { 
                icon: <FaStar size={24} />, 
                label: "Satisfaction", 
                value: `${stats.satisfactionRate}%`,
                color: "text-red-500"
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-white/10 to-transparent ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-black dark:text-white">{stat.value}</p>
                <p className="text-sm text-black/60 dark:text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CORE FEATURES */}
      <div className="relative px-6 sm:px-12 max-w-7xl mx-auto mb-20 z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black dark:text-white">
            Powerful Features for <span className="text-emerald-600 dark:text-emerald-400">Next-Level</span> Learning
          </h2>
          <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with proven learning methodologies
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {coreFeatures.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeFeature === index
                  ? "bg-gradient-to-r from-[#021510] to-emerald-700 text-white shadow-lg"
                  : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {feature.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Active Feature Showcase */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-white dark:from-white/5 to-transparent border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${coreFeatures[activeFeature].color} text-white mb-6`}>
                  {coreFeatures[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  {coreFeatures[activeFeature].title}
                </h3>
                <p className="text-black/70 dark:text-white/70 mb-6">
                  {coreFeatures[activeFeature].desc}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {coreFeatures[activeFeature].stats.map((stat, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-lg bg-black/5 dark:bg-white/10 text-sm font-medium"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
                <button className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#021510] to-emerald-700 text-white font-semibold hover:shadow-lg transition">
                  Explore Feature
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl p-6 border border-emerald-500/20">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="font-medium">Feature Example {i}</span>
                        </div>
                        <div className="text-sm text-black/60 dark:text-white/60">Active</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreFeatures.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-4">
                {feature.desc}
              </p>
              <div className="space-y-2 mb-6">
                {feature.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-emerald-500" size={12} />
                    <span className="text-black/60 dark:text-white/60">{stat}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-lg bg-black/5 dark:bg-white/10 text-black dark:text-white font-semibold hover:bg-black/10 dark:hover:bg-white/20 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ADDITIONAL FEATURES */}
      <div className="relative px-6 sm:px-12 max-w-7xl mx-auto mb-20 z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
            Everything Else You <span className="text-emerald-600 dark:text-emerald-400">Need</span>
          </h2>
          <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Additional tools and features to support your entire learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className={`${feature.color} mb-3`}>
                {feature.icon}
              </div>
              <h4 className="font-bold mb-2 text-black dark:text-white">{feature.title}</h4>
              <p className="text-sm text-black/60 dark:text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <div className="relative px-6 sm:px-12 max-w-7xl mx-auto mb-20 z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
            <span className="text-emerald-600 dark:text-emerald-400">Upcoming</span> Events & Contests
          </h2>
          <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Join exciting coding challenges and compete with developers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white dark:from-white/5 to-transparent border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  event.difficulty === "Easy" ? "bg-green-500/20 text-green-700 dark:text-green-300" :
                  event.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300" :
                  "bg-red-500/20 text-red-700 dark:text-red-300"
                }`}>
                  {event.difficulty}
                </span>
                <span className="text-sm text-black/60 dark:text-white/60">{event.date}</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-black dark:text-white">{event.title}</h4>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-black/60 dark:text-white/60">{event.participants} participants</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Prize: {event.prize}</span>
              </div>
              <button className="w-full py-3 rounded-lg bg-black/5 dark:bg-white/10 text-black dark:text-white font-semibold hover:bg-black/10 dark:hover:bg-white/20 transition">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="relative px-6 sm:px-12 max-w-7xl mx-auto mb-20 z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
            Loved by <span className="text-emerald-600 dark:text-emerald-400">Developers</span> Worldwide
          </h2>
          <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            See what our community has to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                ))}
              </div>
              <p className="text-black/70 dark:text-white/70 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-black/60 dark:text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="relative px-6 sm:px-12 mb-20 z-10">
        <div className="relative overflow-hidden max-w-6xl mx-auto rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />
          <div className="relative bg-gradient-to-r from-[#021510] to-emerald-900 dark:from-emerald-900/80 dark:to-emerald-950/80 p-12 rounded-3xl text-center border border-emerald-500/20">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
                <FaBolt size={14} />
                <span>LIMITED TIME OFFER</span>
              </div>
              
              <h2 className="text-4xl font-extrabold mb-6 text-white">
                Start Your Coding Journey Today
              </h2>
              
              <p className="mb-8 text-white/90 text-lg">
                Join 50,000+ developers who've transformed their careers. Get access to all features with our 14-day free trial.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { text: "No credit card required", icon: FaCheckCircle },
                  { text: "Cancel anytime", icon: FaCheckCircle },
                  { text: "Full feature access", icon: FaCheckCircle },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-2 text-white/90">
                    <item.icon className="text-emerald-300" size={16} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-white text-[#021510] font-bold hover:bg-emerald-50 hover:scale-105 transition-all">
                  <FaPlayCircle size={20} />
                  Start 14-Day Free Trial
                  <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-4 rounded-xl bg-emerald-600/20 text-white border border-emerald-500/30 font-bold hover:bg-emerald-600/30 transition">
                  Talk to Sales
                </button>
              </div>
              
              <p className="mt-8 text-sm text-emerald-300/80">
                No risk, no commitment. Join thousands who've landed their dream jobs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeaturesPage;
