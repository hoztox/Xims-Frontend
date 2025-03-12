import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./secondarysidebar.css";
import DashboardIcon from "../../assets/images/Company-Sidebar/icon1.svg";
import DocumentationIcon from "../../assets/images/Company-Sidebar/icon2.svg";
import TrainingIcon from "../../assets/images/Company-Sidebar/icon3.svg";
import ActionsIcon from "../../assets/images/Company-Sidebar/icon4.svg";
import AuditsIcon from "../../assets/images/Company-Sidebar/icon5.svg";
import CustomerIcon from "../../assets/images/Company-Sidebar/icon6.svg";
import SupplierIcon from "../../assets/images/Company-Sidebar/icon7.svg";
import ComplianceIcon from "../../assets/images/Company-Sidebar/icon8.svg";
import RiskIcon from "../../assets/images/Company-Sidebar/icon9.svg";
import EnergyIcon from "../../assets/images/Company-Sidebar/icon10.svg";
import CorrectionIcon from "../../assets/images/Company-Sidebar/icon11.svg";
import ObjectivesIcon from "../../assets/images/Company-Sidebar/icon12.svg";
import UserIcon from "../../assets/images/Company-Sidebar/icon13.svg";
import ReportsIcon from "../../assets/images/Company-Sidebar/icon14.svg";
import NonConformityIcon from "../../assets/images/Company-Sidebar/icon15.svg";
import AnalysisIcon from "../../assets/images/Company-Sidebar/icon16.svg";
import BackupIcon from "../../assets/images/Company-Sidebar/icon17.svg";
import LogoutIcon from "../../assets/images/Company-Sidebar/icon18.svg";
import { useLocation } from "react-router-dom";

const SecondarySidebar = ({ selectedMenuItem, collapsed }) => {
    const location = useLocation();
    const [activeSubItem, setActiveSubItem] = useState(null);

    // Define menu items for each system
    const systemMenus = {
        QMS: [
            { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/qms/dashboard" },
            { id: "documentation", label: "Documentation", icon: DocumentationIcon, path: "/qms/documentation" },
            { id: "training", label: "Employee Training & Performance", icon: TrainingIcon, path: "/qms/training" },
            { id: "actions", label: "Actions, Meeting and Communication Management", icon: ActionsIcon, path: "/qms/actions" },
            { id: "audits", label: "Audits & Inspections Management", icon: AuditsIcon, path: "/qms/audits" },
            { id: "customer", label: "Customer Management", icon: CustomerIcon, path: "/qms/customer" },
            { id: "supplier", label: "Supplier Management", icon: SupplierIcon, path: "/qms/supplier" },
            { id: "compliance", label: "Compliance, Sustainability & Management of Change", icon: ComplianceIcon, path: "/qms/compliance" },
            { id: "risk", label: "Risk, Opportunities & Incident Management", icon: RiskIcon, path: "/qms/risk" },
            { id: "energy", label: "Energy Management", icon: EnergyIcon, path: "/qms/energy" },
            { id: "correction", label: "Correction Corrective Actions & Preventive Actions", icon: CorrectionIcon, path: "/qms/correction" },
            { id: "objectives", label: "Objectives & Targets", icon: ObjectivesIcon, path: "/qms/objectives" },
            { id: "user", label: "User Management", icon: UserIcon, path: "/qms/user" },
            { id: "reports", label: "Reports & Analysis", icon: ReportsIcon, path: "/qms/reports" },
            { id: "nonconformity", label: "Non Conformity Report Management", icon: NonConformityIcon, path: "/qms/nonconformity" },
            { id: "analysis", label: "Analysis Graph", icon: AnalysisIcon, path: "/qms/analysis" },
            { id: "backup", label: "Backup", icon: BackupIcon, path: "/qms/backup" },
            { id: "logout", label: "Log Out", icon: LogoutIcon, path: "/logout" },
        ],
        // Define menus for other systems
        // EMS: [
        //   { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/ems/dashboard" },
        //   { id: "documentation", label: "Documentation", icon: <DocumentationIcon />, path: "/ems/documentation" },
        //   // Add other EMS specific items here
        // ],
        // OHS: [
        //   { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/ohs/dashboard" },
        //   { id: "documentation", label: "Documentation", icon: <DocumentationIcon />, path: "/ohs/documentation" },
        //   // Add other OHS specific items here
        // ],
        // // Add similar menu structures for EnMS, BMS, AMS, IMS
        // EnMS: [
        //   { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/enms/dashboard" },
        //   { id: "documentation", label: "Documentation", icon: <DocumentationIcon />, path: "/enms/documentation" },
        // ],
        // BMS: [
        //   { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/bms/dashboard" },
        //   { id: "documentation", label: "Documentation", icon: <DocumentationIcon />, path: "/bms/documentation" },
        // ],
        // AMS: [
        //   { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/ams/dashboard" },
        //   { id: "documentation", label: "Documentation", icon: <DocumentationIcon />, path: "/ams/documentation" },
        // ],
        // IMS: [
        //   { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/ims/dashboard" },
        //   { id: "documentation", label: "Documentation", icon: <DocumentationIcon />, path: "/ims/documentation" },
        // ]
    };

    // Get the current menu based on selected system
    const currentMenuItems = systemMenus[selectedMenuItem?.id] || systemMenus.QMS;

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = currentMenuItems.find(item => currentPath.includes(item.path));
        if (activeItem) {
            setActiveSubItem(activeItem.id);
        }
    }, [location.pathname, currentMenuItems, selectedMenuItem]);

    return (
        <div
            className="secondary-sidebar bg-[#1C1C24] text-gray-300 h-full overflow-y-auto transition-all duration-300 ease-in-out border-l border-r border-[#383840]"
            style={{
                width: collapsed ? "73px" : "292px",
            }}
        >
            <div className="py-2">
                {currentMenuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path || "#"}
                        className={`flex items-center justify-start pl-6 py-3 cursor-pointer hover:bg-[#262631] transition-colors
          ${activeSubItem === item.id ? 'text-white bg-[#262631]' : 'text-gray-400'}`}
                        onClick={() => setActiveSubItem(item.id)}
                    >
                        <div className="w-6 h-6 flex items-center justify-center">
                            <img src={item.icon} alt={item.label} className="w-6 h-6" />
                        </div>

                        {!collapsed && (
                            <span className="ml-3 ">{item.label}</span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SecondarySidebar;