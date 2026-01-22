// src/pages/HeroPage.jsx
import { useState, useEffect } from "react";
import Animate from "../animate";

const HeroPage = () => {
  const features = ["Live Battles", "Skill Ratings", "Instant Feedback"];
  const stats = [
    { label: "Active Coders", value: "10K+" },
    { label: "Submissions", value: "1M+" },
    { label: "Problems", value: "500+" },
  ];

  // Images for the right card slideshow
  const images = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">

      {/* 🌌 Background (dark mode only) */}
      <div className="hidden dark:block">
        <Animate />
      </div>

      {/* HERO */}
      <div className="relative z-10 px-6 sm:px-12 pt-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
            Level Up Your <br />
            <span className="text-[#021510] dark:text-emerald-400">
              Coding Skills
            </span>
          </h1>

          <p className="text-black/70 dark:text-white/70 max-w-xl mb-8">
            Practice coding, compete globally, and improve your skills with
            real-world problems and live contests on our platform.
          </p>

          <div className="flex gap-4 mb-10 flex-wrap">
            <button className="
              px-6 py-3 rounded-lg font-semibold transition
              bg-[#021510] text-white hover:bg-[#03261d]
              dark:bg-emerald-900 dark:hover:bg-emerald-950
            ">
              Get Started Free 🚀
            </button>

            <button className="
              px-6 py-3 rounded-lg transition
              border border-black/20 hover:bg-black/5
              dark:border-white/30 dark:hover:bg-white/10
            ">
              View Challenges
            </button>
          </div>

          {/* STATS */}
          <div className="flex gap-8 flex-wrap text-sm text-black/70 dark:text-white/70">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start sm:items-center">
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="
          bg-white/5 dark:bg-white/5
          border border-black/10 dark:border-white/10
          rounded-2xl overflow-hidden backdrop-blur
          hover:scale-[1.02] transition-shadow hover:shadow-lg
        ">
          <img
            src={images[currentImage]}
            alt="coding"
            className="w-full h-52 sm:h-64 object-cover transition-all duration-1000 ease-in-out"
          />

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-950 dark:text-white">
              Compete. Learn. Grow.
            </h3>
            <p className="text-sm text-black/70 dark:text-white/70 mb-4">
              Join live contests and challenge developers across the globe.
            </p>

            <div className="flex flex-wrap gap-2">
              {features.map((item) => (
                <span
                  key={item}
                  className="
                    px-3 py-1 text-xs rounded-full
                    bg-black/5 border border-black/10
                    dark:bg-white/10 dark:border-white/20
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-6 sm:px-12 mt-24 mb-20">
        <div className="
          rounded-2xl p-10 text-center
          bg-[#021510] text-white
          dark:bg-gradient-to-r dark:from-emerald-900 dark:to-emerald-950 relative overflow-hidden shadow-xl
        ">
          <div className="absolute inset-0 bg-emerald-500/10 blur-3xl pointer-events-none" />
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto text-white/90">
            Improve daily, compete weekly, and track your progress.
          </p>
           <button className="
              px-8 py-3 rounded-lg
              bg-white text-[#021510]
              font-semibold
              hover:bg-emerald-100 hover:scale-105
              transition-all
            ">
            Join Now 🚀
          </button>
        </div>
      </div>

    </div>
  );
};

export default HeroPage;

// import { useState, useEffect, useRef } from "react";
// import { 
//   FaCode, FaTrophy, FaUsers, FaChartLine, 
//   FaPlayCircle, FaArrowRight, FaStar, 
//   FaLightbulb, FaBolt, FaShieldAlt,
//   FaGithub, FaLinkedin, FaTwitter
// } from "react-icons/fa";
// import { 
//   TrendingUp, Target, Clock, Zap, Award, 
//   ChevronRight, Sparkles, Cpu, Server, 
//   Globe, Code, Database, GitBranch
// } from "lucide-react";
// import Animate from "../animate";
// import { TypeAnimation } from "react-type-animation";

// const HeroPage = () => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [stats, setStats] = useState({
//     activeCoders: 0,
//     submissions: 0,
//     problems: 0,
//     contests: 0
//   });
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const heroRef = useRef(null);

//   // Coding images slideshow
//   const images = [
//     "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80",
//     "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=1200&auto=format&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=1200&auto=format&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&auto=format&fit=crop&q=80",
//   ];

//   // Enhanced features
//   const features = [
//     { icon: <FaBolt size={18} />, text: "Live Battles", color: "text-emerald-500" },
//     { icon: <FaChartLine size={18} />, text: "Skill Ratings", color: "text-blue-500" },
//     { icon: <FaCode size={18} />, text: "Instant Feedback", color: "text-purple-500" },
//     { icon: <FaTrophy size={18} />, text: "Global Ranking", color: "text-yellow-500" },
//     { icon: <FaShieldAlt size={18} />, text: "Anti-Cheat", color: "text-red-500" },
//     { icon: <FaUsers size={18} />, text: "Community", color: "text-cyan-500" },
//   ];

//   // Enhanced stats
//   const statItems = [
//     { 
//       icon: <FaUsers size={24} />, 
//       label: "Active Coders", 
//       value: "10K+",
//       color: "from-emerald-500 to-green-500",
//       suffix: "+"
//     },
//     { 
//       icon: <FaCode size={24} />, 
//       label: "Submissions", 
//       value: "1.2M",
//       color: "from-blue-500 to-cyan-500",
//       suffix: "+"
//     },
//     { 
//       icon: <FaStar size={24} />, 
//       label: "Problems", 
//       value: "500",
//       color: "from-purple-500 to-pink-500",
//       suffix: "+"
//     },
//     { 
//       icon: <FaTrophy size={24} />, 
//       label: "Contests", 
//       value: "52",
//       color: "from-orange-500 to-red-500",
//       suffix: "+"
//     },
//   ];

//   // Coding languages for animation
//   const codingLanguages = [
//     "Python", "JavaScript", "Java", "C++", "Go",
//     "Rust", "TypeScript", "Ruby", "Swift", "Kotlin"
//   ];

//   // Change image every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Animate stats counter
//   useEffect(() => {
//     const duration = 2000;
//     const steps = 100;
//     const stepDuration = duration / steps;
    
//     const counters = {
//       activeCoders: 10000,
//       submissions: 1200000,
//       problems: 500,
//       contests: 52
//     };

//     Object.keys(counters).forEach(key => {
//       let step = 0;
//       const stepValue = counters[key] / steps;
//       const timer = setInterval(() => {
//         setStats(prev => ({
//           ...prev,
//           [key]: Math.floor(step * stepValue)
//         }));
//         step++;
//         if (step > steps) clearInterval(timer);
//       }, stepDuration);
//     });
//   }, []);

//   // Mouse move effect
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (heroRef.current) {
//         const { left, top, width, height } = heroRef.current.getBoundingClientRect();
//         const x = ((e.clientX - left) / width) * 100;
//         const y = ((e.clientY - top) / height) * 100;
//         setMousePosition({ x, y });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div 
//       ref={heroRef}
//       className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white"
//       style={{
//         background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(2, 21, 16, 0.05) 0%, transparent 50%)`
//       }}
//     >
//       {/* 🌌 Background (dark mode only) */}
//       <div className="hidden dark:block">
//         <Animate />
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-1/4 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

//       {/* HERO SECTION */}
//       <div className="relative z-10 px-6 sm:px-12 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
        
//         {/* LEFT CONTENT */}
//         <div className="relative">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
//             <Sparkles size={16} />
//             <span>Trusted by 10,000+ Developers</span>
//           </div>

//           {/* Main Heading */}
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
//             Level Up Your
//             <br />
//             <span className="relative">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#021510] via-emerald-600 to-cyan-600 dark:from-white dark:via-emerald-400 dark:to-cyan-400">
//                 Coding Skills
//               </span>
//               <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
//             </span>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-lg text-black/70 dark:text-white/70 max-w-xl mb-8">
//             Practice coding, compete globally, and improve your skills with
//             real-world problems and live contests on our platform.{" "}
//             <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
//               Join the future of coding education.
//             </span>
//           </p>

//           {/* Dynamic Coding Languages */}
//           <div className="mb-8">
//             <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 mb-3">
//               <Code size={16} />
//               <span>Master languages like:</span>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {codingLanguages.map((lang, idx) => (
//                 <span
//                   key={lang}
//                   className="px-3 py-1.5 text-sm rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition"
//                   style={{ animationDelay: `${idx * 100}ms` }}
//                 >
//                   {lang}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 mb-12">
//             <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#021510] to-emerald-700 text-white font-bold hover:shadow-xl hover:scale-105 transition-all">
//               <FaPlayCircle size={20} />
//               Get Started Free
//               <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold hover:bg-white/20 dark:hover:bg-white/10 transition">
//               <FaGithub size={20} />
//               View Challenges
//               <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
//             {features.map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center gap-2 text-sm"
//               >
//                 <div className={`${feature.color}`}>
//                   {feature.icon}
//                 </div>
//                 <span className="text-black/70 dark:text-white/70">{feature.text}</span>
//               </div>
//             ))}
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {statItems.map((stat, idx) => (
//               <div
//                 key={idx}
//                 className="group bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all"
//               >
//                 <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
//                   {stat.icon}
//                 </div>
//                 <p className="text-2xl font-bold text-center text-black dark:text-white">
//                   {stat.value}
//                   <span className="text-emerald-600 dark:text-emerald-400">{stat.suffix}</span>
//                 </p>
//                 <p className="text-sm text-center text-black/60 dark:text-white/60">
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT CARD */}
//         <div className="relative">
//           {/* Main Card */}
//           <div className="relative bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:shadow-2xl transition-all duration-500 group">
//             {/* Image Container */}
//             <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
//               {images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt="Coding scene"
//                   className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
//                     idx === currentImage
//                       ? "opacity-100 scale-100"
//                       : "opacity-0 scale-105"
//                   }`}
//                 />
//               ))}
              
//               {/* Image Indicators */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
//                 {images.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentImage(idx)}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       idx === currentImage
//                         ? "w-8 bg-emerald-500"
//                         : "bg-white/50 hover:bg-white"
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Overlay Badge */}
//               <div className="absolute top-4 left-4 z-20">
//                 <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 text-white text-xs font-bold flex items-center gap-1">
//                   <Zap size={12} />
//                   LIVE NOW
//                 </div>
//               </div>
//             </div>

//             {/* Card Content */}
//             <div className="p-6 lg:p-8">
//               <div className="flex items-start justify-between mb-4">
//                 <h3 className="text-2xl font-bold text-[#021510] dark:text-emerald-400">
//                   Compete. Learn. Grow.
//                 </h3>
//                 <div className="flex items-center gap-1 text-yellow-500">
//                   <FaStar size={16} className="fill-yellow-500" />
//                   <span className="font-bold">4.9</span>
//                 </div>
//               </div>

//               <p className="text-black/70 dark:text-white/70 mb-6">
//                 Join live contests and challenge developers across the globe. 
//                 Real-time ranking, instant feedback, and skill-based matchmaking.
//               </p>

//               {/* Progress Bar */}
//               <div className="mb-6">
//                 <div className="flex items-center justify-between text-sm mb-2">
//                   <span className="text-black/60 dark:text-white/60">Contest Progress</span>
//                   <span className="font-bold text-emerald-600 dark:text-emerald-400">65% Full</span>
//                 </div>
//                 <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
//                     style={{ width: '65%' }}
//                   />
//                 </div>
//               </div>

//               {/* Next Contest Info */}
//               <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-sm text-black/60 dark:text-white/60">Next Contest</div>
//                     <div className="font-bold">Weekly Algorithm Challenge</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm text-black/60 dark:text-white/60">Starts in</div>
//                     <div className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">2:15:30</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#021510] to-emerald-700 text-white font-semibold hover:opacity-90 transition">
//                   Join Contest
//                 </button>
//                 <button className="px-4 py-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition">
//                   <FaPlayCircle size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Decorative Corner */}
//             <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
//               <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-transparent transform rotate-45 translate-x-20 -translate-y-20" />
//             </div>
//           </div>

//           {/* Floating Coding Stats */}
//           <div className="absolute -bottom-6 -left-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg backdrop-blur">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
//                 <FaCode size={20} />
//               </div>
//               <div>
//                 <div className="text-sm text-black/60 dark:text-white/60">Lines of Code</div>
//                 <div className="font-bold text-xl">1.2M+</div>
//               </div>
//             </div>
//           </div>

//           {/* Floating Rating */}
//           <div className="absolute -top-6 -right-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg backdrop-blur">
//             <div className="flex items-center gap-2">
//               {[...Array(5)].map((_, i) => (
//                 <FaStar key={i} size={16} className="text-yellow-500 fill-yellow-500" />
//               ))}
//               <div className="ml-2">
//                 <div className="text-sm font-bold">4.9/5</div>
//                 <div className="text-xs text-black/60 dark:text-white/60">Rating</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* TRUSTED BY SECTION */}
//       <div className="relative px-6 sm:px-12 max-w-6xl mx-auto mb-16">
//         <div className="text-center mb-8">
//           <p className="text-sm text-black/60 dark:text-white/60 uppercase tracking-wider mb-4">
//             TRUSTED BY ENGINEERS AT
//           </p>
//           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
//             {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix"].map((company) => (
//               <div key={company} className="text-2xl font-bold text-black/40 dark:text-white/40 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
//                 {company}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ENHANCED CTA SECTION */}
//       <div className="relative px-6 sm:px-12 mb-20">
//         <div className="relative overflow-hidden max-w-6xl mx-auto rounded-3xl">
//           {/* Background Effect */}
//           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />
          
//           {/* Main CTA */}
//           <div className="relative bg-gradient-to-r from-[#021510] to-emerald-900 dark:from-emerald-900/80 dark:to-emerald-950/80 p-12 rounded-3xl text-center border border-emerald-500/20">
//             <div className="max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
//                 <FaBolt size={14} />
//                 <span>LIMITED TIME OFFER</span>
//               </div>
              
//               <h2 className="text-4xl font-extrabold mb-6 text-white">
//                 Ready to Start Your Coding Journey?
//               </h2>
              
//               <p className="mb-8 text-white/90 text-lg">
//                 Join thousands of developers who've transformed their careers. 
//                 Get 14 days free, no credit card required.
//               </p>

//               {/* Benefits */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//                 {[
//                   { text: "Unlimited Practice", icon: FaCode },
//                   { text: "Live Contests", icon: FaTrophy },
//                   { text: "Community Support", icon: FaUsers },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-center justify-center gap-2 text-white/90">
//                     <item.icon className="text-emerald-300" size={18} />
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
//                   Schedule a Demo
//                 </button>
//               </div>
              
//               <p className="mt-8 text-sm text-emerald-300/80">
//                 No risk, no commitment. Join today and start coding immediately.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SOCIAL PROOF */}
//       <div className="relative px-6 sm:px-12 max-w-6xl mx-auto mb-20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             {
//               quote: "This platform helped me land my dream job at Google. The real-time battles were game-changing!",
//               author: "Alex Chen",
//               role: "Senior Engineer @ Google",
//               avatar: "AC"
//             },
//             {
//               quote: "The structured learning paths and community support accelerated my growth by 3x.",
//               author: "Sarah Johnson",
//               role: "Software Developer @ Amazon",
//               avatar: "SJ"
//             },
//             {
//               quote: "Best investment in my career. Went from beginner to competitive programmer in 6 months.",
//               author: "Marcus Lee",
//               role: "Engineering Manager @ Microsoft",
//               avatar: "ML"
//             },
//           ].map((testimonial, idx) => (
//             <div
//               key={idx}
//               className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6"
//             >
//               <div className="flex items-center gap-2 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar key={i} className="text-yellow-500 fill-yellow-500" size={16} />
//                 ))}
//               </div>
//               <p className="text-black/70 dark:text-white/70 mb-6 italic">"{testimonial.quote}"</p>
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
//                   {testimonial.avatar}
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-black dark:text-white">{testimonial.author}</h4>
//                   <p className="text-sm text-black/60 dark:text-white/60">{testimonial.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroPage;
