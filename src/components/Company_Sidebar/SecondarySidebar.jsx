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
    const [expandedMenus, setExpandedMenus] = useState({});
     
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
        const mainMenuItem = currentMenuItems.find(item => 
            item.path && currentPath.includes(item.path));
        
        if (mainMenuItem) {
            setActiveMainItem(mainMenuItem.id);
            setActiveSubItem(null);
            return;
        }
        
        // Check if the current path matches any submenu path
        for (const item of currentMenuItems) {
            if (item.hasSubMenu && item.subMenus) {
                const subMenuItem = item.subMenus.find(subItem => 
                    subItem.path && currentPath.includes(subItem.path));
                
                if (subMenuItem) {
                    setActiveMainItem(item.id);
                    setActiveSubItem(subMenuItem.id);
                    // Auto-expand parent menu
                    setExpandedMenus(prev => ({ ...prev, [item.id]: true }));
                    return;
                }
            }
        }
        
        // Default to first item if no match
        if (!activeMainItem && currentMenuItems.length > 0) {
            setActiveMainItem(currentMenuItems[0].id);
        }
    }, [location.pathname, currentMenuItems, selectedMenuItem]);

    // Toggle submenu expansion
    const toggleSubMenu = (itemId) => {
        // Update expanded menus state
        setExpandedMenus(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    // Handle menu item click
    const handleMenuItemClick = (item) => {
        // Set this item as the active main item
        setActiveMainItem(item.id);
        
        if (item.hasSubMenu) {
            toggleSubMenu(item.id);
            // Don't navigate anywhere if the item has submenus
            return false;
        } else {
            // Clear active submenu when clicking on item without submenu
            setActiveSubItem(null);
            // Clear all expanded submenus when clicking on a regular menu item
            setExpandedMenus({});
            return true; // Allow navigation for items without submenus
        }
    };

    // Handle submenu item click
    const handleSubMenuItemClick = (mainItemId, subItemId, event) => {
        // Stop propagation to prevent parent click handler from firing
        event.stopPropagation();
        setActiveMainItem(mainItemId);
        setActiveSubItem(subItemId);
    };

    // Helper function to determine if a menu item should be displayed as active
    const isMenuItemActive = (item) => {
        if (item.hasSubMenu) {
            // For items with submenus, they're active if they're the active main item or expanded
            return activeMainItem === item.id || expandedMenus[item.id];
        } else {
            // For regular items, they're only active if they're the active main item AND no submenus are expanded
            return activeMainItem === item.id && Object.values(expandedMenus).every(value => !value);
        }
    };

    return (
        <div
            className="secondary-sidebar bg-[#1C1C24] text-[#5B5B5B] h-full overflow-y-auto transition-all duration-300 ease-in-out border-l border-r border-[#383840]"
            style={{
                width: collapsed ? "73px" : "292px",
            }}
        >
            <div className="py-5">
                {currentMenuItems.map((item) => (
                    <div key={item.id}>
                        {/* Main menu item */}
                        {item.hasSubMenu ? (
                            // Clickable div for items with submenus
                            <div
                                className={`flex items-center justify-between pl-5 pr-2 py-3 cursor-pointer transition-all duration-300 second-sidebar`}
                                style={{
                                    borderLeft:
                                        isMenuItemActive(item)
                                            ? `2px solid ${selectedMenuItem?.borderColor}`
                                            : "none",
                                    backgroundColor:
                                        isMenuItemActive(item)
                                            ? `${selectedMenuItem?.borderColor}15`
                                            : "transparent",
                                    color:
                                        isMenuItemActive(item) || hoveredItem === item.id
                                            ? "#FFFFFF"
                                            : "#5B5B5B",
                                }}
                                onClick={() => handleMenuItemClick(item)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="flex items-center">
                                    <div className="w-6 h-6 flex items-center justify-center min-w-6 min-h-6">
                                        <img
                                            src={item.icon}
                                            alt={item.label}
                                            className="w-5 h-5 second-sidebar-icons"
                                            style={{
                                                filter:
                                                    isMenuItemActive(item) || hoveredItem === item.id
                                                        ? "brightness(0) invert(1)"
                                                        : "none",
                                                transition: "filter 0.2s ease-in-out",
                                            }}
                                        />
                                    </div>
                                    {!collapsed && (
                                        <span className="ml-3 second-sidebar-spans">{item.label}</span>
                                    )}
                                </div>
                                {!collapsed && (
                                    <div className="mr-2">
                                        <svg
                                            width="10"
                                            height="6"
                                            viewBox="0 0 10 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{
                                                transform: expandedMenus[item.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s ease-in-out',
                                                filter: isMenuItemActive(item) || hoveredItem === item.id
                                                    ? "brightness(0) invert(1)"
                                                    : "none",
                                            }}
                                        >
                                            <path
                                                d="M1 1L5 5L9 1"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Link for items without submenus
                            <Link
                                to={item.path || "#"}
                                className={`flex items-center justify-between pl-5 pr-2 py-3 cursor-pointer transition-all duration-300 second-sidebar`}
                                style={{
                                    borderLeft:
                                        isMenuItemActive(item)
                                            ? `2px solid ${selectedMenuItem?.borderColor}`
                                            : "none",
                                    backgroundColor:
                                        isMenuItemActive(item)
                                            ? `${selectedMenuItem?.borderColor}15`
                                            : "transparent",
                                    color:
                                        isMenuItemActive(item) || hoveredItem === item.id
                                            ? "#FFFFFF"
                                            : "#5B5B5B",
                                }}
                                onClick={() => handleMenuItemClick(item)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="flex items-center">
                                    <div className="w-6 h-6 flex items-center justify-center min-w-6 min-h-6">
                                        <img
                                            src={item.icon}
                                            alt={item.label}
                                            className="w-5 h-5 second-sidebar-icons"
                                            style={{
                                                filter:
                                                    isMenuItemActive(item) || hoveredItem === item.id
                                                        ? "brightness(0) invert(1)"
                                                        : "none",
                                                transition: "filter 0.2s ease-in-out",
                                            }}
                                        />
                                    </div>
                                    {!collapsed && (
                                        <span className="ml-3 second-sidebar-spans">{item.label}</span>
                                    )}
                                </div>
                            </Link>
                        )}

                        {/* Submenu items */}
                        {!collapsed && item.hasSubMenu && expandedMenus[item.id] && (
                            <div className="submenu-container pl-12 bg-[#26262F]">
                                {item.subMenus.map((subItem) => (
                                    <Link
                                        key={subItem.id}
                                        to={subItem.path}
                                        className={`flex items-center py-2 px-3 my-1 rounded-md transition-all duration-300`}
                                        style={{
                                            backgroundColor:
                                                activeMainItem === item.id && activeSubItem === subItem.id
                                                    ? `${selectedMenuItem?.borderColor}25`
                                                    : "transparent",
                                            color: activeMainItem === item.id && activeSubItem === subItem.id
                                                ? "#FFFFFF"
                                                : "#8A8A8F",
                                        }}
                                        onClick={(e) => handleSubMenuItemClick(item.id, subItem.id, e)}
                                    >
                                        <div className="w-2 h-2 rounded-full mr-2" 
                                            style={{
                                                backgroundColor: activeMainItem === item.id && activeSubItem === subItem.id
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
                ))}
            </div>
        </div>
    );
};

export default SecondarySidebar;