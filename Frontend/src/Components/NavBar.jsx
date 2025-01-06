import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import eventA from "../assets/images/eventA.png";
import { useTheme } from '../context/ThemeContext';
import { jwtDecode } from "jwt-decode";
import { 
  Bell, User, LogOut, Settings, ChevronDown,
  Sun, Moon, Plus, Menu, Home, Phone, Info,
  LayoutDashboard, Calendar, BarChart3, HelpCircle, List
} from 'lucide-react';

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useTheme();
  
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const notifications = [
    { id: 1, message: "New event registration", time: "2 mins ago" },
    { id: 2, message: "Payment received", time: "1 hour ago" },
    { id: 3, message: "Event reminder", time: "2 hours ago" },
  ];

  const tabs = [
    { label: "Overview", icon: BarChart3 },
    { label: "Create Event", icon: Plus },
    { label: "My Events", icon: List },
    { label: "Settings", icon: Settings },
    { label: "Help", icon: HelpCircle },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const decodedToken = jwtDecode(isAuthenticated);
        setUser(decodedToken.user);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/loginsignup';
  };

  // Regular NavBar Component
  const RegularNavBar = () => (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      sticky 
        ? (isDarkMode ? 'bg-gray-900/95' : 'bg-white/95') 
        : (isDarkMode ? 'bg-gray-900' : 'bg-white')
    } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={eventA} alt="logo" className={`h-12 w-auto ${isDarkMode ? 'invert' : ''}`} />
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center">
              <ul className="flex items-center gap-6">
                <li>
                  <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/event" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Calendar className="h-4 w-4" />
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Phone className="h-4 w-4" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Info className="h-4 w-4" />
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <Link
              to="/loginsignup"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // OrganizerDashboard NavBar Component
  const OrganizerNavBar = () => (
    <div className="flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg h-screen fixed transition-all`}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-2xl font-semibold transition-all ${isSidebarOpen ? "block" : "hidden"}`}>
            Event<span className="text-blue-400">A</span>
          </h1>
          <Menu onClick={() => setSidebarOpen(!isSidebarOpen)} className="cursor-pointer" />
        </div>
        <ul className="space-y-4 mt-8">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={`flex items-center space-x-3 px-6 py-2 cursor-pointer ${
                activeTab === tab.label ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              <tab.icon className="w-5 h-5" />
              <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{tab.label}</span>
            </li>
          ))}
          <li
            className="flex items-center space-x-3 px-6 py-2 cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Header */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-semibold">EventA Organizer Dashboard</h1>
              
              {/* Right side icons */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setIsProfileOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full relative"
                  >
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="px-4 py-2 hover:bg-gray-50">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setShowNotifications(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.fullname?.split(' ').map(name => name[0]).join('') || 'U'}
                      </span>
                    </div>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Don't render anything on these paths
  if (location.pathname.startsWith("/admindb")) {
    return null;
  }

  // Render the appropriate navigation based on authentication and role
  if (isAuthenticated && userRole === 'Organizer') {
    return <OrganizerNavBar />;
  }

  return <RegularNavBar />;
};

export default NavBar;