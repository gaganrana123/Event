import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Sun,
  Moon,
  Plus,
  Menu,
  Home,
  Calendar,
  Phone,
  Info,
  Image
} from 'lucide-react';

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const themeClasses = {
    nav: isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    button: isDarkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-purple-500 hover:bg-purple-600',
    input: isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white/50 border-gray-200'
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/loginsignup';
  };

  const navItems = (
    <>
      <li>
        <Link to="/" className={`flex items-center gap-2 ${themeClasses.textMuted}`}>
          <Home className="h-4 w-4" />
          Home
        </Link>
      </li>
      <li>
        <Link to="/search-event" className={`flex items-center gap-2 ${themeClasses.textMuted}`}>
          <Calendar className="h-4 w-4" />
          Event
        </Link>
      </li>
      <li>
        <Link to="/contact" className={`flex items-center gap-2 ${themeClasses.textMuted}`}>
          <Phone className="h-4 w-4" />
          Contact
        </Link>
      </li>
      <li>
        <Link to="/about" className={`flex items-center gap-2 ${themeClasses.textMuted}`}>
          <Info className="h-4 w-4" />
          About
        </Link>
      </li>
      {!isAuthenticated && (
        <li>
          <Link
            to="/loginsignup"
            className={`px-4 py-2 rounded-full text-white ${themeClasses.button}`}
          >
            Login
          </Link>
        </li>
      )}
    </>
  );

  const isAdminOrOrgPath = location.pathname.startsWith("/admindb") || 
                          location.pathname.startsWith("/orgdb");

  if (isAdminOrOrgPath) {
    return null;
  }

  return (
    <nav className={`fixed w-full top-0 z-50 ${themeClasses.nav} border-b backdrop-blur-lg ${
      sticky ? "shadow-md" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="navbar">
          <div className="navbar-start flex items-center">
            <div className="dropdown lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <Menu className="h-5 w-5" />
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {navItems}
              </ul>
            </div>
            <Link to="/" className="navbar-center flex justify-start items-center">
              <div className="flex items-center gap-2 text-xl font-bold">
                <Image className="h-8 w-8" />
                <span className={themeClasses.text}>EventA</span>
              </div>
            </Link>
          </div>
          <div className="navbar-end space-x-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {userRole === 'Organizer' && (
                  <Link to="/create-event" className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-full text-white ${themeClasses.button}`}>
                    <Plus className="h-4 w-4" />
                    <span>Create Event</span>
                  </Link>
                )}
                <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Bell className={`h-5 w-5 ${themeClasses.textMuted}`} />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  {navItems}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
