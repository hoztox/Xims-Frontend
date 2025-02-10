import React from 'react'
import { Outlet } from "react-router-dom";
import CompanySidebar from '../components/Company_Sidebar/CompanySidebar';
import CompanyNavbar from '../components/Company_Navbar/CompanyNavbar'

const CompanyLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <CompanySidebar />
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <CompanyNavbar />
                {/* Main Content */}
                <div className='flex-1 overflow-y-auto p-4 bg-[#13131A]'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default CompanyLayout
