import React from 'react';
import { Outlet } from 'react-router-dom';
import CompanySidebar from '../components/Company_Sidebar/CompanySidebar';
import CompanyNavbar from '../components/Company_Navbar/CompanyNavbar';

const CompanyLayout = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Full-width Navbar */}
            <CompanyNavbar />
            
            {/* Main Content Area with Sidebar Below Navbar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar on the Left */}
                <CompanySidebar />
                
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#13131A]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default CompanyLayout;