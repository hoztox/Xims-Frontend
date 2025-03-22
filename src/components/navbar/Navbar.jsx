import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../ThemeContext";
import "./navbar.css";
import bell from "../../assets/images/Navbar/bell.svg";
import profile from "../../assets/images/Navbar/profile.svg";
import logo from "../../assets/images/logo.svg";
import dashboardicon from "../../assets/images/Sidebar/dashboard.svg";
import { useNavigate } from "react-router-dom";
import companies from "../../assets/images/Navbar/company.svg";
import subscribers from "../../assets/images/Navbar/subscribers.svg";
import subscriptions from "../../assets/images/Navbar/subscription.svg";
import changepswd from "../../assets/images/Navbar/changepaswd.svg";
import logout from "../../assets/images/Navbar/logout.svg";
import dropdownicon from "../../assets/images/Navbar/dropdown.svg";
import closeIcon from "../../assets/images/Navbar/closeicon.svg";
import menuicons from "../../assets/images/Navbar/menu.svg";
import navfooter from "../../assets/images/Navbar/navfooter.svg";
import sunIcon from "../../assets/images/Navbar/sun.svg";
import moonIcon from "../../assets/images/Navbar/moon.svg";
import { BASE_URL } from "../../Utils/Config";
import axios from "axios";
import AdminProfilePhotoModal from "./AdminProfilePhotoModal"; // Import the AdminProfilePhotoModal component

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSubscribersOpen, setIsSubscribersOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  // State for profile photo modal
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(profile); // Default to the imported profile

  // Handle outside click to close notification dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle outside click to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/admins-detail/`);
        console.log('Admin Details:', response.data);
       
        if (response.data && response.data.length > 0) {
          setUserEmail(response.data[0]?.email || "");
          // If the API returns a profile photo URL, update the state
          if (response.data[0]?.profile_photo) {
            setProfilePhoto(response.data[0].profile_photo);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, []);
  
  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/notifications/`);
        setNotifications(response.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([
          { id: 1, message: "New company registered", isRead: false, timestamp: "2024-03-22T10:30:00Z" },
          { id: 2, message: "Subscription plan expired for XYZ Corp", isRead: false, timestamp: "2024-03-21T15:45:00Z" },
          { id: 3, message: "New subscriber added", isRead: true, timestamp: "2024-03-20T09:15:00Z" }
        ]);
      }
    };
    
    fetchNotifications();
    
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false);
  };
  
  const toggleDropdowns = () => {
    setIsSubscribersOpen((prev) => !prev);
    setIsSubscriptionOpen(false);
  };

  const toggleDropdownsubscription = () => {
    setIsSubscriptionOpen((prev) => !prev);
    setIsSubscribersOpen(false);
  };

  const markNotificationAsRead = async (id) => {
    try {
      await axios.put(`${BASE_URL}/notifications/${id}/read/`);
      
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    }
  };
  
  const markAllNotificationsAsRead = async () => {
    try {
      await axios.put(`${BASE_URL}/notifications/read-all/`);
      
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    }
  };
  
  const handleNotificationClick = (id, link) => {
    markNotificationAsRead(id);
    setIsNotificationOpen(false);
    if (link) navigate(link);
  };

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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken");
    localStorage.removeItem('logoutTime');
    navigate("/");
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
  };
  
  // Open the profile photo modal
  const handleChangeProfilePhoto = () => {
    setIsPhotoModalOpen(true);
    setIsDropdownOpen(false); // Close the dropdown when opening the modal
  };
  
  // Handle photo upload success
  const handlePhotoUploadSuccess = (newPhotoUrl) => {
    setProfilePhoto(newPhotoUrl);
    // Optionally refetch user details to ensure sync with backend
    fetchUserDetails();
  };
  
  // Close the photo modal
  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };
  
  // Fetch user details function for reuse
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/admins-detail/`);
      
      if (response.data && response.data.length > 0) {
        setUserEmail(response.data[0]?.email || "");
        // If the API returns a profile photo URL, update the state
        if (response.data[0]?.profile_photo) {
          setProfilePhoto(response.data[0].profile_photo);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleItemClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  const handleThemeToggle = () => {
    setIsRotating(true);
    toggleTheme();
  };

  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => {
        setIsRotating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isRotating]);

  const handleDashboard = () => {
    navigate("/admin/dashboard");
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div
      className={`navbar h-20 flex items-center justify-between relative ${theme}`}
    >
      {/* Left Section */}
      <div className="flex flex-col -space-y-1">
        <span className="text-[#677487] span1">Welcome Back,</span>
        <span
          className={`span2 ${
            theme === "dark" ? "dark" : "light"
          } duration-100`}
        >
          Logged in as Super Admin
        </span>
        <img src={logo} alt="" className="navlogo" onClick={handleDashboard} />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 icons justify-end">
        <button
          aria-label="Toggle Theme"
          className={`icon-button rotate outline-none toggle-theme-btn ${
            theme === "dark" ? "dark" : "light"
          }`}
          onClick={handleThemeToggle}
        >
          <img
            src={theme === "dark" ? sunIcon : moonIcon}
            alt="Theme Icon"
            className={`theme-icon ${isRotating ? "rotate" : ""}`}
          />
        </button>
        
        {/* Notification Bell with Badge */}
        <div className="relative" ref={notificationRef}>
          <button
            aria-label="Notifications"
            className={`icon-button bellicon ${
              theme === "dark" ? "dark" : "light"
            } duration-200 relative`}
            onClick={toggleNotifications}
          >
            <img src={bell} alt="bell icon" className="bellimg" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {/* Notification Dropdown */}
          <div
            className={`notification-dropdown absolute right-0 mt-2 shadow-lg rounded-lg w-72 z-10 ${
              isNotificationOpen ? "" : "hidden"
            } ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            <div className="p-3 border-b border-[#343434] flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  className="text-xs text-blue-500 hover:text-blue-700"
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
                    className={`p-3 border-b border-[#343434] hover:bg-gray-700 cursor-pointer ${
                      notification.isRead 
                        ? theme === "dark" ? "text-gray-400" : "text-gray-600" 
                        : theme === "dark" ? "bg-gray-700" : "bg-blue-50"
                    } ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
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
            
            <div className="p-2 text-center border-t border-[#343434]">
              <button 
                className="text-sm text-blue-500 hover:underline"
                onClick={() => {
                  navigate("/admin/all-notifications");
                  setIsNotificationOpen(false);
                }}
              >
                View all notifications
              </button>
            </div>
          </div>
        </div>
        
        <div
          className={`divider ${
            theme === "dark" ? "dark" : "light"
          } duration-100`}
        />

        <div className="relative">
          <div
            className="flex items-center lg:space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={profilePhoto}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full profileicon object-cover"
            />
            <button
              aria-label="Dashboard"
              className={`dashboardicon ${
                theme === "dark" ? "dark" : "light"
              } ${isDropdownOpen ? "rotate" : ""}`}
            >
              <img
                src={menuicons}
                alt="dashboard icon"
                className="imgdashicon"
              />
            </button>

            <div className="lg:flex flex-col -space-y-1 adminname navbaritem">
              <span
                className={`span3 ${
                  theme === "dark" ? "dark" : "light"
                } duration-100`}
              >
                Hello, super admin
              </span>
              <span className="text-[#677487] span4">{userEmail}</span>
            </div>
          </div>

          <div
            ref={dropdownRef}
            className={`dropdown-menu absolute right-0 mt-2 shadow-lg rounded-lg w-56 ${
              isDropdownOpen ? "show" : ""
            } ${theme === "dark" ? "dark" : "light"}`}
          >
            <ul className="py-2 changpswdlogout">
              {/* Profile Photo Section */}
              <li className="px-4 py-4 text-center border-b border-[#343434]">
                <div className="flex flex-col items-center">
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mb-2 border-2 border-gray-200 object-cover"
                  />
                  <button 
                    className="text-sm text-[#1E4DA1] hover:text-[#1f3c6e] mt-1 mb-2"
                    onClick={handleChangeProfilePhoto}
                  >
                    Change Profile Photo
                  </button>
                </div>
              </li>
              
              <li
                className="px-4 py-2 cursor-pointer text-sm chngepaswd md:flex md:gap-4 mt-2"
                onClick={handleChangePassword}
              >
                <img src={changepswd} alt="" className="desktopchangepswdimg" />
                Change Password
              </li>
              <li
                className="px-4 py-2 cursor-pointer text-sm logoutbtn md:flex md:gap-5"
                onClick={handleLogout}
              >
                <img src={logout} alt="" className="desktoplogoutimg" />
                Logout
              </li>
            </ul>

            <ul className="pb-2 sidebarmenus flex flex-col">
              <li className="flex justify-end items-center pb-2">
                <button
                  className="close-dropdown-btn"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <img
                    src={closeIcon}
                    alt="Close Dropdown"
                    className="w-4 h-4 closeicon"
                  />
                </button>
              </li>
              <div className="menubars">
                <li
                  className={`flex cursor-pointer text-sm gap-5 sidebarmenustext py-8 ${
                    activeMenu === "Dashboard" ? "active" : ""
                  }`}
                  onClick={() => {
                    handleItemClick("/admin/dashboard");
                    handleMenuClick("Dashboard");
                  }}
                >
                  <img src={dashboardicon} alt="" className="dropiconsmenu" />
                  Dashboard
                </li>
                <li
                  className={`flex  cursor-pointer text-sm gap-5 sidebarmenustext  py-8 ${
                    activeMenu === "Companies" ? "active" : ""
                  }`}
                  onClick={() => {
                    handleItemClick("/admin/companies");
                    handleMenuClick("Companies");
                  }}
                >
                  <img src={companies} alt="" className="dropiconsmenu" />
                  Companies
                </li>
                <li
                  className={`flex cursor-pointer text-sm gap-5 sidebarmenustext py-8 items-center ${
                    isSubscribersOpen ? "subscribers-open" : ""
                  } ${activeMenu === "Subscribers" ? "active" : ""}`}
                  onClick={() => {
                    toggleDropdowns();
                    handleMenuClick("Subscribers");
                  }}
                >
                  <img src={subscribers} alt="" className="dropiconsmenu" />
                  Subscribers
                  <img
                    src={dropdownicon}
                    alt="Dropdown Icon"
                    className={`transition-transform duration-300 navdropicon ml-auto ${
                      isSubscribersOpen ? "rotate-180" : ""
                    }`}
                  />
                </li>
                {isSubscribersOpen && (
                  <ul
                    className={`pl-[60px] subscriber-dropdown space-y-5 pb-5 dropdown-content ${
                      isSubscribersOpen ? "show" : ""
                    }`}
                    style={{ listStyleType: "disc" }}
                  >
                    <li
                      className={`cursor-pointer text-sm sidebarmenustexts ${
                        activeMenu === "add-Subscriberr" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleItemClick("/admin/add-subscriber");
                        handleMenuClick("add-Subscriberr");
                      }}
                    >
                      Add Subscribers
                    </li>
                    <li
                      className={`cursor-pointer text-sm sidebarmenustexts ${
                        activeMenu === "manage-Subscriberr" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleItemClick("/admin/manage-subscriber");
                        handleMenuClick("manage-Subscriberr");
                      }}
                    >
                      Manage Subscribers
                    </li>
                  </ul>
                )}

                <li
                  className={`flex cursor-pointer text-sm gap-5 sidebarmenustext py-8 items-center ${
                    isSubscriptionOpen ? "subscriptions-open" : ""
                  } ${activeMenu === "Subscriptions" ? "active" : ""}`}
                  onClick={() => {
                    toggleDropdownsubscription();
                    handleMenuClick("Subscriptions");
                  }}
                >
                  <img src={subscriptions} alt="" className="dropiconsmenu" />
                  Subscriptions
                  <img
                    src={dropdownicon}
                    alt="Dropdown Icon"
                    className={`transition-transform duration-300 navdropicon ml-auto ${
                      isSubscriptionOpen ? "rotate-180" : ""
                    }`}
                  />
                </li>
                {isSubscriptionOpen && (
                  <ul
                    className={`pl-[60px] subscription-dropdown space-y-5 pb-5 dropdown-content ${
                      isSubscriptionOpen ? "show" : ""
                    }`}
                    style={{ listStyleType: "disc" }}
                  >
                    <li
                      className={`cursor-pointer text-sm sidebarmenustexts ${
                        activeMenu === "add-subscriptionn" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleItemClick("/admin/add-subscription-plan");
                        handleMenuClick("add-subscriptionn");
                      }}
                    >
                      Add Subscription Plan
                    </li>
                    <li
                      className={`cursor-pointer text-sm sidebarmenustexts ${
                        activeMenu === "manage-subscriptionn" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleItemClick("/admin/manage-subscription");
                        handleMenuClick("manage-subscriptionn");
                      }}
                    >
                      Manage Subscription
                    </li>
                  </ul>
                )}

                <li
                  className="flex cursor-pointer text-sm gap-5 sidebarmenustext py-8"
                  onClick={handleChangePassword}
                >
                  <img src={changepswd} alt="" className="dropiconsmenu" />
                  Change Password
                </li>
                <li
                  className="flex  cursor-pointer text-sm gap-5 sidebarmenustext py-8"
                  onClick={handleLogout}
                >
                  <img src={logout} alt="" className="dropiconsmenu" />
                  Logout
                </li>
              </div>
            </ul>
            <div className="navfooters">
              <img src={navfooter} alt="Footer logo" />
              <p className="navfooter">© 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Photo Modal */}
      <AdminProfilePhotoModal 
        isOpen={isPhotoModalOpen}
        onClose={handleClosePhotoModal}
        onSuccess={handlePhotoUploadSuccess}
        currentPhoto={profilePhoto}
      />
    </div>
  );
};

export default Navbar;