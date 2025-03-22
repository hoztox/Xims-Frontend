import React, { useEffect, useState, useRef } from 'react';
import { Search } from "lucide-react";
import { useTheme } from "../../ThemeContext";
import logo from "../../assets/images/Company-Navbar/xims-logo.svg";
import menu from "../../assets/images/Company-Navbar/close-icon.svg";
import bell from "../../assets/images/Company-Navbar/bell.svg";
// import settings from "../../assets/images/Company-Navbar/settings.svg";
import profile from "../../assets/images/Company-Navbar/profile.svg";
import sunIcon from "../../assets/images/Navbar/sun.svg"
import moonIcon from "../../assets/images/Navbar/moon.svg"
import changepswd from "../../assets/images/Navbar/changepaswd.svg"
import "./companynavbar.css"; // Import external CSS
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../../Utils/Config";

const CompanyNavbar = ({ selectedMenuItem, toggleSidebar, collapsed, setCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const [isRotating, setIsRotating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownAnimation, setDropdownAnimation] = useState('');
  const dropdownRef = useRef(null);
  
  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationAnimation, setNotificationAnimation] = useState('');
  const notificationRef = useRef(null);
  
  const navigate = useNavigate();

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace with your actual endpoint for notifications
        const response = await axios.get(`${BASE_URL}/company/notifications/`);
        setNotifications(response.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // For demo, set some sample notifications
        setNotifications([
          { id: 1, message: "New task assigned to your team", isRead: false, timestamp: "2024-03-22T10:30:00Z" },
          { id: 2, message: "Environmental report due in 3 days", isRead: false, timestamp: "2024-03-21T15:45:00Z" },
          { id: 3, message: "Compliance check scheduled for next week", isRead: true, timestamp: "2024-03-20T09:15:00Z" }
        ]);
      }
    };
    
    fetchNotifications();
    
    // Poll for notifications every 5 minutes
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    setIsRotating(true);
    toggleTheme();
  };

  // Handle dropdown toggle with animation
  const toggleDropdown = () => {
    if (isDropdownOpen) {
      // Start closing animation
      setDropdownAnimation('animate-fade-out');
      // Actually close the dropdown after animation completes
      setTimeout(() => {
        setIsDropdownOpen(false);
        setDropdownAnimation('');
      }, 300); // Match with CSS animation duration
    } else {
      // Open the dropdown with opening animation
      setIsDropdownOpen(true);
      setDropdownAnimation('animate-fade-in');
    }
  };
  
  // Toggle notification dropdown with animation
  const toggleNotifications = () => {
    if (isNotificationOpen) {
      // Start closing animation
      setNotificationAnimation('animate-fade-out');
      // Actually close the dropdown after animation completes
      setTimeout(() => {
        setIsNotificationOpen(false);
        setNotificationAnimation('');
      }, 300); // Match with CSS animation duration
    } else {
      // Open the dropdown with opening animation
      setIsNotificationOpen(true);
      setNotificationAnimation('animate-fade-in');
    }
  };
  
  // Mark notification as read
  const markNotificationAsRead = async (id) => {
    try {
      // Replace with your actual endpoint for marking notifications as read
      await axios.put(`${BASE_URL}/company/notifications/${id}/read/`);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      // For demo, update state directly
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    }
  };
  
  // Mark all notifications as read
  const markAllNotificationsAsRead = async () => {
    try {
      // Replace with your actual endpoint for marking all notifications as read
      await axios.put(`${BASE_URL}/company/notifications/read-all/`);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      // For demo, update state directly
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    }
  };
  
  // Handle notification click
  const handleNotificationClick = (id, link) => {
    markNotificationAsRead(id);
    
    // Start closing animation
    setNotificationAnimation('animate-fade-out');
    // Actually close the dropdown after animation completes
    setTimeout(() => {
      setIsNotificationOpen(false);
      setNotificationAnimation('');
      if (link) navigate(link);
    }, 300);
  };
  
  // Format notification time
  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  // Handle change profile photo
  // const handleChangeProfilePhoto = () => {
  //   console.log("Change profile photo clicked");
  //   // You could navigate to a profile page or open a modal
  //   toggleDropdown();
  //   // navigate("/company/update-profile");
  // };

  // Handle change password
  const handleChangePassword = () => {
    console.log("Change password clicked");
    toggleDropdown();
    // navigate("/company/change-password");
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        if (isNotificationOpen) {
          toggleNotifications();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);
  
  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isDropdownOpen) {
          toggleDropdown();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => {
        setIsRotating(false);
      }, 600); // Match the duration of the animation
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isRotating]);

  // Handle the toggle with state update
  const handleToggle = () => {
    setCollapsed(!collapsed);
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  const handleLogoClick = () => {
    navigate('/company/dashboard');
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Add these CSS animation classes to your companynavbar.css file
  useEffect(() => {
    // Add animation styles to the stylesheet if they don't exist
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
      }
      
      .animate-fade-in {
        animation: fadeIn 0.3s ease forwards;
      }
      
      .animate-fade-out {
        animation: fadeOut 0.3s ease forwards;
      }
      
      .dropdown-container {
        transform-origin: top center;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      .notification-badge {
        animation: pulse 1.5s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <nav className={`flex items-center bg-[white] h-[88px] company-navbar ${theme}`}>
      {/* Left Section */}
      <div className="flex justify-between w-full border-b border-[#383840] h-[88px] px-5">
        <div className="flex items-center">
          <button
            className="mr-[41px]"
            onClick={handleLogoClick}>
            <img src={logo} alt="Ximspro Logo" />
          </button>

          {/* Close Menu Icon - With rotation animation */}
          <button
            className="close-menu h-[57px] w-[46px] mr-[14px] flex items-center justify-center"
            onClick={handleToggle}
          >
            <img
              src={menu}
              alt="Menu Icon"
              className={`w-[18px] h-[18px] menu-icon ${selectedMenuItem?.id || "default"} transition-transform duration-300 ease-in-out ${!collapsed ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dynamic Title */}
          <div
            className="border rounded-[5px] px-[22px] h-[57px] flex items-center justify-center text-center"
            style={{
              borderColor: selectedMenuItem?.borderColor || "#38E76C",
              color: selectedMenuItem?.borderColor || "#38E76C",
            }}
          >
            <p className="current-menu text-left">
              {selectedMenuItem?.label || "Environmental Management System"}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#13131A] text-gray-300 px-4 py-2 rounded-full outline-none w-64 nav-search"
            />
            <Search className="absolute right-3 top-3 text-[#414345] w-5 h-5" />
          </div>

          <button
            aria-label="Toggle Theme"
            className={`icon-buttons rotates outline-none toggle-theme-btns ${
              theme === "dark" ? "dark" : "light"
            }`}
            onClick={handleThemeToggle}
          >
            <img
              src={theme === "dark" ? sunIcon : moonIcon}
              alt="Theme Icon"
              className={`theme-icons ${isRotating ? "rotates" : ""}`}
            />
          </button>

          {/* Notification bell icon with badge */}
          <div className="bell-icon flex justify-center items-center cursor-pointer relative" ref={notificationRef}>
            <div onClick={toggleNotifications}>
              <img src={bell} alt="bell icon" className="w-[20px] h-[20px]" />
              {unreadCount > 0 && (
                <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center notification-badge
                  ${theme === "dark" ? "text-white" : "text-white"}`}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            
            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div 
                className={`absolute right-0 top-8 shadow-lg rounded-lg w-72 z-50 py-2 dropdown-container ${notificationAnimation}
                  ${theme === "dark" ? "bg-[#1E1E26] text-white" : "bg-white text-[#13131A] border border-gray-200"}`}
              >
                <div className="px-3 py-2 border-b border-[#383840] flex justify-between items-center">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      className={`text-xs hover:underline transition-colors duration-200
                        ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-700"}`}
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border-b border-[#383840] cursor-pointer transition-colors duration-200
                          ${notification.isRead 
                            ? theme === "dark" ? "text-gray-400" : "text-gray-600" 
                            : theme === "dark" ? "bg-[#282836]" : "bg-blue-50"
                          } ${theme === "dark" ? "hover:bg-[#2A2A36]" : "hover:bg-gray-100"}`}
                        onClick={() => handleNotificationClick(notification.id, notification.link)}
                      >
                        <div className="flex items-start">
                          <div className="flex-grow">
                            <p className={`text-sm ${!notification.isRead && "font-semibold"}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatNotificationTime(notification.timestamp)}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <span className="h-2 w-2 bg-blue-500 rounded-full mt-1"></span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="p-2 text-center border-t border-[#383840]">
                  <button 
                    className={`text-sm hover:underline transition-colors duration-200
                      ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-700"}`}
                    onClick={() => {
                      toggleNotifications();
                      setTimeout(() => navigate("/company/all-notifications"), 300);
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile section with dropdown */}
          <div className="flex items-center space-x-2 border-l border-[#383840] pl-4 relative">
            <div onClick={toggleDropdown} className="cursor-pointer">
              <img
                src={profile}
                alt="User"
                className="w-[46px] h-[46px] rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[white] text-1">Hello, alimuhammadtn</span>
              <span className="text-[#6D6D6D] text-2">example@gmail.com</span>
            </div>
            
            {/* Profile Dropdown Menu with Animation */}
            {isDropdownOpen && (
              <div 
                ref={dropdownRef}
                className={`absolute right-0 top-16 shadow-lg rounded-lg w-60 z-50 py-2 dropdown-container ${dropdownAnimation}
                ${theme === "dark" ? "bg-[#1E1E26] text-white" : "bg-white text-[#13131A]"}`}
              >
                {/* Profile Photo Section */}
                {/* <div className="px-4 py-3 border-b border-[#383840] text-center">
                  <div className="flex flex-col items-center">
                    <img
                      src={profile}
                      alt="Profile"
                      className="w-16 h-16 rounded-full mb-2 border-2 border-gray-600"
                    />
                    <button 
                      className="text-sm text-[#1E4DA1] hover:text-[#24447b] mt-1 mb-1 transition-colors duration-200 change-profile"
                      onClick={handleChangeProfilePhoto}
                    >
                      Change Profile Photo
                    </button>
                  </div>
                </div> */}
                
                {/* Menu Options */}
                <ul>
                  <li 
                    className="px-4 py-2 hover:bg-[#2A2A36] cursor-pointer flex items-center gap-3 transition-colors duration-200 cmpy-nav-menu"
                    onClick={handleChangePassword}
                  >
                    <img src={changepswd} alt="Change Password" className='change-pswd-img' />
                    Change Password
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CompanyNavbar;