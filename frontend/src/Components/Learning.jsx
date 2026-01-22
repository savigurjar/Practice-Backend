

// import { useState, useEffect } from "react";
// import { 
//   FaDatabase, FaProjectDiagram, FaLaptopCode, FaSeedling, FaRobot,
//   FaPython, FaReact, FaNodeJs, FaAws, FaJava, FaCloud, FaMobileAlt,
//   FaLock, FaChartLine, FaCode, FaServer, FaBrain, FaGraduationCap,
//   FaCalendarAlt, FaClock, FaUsers, FaCertificate, FaCheckCircle,
//   FaArrowRight, FaStar, FaPlayCircle, FaBookOpen, FaVideo
// } from "react-icons/fa";
// import { 
//   TrendingUp, Target, Clock, Zap, Award, Globe, Code, 
//   Database, Cpu, Server, Network, GitBranch, BookOpen, 
//   BarChart3, PieChart, LineChart, ChevronRight, Users,
//   Shield, Bell, Calendar, Timer, Percent, Book
// } from "lucide-react";
// import Animate from "../animate";

// const LearningPathsPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [progressData, setProgressData] = useState({});
//   const [enrolledPaths, setEnrolledPaths] = useState([1, 3]); // Simulating user enrollment
//   const [paths, setPaths] = useState([
//     {
//       id: 1,
//       title: "Data Structures & Algorithms",
//       icon: <FaDatabase size={28} />,
//       desc: "Master fundamental algorithms, data structures, and complex problem-solving techniques with 200+ curated problems.",
//       color: "from-blue-500 to-cyan-500",
//       difficulty: "Intermediate",
//       duration: "8 weeks",
//       modules: 12,
//       projects: 4,
//       enrolled: 15234,
//       rating: 4.8,
//       category: "fundamentals",
//       progress: 65,
//       featured: true,
//       instructor: "Dr. Alex Johnson",
//       tags: ["Algorithms", "Complexity", "Problem Solving"],
//       skills: ["Big O Notation", "Recursion", "Sorting", "Searching", "Dynamic Programming"]
//     },
//     {
//       id: 2,
//       title: "System Design Masterclass",
//       icon: <FaProjectDiagram size={28} />,
//       desc: "Learn to design scalable distributed systems, microservices architecture, and cloud-native applications.",
//       color: "from-purple-500 to-pink-500",
//       difficulty: "Advanced",
//       duration: "10 weeks",
//       modules: 15,
//       projects: 5,
//       enrolled: 8923,
//       rating: 4.9,
//       category: "design",
//       progress: 30,
//       featured: true,
//       instructor: "Sarah Chen",
//       tags: ["Scalability", "Microservices", "Architecture"],
//       skills: ["Load Balancing", "Caching", "Database Design", "API Design"]
//     },
//     {
//       id: 3,
//       title: "Full Stack Development",
//       icon: <FaLaptopCode size={28} />,
//       desc: "Build modern web applications with React, Node.js, and cloud deployment. Includes real-world projects.",
//       color: "from-emerald-500 to-green-500",
//       difficulty: "Intermediate",
//       duration: "12 weeks",
//       modules: 18,
//       projects: 6,
//       enrolled: 21456,
//       rating: 4.7,
//       category: "development",
//       progress: 45,
//       featured: true,
//       instructor: "Michael Rodriguez",
//       tags: ["React", "Node.js", "MongoDB"],
//       skills: ["React Hooks", "REST APIs", "Authentication", "Deployment"]
//     },
//     {
//       id: 4,
//       title: "Spring Boot & Microservices",
//       icon: <FaSeedling size={28} />,
//       desc: "Master enterprise Java development with Spring Boot, Spring Cloud, and microservices patterns.",
//       color: "from-green-500 to-lime-500",
//       difficulty: "Intermediate",
//       duration: "9 weeks",
//       modules: 14,
//       projects: 4,
//       enrolled: 7432,
//       rating: 4.6,
//       category: "backend",
//       progress: 0,
//       featured: false,
//       instructor: "James Wilson",
//       tags: ["Java", "Spring", "Microservices"],
//       skills: ["Spring Boot", "JPA", "Spring Security", "Docker"]
//     },
//     {
//       id: 5,
//       title: "Generative AI & LLMs",
//       icon: <FaRobot size={28} />,
//       desc: "Learn to build AI applications using OpenAI, LangChain, and fine-tune large language models.",
//       color: "from-orange-500 to-red-500",
//       difficulty: "Advanced",
//       duration: "7 weeks",
//       modules: 10,
//       projects: 3,
//       enrolled: 15678,
//       rating: 4.9,
//       category: "ai",
//       progress: 0,
//       featured: true,
//       instructor: "Dr. Lisa Wang",
//       tags: ["AI", "Machine Learning", "LLMs"],
//       skills: ["Prompt Engineering", "Fine-tuning", "AI Agents", "Embeddings"]
//     },
//     {
//       id: 6,
//       title: "Python for Data Science",
//       icon: <FaPython size={28} />,
//       desc: "Complete data science journey with Python, pandas, scikit-learn, and data visualization.",
//       color: "from-yellow-500 to-orange-500",
//       difficulty: "Beginner",
//       duration: "6 weeks",
//       modules: 8,
//       projects: 3,
//       enrolled: 18245,
//       rating: 4.5,
//       category: "data",
//       progress: 0,
//       featured: false,
//       instructor: "David Lee",
//       tags: ["Python", "Data Science", "ML"],
//       skills: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"]
//     },
//     {
//       id: 7,
//       title: "React Native Mobile Dev",
//       icon: <FaMobileAlt size={28} />,
//       desc: "Build cross-platform mobile applications with React Native and modern mobile development tools.",
//       color: "from-indigo-500 to-purple-500",
//       difficulty: "Intermediate",
//       duration: "8 weeks",
//       modules: 11,
//       projects: 4,
//       enrolled: 9321,
//       rating: 4.6,
//       category: "mobile",
//       progress: 0,
//       featured: false,
//       instructor: "Emma Thompson",
//       tags: ["React Native", "Mobile", "iOS/Android"],
//       skills: ["React Native", "Native Modules", "App Store", "Push Notifications"]
//     },
//     {
//       id: 8,
//       title: "AWS Cloud Architect",
//       icon: <FaAws size={28} />,
//       desc: "Become an AWS Certified Solutions Architect with hands-on projects and real-world scenarios.",
//       color: "from-orange-500 to-yellow-500",
//       difficulty: "Advanced",
//       duration: "10 weeks",
//       modules: 16,
//       projects: 5,
//       enrolled: 6743,
//       rating: 4.8,
//       category: "cloud",
//       progress: 0,
//       featured: true,
//       instructor: "Robert Kim",
//       tags: ["AWS", "Cloud", "DevOps"],
//       skills: ["EC2", "S3", "Lambda", "VPC", "RDS"]
//     },
//   ]);

//   const categories = [
//     { id: "all", label: "All Paths", count: 8 },
//     { id: "fundamentals", label: "Fundamentals", count: 2 },
//     { id: "development", label: "Development", count: 3 },
//     { id: "design", label: "Design", count: 1 },
//     { id: "ai", label: "AI & ML", count: 2 },
//     { id: "data", label: "Data Science", count: 1 },
//     { id: "cloud", label: "Cloud", count: 1 },
//   ];

//   const [filteredPaths, setFilteredPaths] = useState(paths);
//   const [stats, setStats] = useState({
//     totalPaths: 0,
//     totalEnrolled: 0,
//     avgRating: 0,
//     completionRate: 0
//   });

//   // Filter and sort paths
//   useEffect(() => {
//     let result = [...paths];
    
//     // Category filter
//     if (selectedCategory !== "all") {
//       result = result.filter(path => path.category === selectedCategory);
//     }
    
//     // Search filter
//     if (searchQuery) {
//       result = result.filter(path =>
//         path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         path.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         path.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
//       );
//     }
    
//     setFilteredPaths(result);
    
//     // Calculate stats
//     const totalEnrolled = result.reduce((sum, path) => sum + path.enrolled, 0);
//     const avgRating = result.length > 0
//       ? (result.reduce((sum, path) => sum + path.rating, 0) / result.length).toFixed(1)
//       : 0;
    
//     setStats({
//       totalPaths: result.length,
//       totalEnrolled,
//       avgRating,
//       completionRate: 72 // This would come from backend in real app
//     });
//   }, [selectedCategory, searchQuery, paths]);

//   const DifficultyBadge = ({ level }) => {
//     const config = {
//       Beginner: { color: "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/40" },
//       Intermediate: { color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/40" },
//       Advanced: { color: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40" },
//     };
    
//     const { color } = config[level] || config.Intermediate;
    
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
//         {level}
//       </span>
//     );
//   };

//   const handleEnroll = (pathId) => {
//     if (!enrolledPaths.includes(pathId)) {
//       setEnrolledPaths([...enrolledPaths, pathId]);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">
//       {/* Background animation */}
//       <div className="hidden dark:block">
//         <Animate />
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

//       {/* HEADER SECTION */}
//       <div className="relative px-6 sm:px-12 pt-20 pb-12 text-center z-10">
//         <div className="max-w-6xl mx-auto">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
//             <FaGraduationCap size={16} />
//             <span>Structured Learning Paths</span>
//           </div>

//           {/* Main Heading */}
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#021510] via-emerald-600 to-cyan-600 dark:from-white dark:via-emerald-400 dark:to-cyan-400">
//               Master In-Demand Skills
//             </span>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-lg text-black/70 dark:text-white/70 max-w-3xl mx-auto mb-10">
//             Follow curated learning paths designed by industry experts. Build projects, earn certificates, 
//             and advance your career with structured guidance.
//           </p>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
//             {[
//               { icon: <FaBookOpen size={24} />, label: "Learning Paths", value: stats.totalPaths },
//               { icon: <FaUsers size={24} />, label: "Students Enrolled", value: `${(stats.totalEnrolled / 1000).toFixed(1)}K+` },
//               { icon: <FaStar size={24} />, label: "Avg. Rating", value: stats.avgRating },
//               { icon: <FaChartLine size={24} />, label: "Completion Rate", value: `${stats.completionRate}%` },
//             ].map((stat, idx) => (
//               <div key={idx} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4">
//                 <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-white/10 to-transparent text-emerald-600 dark:text-emerald-400">
//                   {stat.icon}
//                 </div>
//                 <p className="text-2xl font-bold text-black dark:text-white">{stat.value}</p>
//                 <p className="text-sm text-black/60 dark:text-white/60">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* FILTER & SEARCH SECTION */}
//       <div className="relative px-6 sm:px-12 max-w-6xl mx-auto mb-8 z-10">
//         <div className="bg-white dark:bg-white/5 backdrop-blur border border-black/10 dark:border-white/10 rounded-2xl p-6">
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//             {/* Search Bar */}
//             <div className="flex-1 w-full lg:w-auto">
//               <div className="relative">
//                 <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/40 dark:text-white/40" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search learning paths, skills, or instructors..."
//                   className="w-full pl-12 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Category Filter */}
//             <div className="flex items-center gap-2">
//               <Filter size={20} className="text-black/60 dark:text-white/60" />
//               <div className="flex gap-2 flex-wrap">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setSelectedCategory(category.id)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                       selectedCategory === category.id
//                         ? "bg-emerald-500 text-white"
//                         : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
//                     }`}
//                   >
//                     {category.label} ({category.count})
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* LEARNING PATHS GRID */}
//       <div className="relative px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-20 z-10">
//         {filteredPaths.map((path) => (
//           <div
//             key={path.id}
//             className="group bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
//           >
//             {/* Featured Badge */}
//             {path.featured && (
//               <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
//                 <FaStar size={12} />
//                 <span>FEATURED</span>
//               </div>
//             )}

//             {/* Enrolled Badge */}
//             {enrolledPaths.includes(path.id) && (
//               <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-500/40">
//                 ENROLLED
//               </div>
//             )}

//             {/* Header */}
//             <div className="flex items-start gap-4 mb-6">
//               <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${path.color} flex items-center justify-center text-white`}>
//                 {path.icon}
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-2xl font-bold text-[#021510] dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition">
//                     {path.title}
//                   </h3>
//                   <div className="flex items-center gap-1">
//                     <FaStar size={16} className="text-yellow-500 fill-yellow-500" />
//                     <span className="font-bold">{path.rating}</span>
//                     <span className="text-sm text-black/50 dark:text-white/50">({path.enrolled})</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 mt-2">
//                   <DifficultyBadge level={path.difficulty} />
//                   <span className="flex items-center gap-1 text-sm text-black/60 dark:text-white/60">
//                     <FaClock size={12} />
//                     {path.duration}
//                   </span>
//                   <span className="flex items-center gap-1 text-sm text-black/60 dark:text-white/60">
//                     <BookOpen size={12} />
//                     {path.modules} modules
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="text-black/70 dark:text-white/70 mb-6 line-clamp-2">
//               {path.desc}
//             </p>

//             {/* Instructor */}
//             <div className="flex items-center gap-3 mb-6 p-3 bg-black/5 dark:bg-white/10 rounded-lg">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
//                 {path.instructor.split(' ').map(n => n[0]).join('')}
//               </div>
//               <div>
//                 <div className="text-sm text-black/60 dark:text-white/60">Instructor</div>
//                 <div className="font-medium">{path.instructor}</div>
//               </div>
//             </div>

//             {/* Skills & Tags */}
//             <div className="mb-6">
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {path.tags.map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className="px-3 py-1 text-xs bg-black/5 dark:bg-white/10 rounded-full text-black/70 dark:text-white/70"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//               <div className="text-sm text-black/60 dark:text-white/60 mb-2">You'll learn:</div>
//               <div className="flex flex-wrap gap-2">
//                 {path.skills.slice(0, 3).map((skill, idx) => (
//                   <span
//                     key={idx}
//                     className="px-3 py-1 text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-lg"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//                 {path.skills.length > 3 && (
//                   <span className="px-3 py-1 text-xs bg-black/5 dark:bg-white/10 rounded-lg">
//                     +{path.skills.length - 3} more
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Progress Bar (if enrolled) */}
//             {enrolledPaths.includes(path.id) && path.progress > 0 && (
//               <div className="mb-6">
//                 <div className="flex items-center justify-between text-sm mb-2">
//                   <span className="text-black/70 dark:text-white/70">Progress</span>
//                   <span className="font-bold text-emerald-600 dark:text-emerald-400">{path.progress}%</span>
//                 </div>
//                 <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
//                     style={{ width: `${path.progress}%` }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Stats & Action Button */}
//             <div className="flex items-center justify-between">
//               <div className="grid grid-cols-3 gap-4 text-center">
//                 <div>
//                   <div className="text-lg font-bold text-black dark:text-white">{path.modules}</div>
//                   <div className="text-xs text-black/60 dark:text-white/60">Modules</div>
//                 </div>
//                 <div>
//                   <div className="text-lg font-bold text-black dark:text-white">{path.projects}</div>
//                   <div className="text-xs text-black/60 dark:text-white/60">Projects</div>
//                 </div>
//                 <div>
//                   <div className="text-lg font-bold text-black dark:text-white">{(path.enrolled / 1000).toFixed(1)}K</div>
//                   <div className="text-xs text-black/60 dark:text-white/60">Enrolled</div>
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => handleEnroll(path.id)}
//                 className={`group/btn flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
//                   enrolledPaths.includes(path.id)
//                     ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:opacity-90"
//                     : "bg-gradient-to-r from-[#021510] to-emerald-700 text-white hover:shadow-lg hover:scale-[1.02]"
//                 }`}
//               >
//                 {enrolledPaths.includes(path.id) ? (
//                   <>
//                     <FaPlayCircle size={18} />
//                     Continue Learning
//                   </>
//                 ) : (
//                   <>
//                     Enroll Now
//                     <FaArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* EMPTY STATE */}
//       {filteredPaths.length === 0 && (
//         <div className="relative z-10 max-w-2xl mx-auto px-6 text-center py-16">
//           <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
//             <FaSearch size={48} className="text-emerald-500" />
//           </div>
//           <h3 className="text-2xl font-bold mb-3">No learning paths found</h3>
//           <p className="text-black/70 dark:text-white/70 mb-6">
//             Try adjusting your search or filters to find what you're looking for.
//           </p>
//           <button
//             onClick={() => {
//               setSearchQuery("");
//               setSelectedCategory("all");
//             }}
//             className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition"
//           >
//             Reset Filters
//           </button>
//         </div>
//       )}

//       {/* BENEFITS SECTION */}
//       <div className="relative px-6 sm:px-12 max-w-6xl mx-auto mb-20 z-10">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
//             Why Choose Our <span className="text-emerald-600 dark:text-emerald-400">Learning Paths</span>?
//           </h2>
//           <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto">
//             Structured learning designed to help you achieve your career goals
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             {
//               icon: <FaCertificate size={24} />,
//               title: "Industry-Recognized Certificates",
//               desc: "Earn certificates that are recognized by top tech companies worldwide."
//             },
//             {
//               icon: <FaChartLine size={24} />,
//               title: "Personalized Learning",
//               desc: "Adaptive learning paths that adjust to your pace and skill level."
//             },
//             {
//               icon: <FaUsers size={24} />,
//               title: "Community Support",
//               desc: "Learn with peers, get mentorship, and join study groups."
//             },
//             {
//               icon: <FaCode size={24} />,
//               title: "Hands-On Projects",
//               desc: "Build real-world projects to showcase in your portfolio."
//             },
//             {
//               icon: <FaVideo size={24} />,
//               title: "Expert-Led Content",
//               desc: "Learn from industry professionals with years of experience."
//             },
//             {
//               icon: <FaLock size={24} />,
//               title: "Career Guidance",
//               desc: "Get job search assistance, resume reviews, and interview prep."
//             },
//           ].map((benefit, idx) => (
//             <div
//               key={idx}
//               className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:shadow-lg transition"
//             >
//               <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
//                 {benefit.icon}
//               </div>
//               <h4 className="font-bold text-lg mb-2 text-black dark:text-white">{benefit.title}</h4>
//               <p className="text-black/70 dark:text-white/70 text-sm">{benefit.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA SECTION */}
//       <div className="relative px-6 sm:px-12 mb-20 z-10">
//         <div className="relative overflow-hidden max-w-6xl mx-auto rounded-3xl">
//           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />
//           <div className="relative bg-gradient-to-r from-[#021510] to-emerald-900 dark:from-emerald-900/80 dark:to-emerald-950/80 p-12 rounded-3xl text-center border border-emerald-500/20">
//             <div className="max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
//                 <FaGraduationCap size={16} />
//                 <span>LIMITED TIME OFFER</span>
//               </div>
              
//               <h2 className="text-4xl font-extrabold mb-6 text-white">
//                 Start Your Learning Journey Today
//               </h2>
              
//               <p className="mb-8 text-white/90 text-lg">
//                 Join 50,000+ developers who've transformed their careers with our structured learning paths. 
//                 Get access to all courses with our risk-free trial.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//                 {[
//                   { text: "14-day free trial", icon: FaCheckCircle },
//                   { text: "Cancel anytime", icon: FaCheckCircle },
//                   { text: "Access all paths", icon: FaCheckCircle },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-center justify-center gap-2 text-white/90">
//                     <item.icon className="text-emerald-300" size={16} />
//                     <span>{item.text}</span>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button className="group flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-white text-[#021510] font-bold hover:bg-emerald-50 hover:scale-105 transition-all">
//                   <FaPlayCircle size={20} />
//                   Start 14-Day Free Trial
//                   <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button className="px-10 py-4 rounded-xl bg-emerald-600/20 text-white border border-emerald-500/30 font-bold hover:bg-emerald-600/30 transition">
//                   View All Learning Paths
//                 </button>
//               </div>
              
//               <p className="mt-8 text-sm text-emerald-300/80">
//                 No credit card required. Join today and start learning immediately.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper components
// const FaSearch = ({ size, className }) => (
//   <svg
//     className={className}
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="11" cy="11" r="8" />
//     <path d="m21 21-4.35-4.35" />
//   </svg>
// );

// const Filter = ({ size, className }) => (
//   <svg
//     className={className}
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//   </svg>
// );

// export default LearningPathsPage;














































import { FaDatabase, FaProjectDiagram, FaLaptopCode, FaSeedling, FaRobot } from "react-icons/fa";
import Animate from "../animate";

const LearningPathsPage = () => {
  const paths = [
    {
      title: "Data Structures & Algorithms",
      icon: <FaDatabase size={24} />,
      desc: "Master the fundamentals of DSA with comprehensive tutorials and practice problems",
    },
    {
      title: "System Design",
      icon: <FaProjectDiagram size={24} />,
      desc: "Learn how to design scalable systems and architect robust applications",
    },
    {
      title: "Full Stack Development",
      icon: <FaLaptopCode size={24} />,
      desc: "Build complete web applications from frontend to backend with modern technologies",
    },
    {
      title: "Spring Boot",
      icon: <FaSeedling size={24} />,
      desc: "Master Java Spring Boot framework for enterprise application development",
    },
    {
      title: "Generative AI",
      icon: <FaRobot size={24} />,
      desc: "Learn how to build AI-powered applications and generate content with modern AI tools",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">

      {/* Background animation (dark mode only) */}
      <div className="hidden dark:block ">
        <Animate />
      </div>

      {/* Header */}
      <div className="relative px-6 sm:px-10 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-3 text-black dark:text-white">
          Learn and Upskill
        </h1>
        <p className="max-w-2xl mx-auto text-black/70 dark:text-white/70 mb-14">
          Master essential skills with our curated learning paths and comprehensive tutorials.
        </p>
      </div>

      {/* Cards */}
      <div className="px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
  {paths.map((path) => (
    <div
      key={path.title}
      className="
        bg-white dark:bg-white/5
        border border-black/10 dark:border-white/10
        rounded-2xl p-6
        backdrop-blur
        hover:scale-[1.03]
        hover:shadow-lg
        transition-all
      "
    >
      {/* Icon */}
      <div
        className="
          w-11 h-11 rounded-lg
          bg-[#021510]/10 text-[#021510]
          dark:bg-emerald-500/20 dark:text-emerald-300
          flex items-center justify-center
          mb-4
        "
      >
        {path.icon}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg mb-1 text-green-950 dark:text-white">
        {path.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-black/60 dark:text-white/60 mb-5">
        {path.desc}
      </p>

      {/* CTA tag */}
      <span
        className="
          inline-block text-xs font-semibold
          px-3 py-1 rounded-full
          border
          border-[#021510]/30 text-[#021510] 
          dark:border-emerald-400/40 dark:text-emerald-300
          bg-[#021510]/5 dark:bg-emerald-500/10
        "
      >
        Start Learning →
      </span>
    </div>
  ))}
</div>




{/* CTA */}
<div className="mt-10 mb-20 relative z-10">
  <div className="relative overflow-hidden max-w-3xl mx-auto rounded-2xl p-10 text-center bg-[#021510] text-white dark:bg-gradient-to-r dark:from-emerald-900 dark:to-emerald-950">
   <div className="absolute inset-0 bg-emerald-500/10 blur-3xl pointer-events-none" />
    <h2 className="text-3xl font-extrabold mb-4 text-white">
      Ready to Level Up Your Skills?
    </h2>
    <p className="mb-6 text-white/90">
      Explore our learning paths, practice with curated problems, and become industry-ready.
    </p>
     <button className="
              px-8 py-3 rounded-lg
              bg-white text-[#021510]
              font-semibold
              hover:bg-emerald-100 hover:scale-105
              transition-all
            ">
      Start Learning
    </button>
  </div>
</div>


    </div>
  );
};

export default LearningPathsPage;
