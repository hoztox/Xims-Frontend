import React, { useState } from 'react';
import { Search } from "lucide-react";
import logo from "../../assets/images/Company-Navbar/xims-logo.svg";
import menu from "../../assets/images/Company-Navbar/close-icon.svg";
import bell from "../../assets/images/Company-Navbar/bell.svg";
import settings from "../../assets/images/Company-Navbar/settings.svg";
import profile from "../../assets/images/Company-Navbar/profile.svg";
import "./companynavbar.css"; // Import external CSS
import { useNavigate } from 'react-router-dom';

const CompanyNavbar = ({ selectedMenuItem, toggleSidebar, collapsed, setCollapsed }) => {
  const navigate = useNavigate();

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

  return (
    <nav className="flex items-center bg-[#13131A] h-[88px] company-navbar">
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

          <div className="bell-icon flex justify-center items-center cursor-pointer">
            <img src={bell} alt="bell icon" className="w-[20px] h-[20px]" />
          </div>
          <div className="settings-icon flex justify-center items-center cursor-pointer">
            <img src={settings} alt="settings icon" className="w-[20px] h-[20px]" />
          </div>
          <div className="flex items-center space-x-2 border-l border-[#383840] pl-4">
            <img
              src={profile}
              alt="User"
              className="w-[46px] h-[46px] rounded-full cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-[white] text-1">Hello, alimuhammadtn</span>
              <span className="text-[#6D6D6D] text-2">example@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CompanyNavbar;