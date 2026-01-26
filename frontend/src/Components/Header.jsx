// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { Menu, X, LogOut, User } from "lucide-react";
// import { ModeToggle } from "./modeToggle";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../features/authSlice";

// function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     navigate("/login");
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md
//       bg-white dark:bg-[#020f0b] 
//       dark:bg-[conic-gradient(from_0deg,rgba(2,22,15,0.7),rgba(0,255,255,0.05),transparent,rgba(0,255,200,0.1))] transition-colors">

//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-green-950 dark:text-white">
//           CodeClan
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
//           {["problems", "contests", "tutorials", "discuss", "ask"].map((p) => (
//             <Link
//               key={p}
//               to={`/${p}`}
//               className="text-gray-700 dark:text-gray-200 hover:text-green-800 transition"
//             >
//               {p.charAt(0).toUpperCase() + p.slice(1)}
//             </Link>
//           ))}
//         </nav>

//         {/* Right Side - Auth & Mode */}
//         <div className=" md:flex items-center">
//         <ModeToggle /></div>
//       <div className="hidden md:flex items-center gap-3">


//         {!isAuthenticated ? (
//           <>
//             <Link
//               to="/login"
//               className="px-4 py-2 rounded-md text-sm font-medium
//                            text-green-950 hover:bg-green-100
//                            dark:text-green-50 dark:hover:bg-gray-800 transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="px-4 py-2 rounded-md text-sm font-medium
//                            bg-green-950 text-white hover:bg-green-700 transition"
//             >
//               Sign Up
//             </Link>
//           </>
//         ) : (
//           <div className="relative group">
//             <button className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
//               <User size={16} />
//               {user?.firstName || "User"}
//             </button>

//             {/* Dropdown Menu */}
//             <div className="absolute right-0 mt-2 w-44 rounded-md border
//                               bg-white dark:bg-[#020f0b] shadow-lg
//                               opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                               transition-all">
//               <Link
//                 to="/dashboard"
//                 className="block px-4 py-2 text-sm dark:text-white text-green-950 hover:text-white hover:bg-green-950 dark:hover:bg-gray-800"
//               >
//                 Dashboard
//               </Link>

//               {user?.role === "admin" && (
//                 <Link
//                   to="/admin"
//                   className="block px-4 py-2 text-sm dark:text-white text-green-950 hover:text-white hover:bg-green-950 dark:hover:bg-gray-800"
//                 >
//                   Admin
//                 </Link>
//               )}

//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
//               >
//                 <LogOut size={14} />
//                 Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
//       >
//         {isOpen ? <X size={22} /> : <Menu size={22} />}
//       </button>
//     </div>

//       {/* Mobile Menu */ }
//   {
//     isOpen && (
//       <div className="md:hidden border-t bg-white dark:bg-[#020f0b] p-4 space-y-3 transition-all">
//         {["problems", "contests", "discuss", "leaderboard"].map((p) => (
//           <Link
//             key={p}
//             to={`/${p}`}
//             onClick={() => setIsOpen(false)}
//             className="block text-gray-700 dark:text-gray-200 hover:text-green-800 transition"
//           >
//             {p.charAt(0).toUpperCase() + p.slice(1)}
//           </Link>
//         ))}

//         {isAuthenticated && (
//           <>
//             <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200">
//               Dashboard
//             </Link>

//             {user?.role === "admin" && (
//               <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200">
//                 Admin
//               </Link>
//             )}

//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 text-red-600 pt-2"
//             >
//               <LogOut size={16} />
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     )
//   }
//     </header >
//   );
// }

// export default Header;


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, LogOut, User, Code } from "lucide-react";
import { ModeToggle } from "./modeToggle";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user, checkingAuth } = useSelector((state) => state.auth);

  // Fix for hydration and mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await dispatch(logoutUser());
    navigate("/login");
  };

  // Show loading skeleton while checking auth or not mounted
  if (checkingAuth || !mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-white dark:bg-[#020f0b]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          {/* Right side skeleton */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="hidden md:flex items-center gap-3">
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse md:hidden"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md
      bg-white dark:bg-[#020f0b] 
      dark:bg-[conic-gradient(from_0deg,rgba(2,22,15,0.7),rgba(0,255,255,0.05),transparent,rgba(0,255,200,0.1))] transition-colors">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-green-950 dark:text-white">
          {/* <Code className="text-green-900 dark:text-green-400" size={28} /> */}
          <span>CodeClan</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["problems", "contests", "tutorials", "discuss", "ask"].map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              className="text-gray-700 dark:text-gray-200 hover:text-green-800 dark:hover:text-green-400 transition-colors duration-200"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>

        {/* Right Side - Controls */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* ModeToggle - Always visible */}
          <div className="flex items-center">
            <ModeToggle />
          </div>

          {/* Desktop Auth/User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium
                           text-green-950 hover:bg-green-100
                           dark:text-green-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium
                           bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button 
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="User menu"
                >
                  <User size={18} />
                  <span className="font-medium">{user?.firstName || "User"}</span>
                  {user?.role === "admin" && (
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full">
                      Admin
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-white dark:bg-[#020f0b] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-3 border-b dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 hover:text-green-800 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {/* <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 hover:text-green-800 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link> */}

                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 hover:text-green-800 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors border-t dark:border-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-start gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors border-t dark:border-gray-800 rounded-b-md"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white dark:bg-[#020f0b] p-4 transition-all animate-in slide-in-from-top duration-200">
          {/* User Info if authenticated */}
          {isAuthenticated && (
            <div className="mb-4 pb-4 border-b dark:border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <User size={20} className="text-green-800 dark:text-green-200" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                  {user?.role === "admin" && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-2 mb-4">
            {["problems", "contests", "tutorials", "discuss", "ask"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-green-50 hover:text-green-800 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="pt-4 border-t dark:border-gray-800">
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-md text-center font-medium text-green-950 hover:bg-green-100 dark:text-green-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-md text-center font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-green-50 hover:text-green-800 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors"
                >
                  Dashboard
                </Link>

                {/* <Link 
                  to="/profile" 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-green-50 hover:text-green-800 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors"
                >
                  Profile
                </Link> */}

                {user?.role === "admin" && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-green-50 hover:text-green-800 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors mt-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
