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
    const [activeMainItem, setActiveMainItem] = useState(null);
    const [activeSubItem, setActiveSubItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(null);
     
    const systemMenus = {
        QMS: [
            {
                id: "dashboard",
                label: "Dashboard",
                icon: DashboardIcon,
                path: "/company/dashboard",
                hasSubMenu: false
            },
            {
                id: "documentation",
                label: "Documentation",
                icon: DocumentationIcon,
                hasSubMenu: true,
                subMenus: [
                    { id: "doc-templates", label: "Document Templates", path: "/company/documentation/templates" },
                    { id: "doc-records", label: "Records", path: "/company/documentation/records" },
                    { id: "doc-policies", label: "Policies", path: "/company/documentation/policies" }
                ]
            },
            {
                id: "training",
                label: "Employee Training & Performance",
                icon: TrainingIcon,
                
            },
            {
                id: "actions",
                label: "Actions, Meeting and Communication Management",
                icon: ActionsIcon,

            },
            {
                id: "audits",
                label: "Audits & Inspections Management",
                icon: AuditsIcon,

            },
            {
                id: "customer",
                label: "Customer Management",
                icon: CustomerIcon,

            },
            {
                id: "supplier",
                label: "Supplier Management",
                icon: SupplierIcon,

            },
            {
                id: "compliance",
                label: "Compliance, Sustainability & Management of Change",
                icon: ComplianceIcon,

            },
            {
                id: "risk",
                label: "Risk & Opportunities Management",
                icon: RiskIcon,

            },
            {
                id: "energy",
                label: "Energy Management",
                icon: EnergyIcon,

            },
            {
                id: "correction",
                label: "Correction Corrective Actions & Preventive Actions",
                icon: CorrectionIcon,

            },
            {
                id: "objectives",
                label: "Objectives & Targets",
                icon: ObjectivesIcon,

            },
            {
                id: "user",
                label: "User Management",
                icon: UserIcon,

            },
            {
                id: "nonconformity",
                label: "Non Conformity Report Management",
                icon: NonConformityIcon,

            },
            {
                id: "reports",
                label: "Reports & Analysis",
                icon: ReportsIcon,

            },
             
            {
                id: "backup",
                label: "Backup",
                icon: BackupIcon,
                path: "/company/backup",
            },
            { id: "logout", label: "Log Out", icon: LogoutIcon, path: "/logout" },
        ],
    };

    
    const currentMenuItems = systemMenus[selectedMenuItem?.id] || systemMenus.QMS;

    useEffect(() => {
        const currentPath = location.pathname;

        // Check if the current path matches any main menu path
        const mainMenuItem = currentMenuItems.find(item => item.path && currentPath.includes(item.path));
        
        if (mainMenuItem) {
            setActiveMainItem(mainMenuItem.id);
            setActiveSubItem(null);
            return;
        }

        // Check if the current path matches any submenu path
        for (const item of currentMenuItems) {
            if (item.hasSubMenu && item.subMenus) {
                const subMenuItem = item.subMenus.find(subItem => subItem.path && currentPath.includes(subItem.path));
                
                if (subMenuItem) {
                    setActiveMainItem(item.id); // Mark "Documentation" active
                    setActiveSubItem(subMenuItem.id);
                    return;
                }
            }
        }

        // Default to first item if no match
        if (!activeMainItem && currentMenuItems.length > 0) {
            setActiveMainItem(currentMenuItems[0].id);
        }
    }, [location.pathname, currentMenuItems, selectedMenuItem, activeMainItem]);

    // Toggle submenu expansion
    const toggleSubMenu = (itemId) => {
        setExpandedMenu(expandedMenu === itemId ? null : itemId);
    };

    // Handle menu item click
    const handleMenuItemClick = (item) => {
        setActiveMainItem(item.id);
        if (item.hasSubMenu) {
            toggleSubMenu(item.id);
        } else {
            setActiveSubItem(null);
            setExpandedMenu(null);
        }
    };

    // Handle submenu item click
    const handleSubMenuItemClick = (mainItemId, subItemId, event) => {
        event.stopPropagation();
        setActiveMainItem(mainItemId);
        setActiveSubItem(subItemId);
        setExpandedMenu(null);
    };

    // Helper function to determine if a menu item should be displayed as active
    const isMenuItemActive = (item) => {
        if (item.hasSubMenu) {
            return activeMainItem === item.id || expandedMenu === item.id || (item.subMenus && item.subMenus.some(sub => sub.id === activeSubItem));
        } else {
            return activeMainItem === item.id;
        }
    };

    // Get current expanded menu
    const getExpandedMenuDetails = () => {
        if (!expandedMenu) return null;
        
        const menuItem = currentMenuItems.find(item => item.id === expandedMenu);
        if (!menuItem || !menuItem.hasSubMenu) return null;
        
        return menuItem;
    };

    const expandedMenuDetails = getExpandedMenuDetails();

    return (
        <div className="relative">
           <div
                className="secondary-sidebar bg-[#1C1C24] text-[#5B5B5B] h-full overflow-y-auto transition-all duration-300 border-l border-r border-[#383840]"
                style={{ width: collapsed ? "73px" : "292px" }}
            >
                <div className="py-5">
                    {currentMenuItems.map((item) => (
                        <div key={item.id}>
                            {item.hasSubMenu ? (
                                <div
                                    className={`flex items-center justify-between pl-5 pr-2 py-3 cursor-pointer transition-all duration-300 second-sidebar ${expandedMenu === item.id ? 'submenu-active' : ''}`}
                                    style={{
                                        borderLeft: isMenuItemActive(item) ? `2px solid ${selectedMenuItem?.borderColor}` : "none",
                                        backgroundColor: isMenuItemActive(item) ? `${selectedMenuItem?.borderColor}15` : "transparent",
                                        color: isMenuItemActive(item) || hoveredItem === item.id ? "#FFFFFF" : "#5B5B5B",
                                    }}
                                    onClick={() => handleMenuItemClick(item)}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className="flex items-center">
                                        <img src={item.icon} alt={item.label} className="w-5 h-5" />
                                        {!collapsed && <span className="ml-3">{item.label}</span>}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to={item.path || "#"}
                                    className="flex items-center justify-between pl-5 pr-2 py-3 cursor-pointer transition-all duration-300 second-sidebar"
                                    style={{
                                        borderLeft: isMenuItemActive(item) ? `2px solid ${selectedMenuItem?.borderColor}` : "none",
                                        backgroundColor: isMenuItemActive(item) ? `${selectedMenuItem?.borderColor}15` : "transparent",
                                        color: isMenuItemActive(item) || hoveredItem === item.id ? "#FFFFFF" : "#5B5B5B",
                                    }}
                                    onClick={() => handleMenuItemClick(item)}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className="flex items-center">
                                        <img src={item.icon} alt={item.label} className="w-5 h-5" />
                                        {!collapsed && <span className="ml-3">{item.label}</span>}
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating submenu panel */}
            {!collapsed && expandedMenuDetails && (
                <div 
                    className="absolute top-[10%] left-[100%] z-10 bg-[#26262F]  min-w-[220px] py-2 px-1"
                >
                    <div className="p-2 mb-2 border-b border-[#383840] text-white">
                        {expandedMenuDetails.label}
                    </div>
                    {expandedMenuDetails.subMenus.map((subItem) => (
                        <Link
                            key={subItem.id}
                            to={subItem.path}
                            className="flex items-center py-2 px-3 my-1 rounded-md transition-all duration-300 hover:bg-[#383840]"
                            style={{
                                backgroundColor:
                                    activeMainItem === expandedMenuDetails.id && activeSubItem === subItem.id
                                        ? `${selectedMenuItem?.borderColor}25`
                                        : "transparent",
                                color: activeMainItem === expandedMenuDetails.id && activeSubItem === subItem.id
                                    ? "#FFFFFF"
                                    : "#8A8A8F",
                            }}
                            onClick={(e) => handleSubMenuItemClick(expandedMenuDetails.id, subItem.id, e)}
                        >
                            <div 
                                className="w-2 h-2 rounded-full mr-2" 
                                style={{
                                    backgroundColor: activeMainItem === expandedMenuDetails.id && activeSubItem === subItem.id
                                        ? selectedMenuItem?.borderColor
                                        : "#8A8A8F",
                                }}
                            />
                            <span className="text-sm">{subItem.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SecondarySidebar;