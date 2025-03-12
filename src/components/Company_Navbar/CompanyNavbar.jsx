import React, { useEffect, useState } from 'react'
import { Search } from "lucide-react";
import logo from "../../assets/images/Company-Navbar/xims-logo.svg";
import menu from "../../assets/images/Company-Navbar/close-icon.svg"
// import sunIcon from "../../assets/images/Company-Navbar/sun.svg"
// import moonIcon from "../../assets/images/Company-Navbar/moon.svg"
import bell from "../../assets/images/Company-Navbar/bell.svg";
import settings from "../../assets/images/Company-Navbar/settings.svg";
import profile from "../../assets/images/Company-Navbar/profile.svg";
import "./companynavbar.css";
// import { useTheme } from '../../ThemeContext';

const CompanyNavbar = () => {
  // const [isRotating, setIsRotating] = useState(false);
  // const { theme, toggleTheme } = useTheme();

  // const handleThemeToggle = () => {
  //   setIsRotating(true);
  //   toggleTheme();
  // };

 
  // useEffect(() => {
  //   if (isRotating) {
  //     const timer = setTimeout(() => {
  //       setIsRotating(false);
  //     }, 600);  
  //     return () => clearTimeout(timer);  
  //   }
  // }, [isRotating]);

  return (
    <nav className={`flex items-center  bg-[#13131A] h-[88px] company-navbar `}>     {/*${theme === "dark" ? "dark" : "light" }}
      {/* Left Section */}
      <div className='flex justify-between w-full border-b border-[#383840] h-[88px] px-5'>
        <div className="flex items-center">
          <button className='mr-[41px]'>
            <img src={logo} alt="Ximspro Logo" />
          </button>

          <button className='close-menu h-[57px] w-[46px] mr-[14px] flex items-center justify-center'>
            <img src={menu} alt="Close Icon" className='w-[18px] h-[18px]' />
          </button>

          <div className='border border-[#38E76C] text-[#38E76C] rounded-[5px] w-[197] h-[57px] px-[22px] py-[21px] flex items-center justify-center'>
            <p className='current-menu '>
              Enviromental<br /> Management System
            </p>
          </div>

        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#13131A] text-gray-300 px-4 py-2 rounded-full outline-none w-64 nav-search"
            />
            <Search className="absolute right-3 top-3 text-[#414345] w-5 h-5" />
          </div>

          {/* Icons & Profile */}
          {/* <div>
            <button
              aria-label="Toggle Theme"
              className={`icon-button rotate outline-none toggle-theme-btn ${theme === "dark" ? "dark" : "light"
                }`}
              onClick={handleThemeToggle}
            >
              <img
                src={theme === "dark" ? sunIcon : moonIcon}
                alt="Theme Icon"
                className={`theme-icon ${isRotating ? "rotate" : ""}`}
              />
            </button>
          </div> */}
          <div className='bell-icon flex justify-center items-center cursor-pointer'>
            <img src={bell} alt="bell icon" className='w-[20px] h-[20px]' />
          </div>
          <div className='settings-icon flex justify-center items-center cursor-pointer'>
            <img src={settings} alt="settings icon" className='w-[20px] h-[20px]' />
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

export default CompanyNavbar
