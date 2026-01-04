import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, LogOut, User } from "lucide-react";
import { ModeToggle } from "./modeToggle";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header
      className="
        sticky top-0 z-50 w-full border-b backdrop-blur-md
        bg-white
        dark:bg-[#020f0b]
        dark:bg-[conic-gradient(from_0deg,rgba(2,22,15,0.7),rgba(0,255,255,0.05),transparent,rgba(0,255,200,0.1))]
      "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-950 dark:text-white"
        >
          CodeClan
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["problems", "contests", "discuss", "leaderboard"].map((p) => (
            <Link
              key={p}
              to={`/${p}`}
              className="text-gray-700 dark:text-gray-200 hover:text-green-800 transition"
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium
                           text-green-950 hover:bg-green-100
                           dark:text-green-50 dark:hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md text-sm font-medium
                           bg-green-950 text-white hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                <User size={16} />
                {user?.firstName || "User"}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm
                           bg-red-600 text-white hover:bg-red-500 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white dark:bg-[#020f0b] p-4 space-y-3">
          {["problems", "contests", "discuss", "leaderboard"].map((p) => (
            <Link
              key={p}
              to={`/${p}`}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 dark:text-gray-200"
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Link>
          ))}

          {!isAuthenticated ? (
            <div className="flex gap-3 pt-3">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 pt-3"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
