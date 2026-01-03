import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./modeToggle";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{
        background:
          "conic-gradient(from 0deg, rgba(2, 22, 15, 0.705), rgba(0, 255, 255, 0.05), transparent, rgba(0, 255, 200, 0.1))",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Link
            to="/"
            className="text-green-950 dark:text-white hover:opacity-90"
          >
            CodeClan
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link
            to="/problems"
            className="hover:text-green-900 dark:hover:text-green-800 transition"
          >
            Problems
          </Link>
          <Link
            to="/contests"
            className="hover:text-green-900 dark:hover:text-green-800 transition"
          >
            Contests
          </Link>
          <Link
            to="/discuss"
            className="hover:text-green-900 dark:hover:text-green-800 transition"
          >
            Discuss
          </Link>
          <Link
            to="/leaderboard"
            className="hover:text-green-900 dark:hover:text-green-800 transition"
          >
            Leaderboard
          </Link>
        </nav>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Link
            to="/login"
            className="px-4 py-2 rounded-md text-sm font-medium
                       text-green-950 hover:bg-green-100
                       dark:text-green-50 dark:hover:text-green-700 dark:hover:bg-gray-800 transition"
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
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <nav className="flex flex-col gap-3 p-4 text-gray-700 dark:text-gray-200">
            <Link
              to="/problems"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-950 dark:hover:text-green-800"
            >
              Problems
            </Link>
            <Link
              to="/contests"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-950 dark:hover:text-green-800"
            >
              Contests
            </Link>
            <Link
              to="/discuss"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-950 dark:hover:text-green-800"
            >
              Discuss
            </Link>
            <Link
              to="/leaderboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-950 dark:hover:text-green-800"
            >
              Leaderboard
            </Link>

            <div className="flex items-center gap-3 pt-3">
              <ModeToggle />
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md text-sm font-medium
                           text-green-950 hover:bg-green-100
                           dark:text-green-800 dark:hover:bg-gray-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md text-sm font-medium
                           bg-green-950 text-white hover:bg-green-700"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
