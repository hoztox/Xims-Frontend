import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CompanySidebar from '../components/Company_Sidebar/CompanySidebar';
import CompanyNavbar from '../components/Company_Navbar/CompanyNavbar';

const CompanyLayout = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState({
        id: "QMS",
        label: "Quality Management System",
        borderColor: "#858585",
    });

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Navbar with Dynamic Menu Heading */}
            <CompanyNavbar selectedMenuItem={selectedMenuItem} />
            
            {/* Sidebar and Main Content */}
            <div className="flex flex-1 overflow-hidden">
                <CompanySidebar setSelectedMenuItem={setSelectedMenuItem} />
                
                <div className="flex-1 overflow-y-auto p-4 bg-[#13131A]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default CompanyLayout;
