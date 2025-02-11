import React from 'react'
import { Bell, Settings, Search } from "lucide-react";
import hand from "../../assets/images/Company-Navbar/hand.png";
import bell from "../../assets/images/Company-Navbar/bell.svg";
import settings from "../../assets/images/Company-Navbar/settings.svg";
import profile from "../../assets/images/Company-Navbar/profile.svg";
import "./companynavbar.css";

const CompanyNavbar = () => {
  return (
    <nav className="flex items-center  bg-[#13131A] h-[88px] px-5">
      {/* Left Section */}
      <div className='flex justify-between w-full border-b border-[#383840] h-[88px]'>
        <div className="flex items-center space-x-3">
          <p className="text-1">Welcome Back,<br />
            <span className="text-2">Alimuhammad</span>
          </p>
          <img src={hand} alt="" />
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
          <div className='bell-icon flex justify-center items-center cursor-pointer'>
            <img src={bell} alt="bell icon" className='w-[20px] h-[20px]'/>
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
              <span className="text-[white] text-3">Hello, alimuhammadtn</span>
              <span className="text-[#6D6D6D] text-4">example@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CompanyNavbar
