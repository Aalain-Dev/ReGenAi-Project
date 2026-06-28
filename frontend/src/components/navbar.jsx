import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/auth.hooks";

const navLinks = [
  { to: "/dashboard/home", label: "Home", end: true },
  { to: "/dashboard/reports", label: "Reports" },
];

const linkClass = ({ isActive }) =>
  isActive
    ? "text-[#006A61] font-bold underline pb-1"
    : "text-gray-700 hover:text-[#006A61] transition-colors";

const Navbar = () => {
  const { user, handlelogout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false); // mobile nav drawer
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown
  const profileRef = useRef(null);

  const username = user?.username || "User";
  const email = user?.email || "";
  const initial = username.charAt(0).toUpperCase();

  // Close the profile dropdown when clicking anywhere outside it.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = async () => {
    setProfileOpen(false);
    setMenuOpen(false);
    await handlelogout(); // clears the session + local user state
    navigate("/", { replace: true });
  };

  return (
    <nav className="px-4 sm:px-8 py-4 shadow-lg pb-3 relative bg-white">
      <div className="mx-auto flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold">SkillGrowth</h1>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side: profile (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-3">
          {/* Profile dropdown — desktop only */}
          <div className="relative hidden md:block" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#006A61] text-sm font-semibold text-white transition hover:bg-[#00554e] focus:outline-none focus:ring-2 focus:ring-[#006A61]/40 cursor-pointer"
              aria-haspopup="true"
              aria-expanded={profileOpen}
              aria-label="Open profile menu"
            >
              {initial}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {username}
                  </p>
                  {email && (
                    <p className="text-xs text-gray-500 truncate">{email}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center text-gray-700 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden mt-4 border-t border-gray-100 pt-4 flex flex-col gap-1">
          {/* Profile summary */}
          <div className="flex items-center gap-3 px-1 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#006A61] text-sm font-semibold text-white">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {username}
              </p>
              {email && (
                <p className="text-xs text-gray-500 truncate">{email}</p>
              )}
            </div>
          </div>

          {/* Nav links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-2 py-2 rounded-lg ${
                  isActive
                    ? "text-[#006A61] font-bold bg-[#006A61]/5"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="mt-1 flex items-center gap-2 px-2 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer text-left"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
