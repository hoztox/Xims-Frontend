import React, { useState, useEffect, useRef } from "react";
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

    // Create a ref to track if we're hovering over the submenu
    const submenuRef = useRef(null);
    const timeoutRef = useRef(null);

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
                    { id: "policy", label: "Policy", path: "" },
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

    // Clean up any timeouts when component unmounts
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Handle menu item click
    const handleMenuItemClick = (item) => {
        setActiveMainItem(item.id);
        if (!item.hasSubMenu) {
            setActiveSubItem(null);
        }
    };

    const handleSubMenuItemClick = (mainItemId, subItemId, event) => {
        event.stopPropagation();
        setActiveMainItem(mainItemId);
        setActiveSubItem(subItemId);
    };

    const isMenuItemActive = (item) => {
        if (item.hasSubMenu) {
            return activeMainItem === item.id || (item.subMenus && item.subMenus.some(sub => sub.id === activeSubItem));
        } else {
            return activeMainItem === item.id;
        }
    };

    const getHoveredMenuDetails = () => {
        if (!hoveredItem) return null;

        const menuItem = currentMenuItems.find(item => item.id === hoveredItem);
        if (!menuItem || !menuItem.hasSubMenu) return null;

        return menuItem;
    };

    const hoveredMenuDetails = getHoveredMenuDetails();

    return (
        <div className="relative">
            <div
                className="secondary-sidebar bg-[#1C1C24] text-[#5B5B5B] h-full overflow-y-auto transition-all border-l border-r border-[#383840]"
                style={{ width: collapsed ? "73px" : "292px" }}
            >
                <div className="py-5">
                    {currentMenuItems.map((item) => (
                        <div key={item.id}>
                            {item.hasSubMenu ? (
                                <div
                                    className={`flex items-center justify-between pl-5 pr-2 py-3 cursor-pointer second-sidebar ${hoveredItem === item.id ? 'text-white' : ''
                                        }`}
                                    onMouseEnter={() => {
                                        if (timeoutRef.current) {
                                            clearTimeout(timeoutRef.current);
                                        }
                                        setHoveredItem(item.id); // Keep hover active
                                    }}
                                    onMouseLeave={() => {
                                        if (!submenuRef.current || !submenuRef.current.matches(":hover")) {
                                            timeoutRef.current = setTimeout(() => {
                                                setHoveredItem(null);
                                            }, 300);
                                        }
                                    }}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={item.icon}
                                            alt={item.label}
                                            className={`w-5 h-5 second-sidebar-icons ${hoveredItem === item.id ? 'filter brightness-0 invert' : ''
                                                }`}
                                        />
                                        {!collapsed && <span className="ml-3 second-sidebar-spans">{item.label}</span>}
                                    </div>
                                </div>

                            ) : (
                                <Link
                                    to={item.path || "#"}
                                    className="flex items-center justify-between pl-5 pr-2 py-3 cursor-pointer second-sidebar"
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
                                        <img
                                            src={item.icon}
                                            alt={item.label}
                                            className={`w-5 h-5 second-sidebar-icons ${isMenuItemActive(item) ? "active-icon" : ""}`}
                                        />
                                        {!collapsed && <span className="ml-3 second-sidebar-spans">{item.label}</span>}
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating submenu panel - now appears on hover */}
            {!collapsed && hoveredMenuDetails && (
                <div
                    ref={submenuRef}
                    className="absolute top-[8%] left-[100%] z-10 bg-[#26262F] min-w-[220px] py-2 px-1"
                    onMouseEnter={() => {
                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                        }
                        setHoveredItem("documentation"); // Keep hover active
                    }}
                    onMouseLeave={() => {
                        timeoutRef.current = setTimeout(() => {
                            setHoveredItem(null);
                        }, 300);
                    }}
                >

                    <div className="p-2 mb-2 border-b border-[#383840] text-white">
                        {hoveredMenuDetails.label}
                    </div>
                    {hoveredMenuDetails.subMenus.map((subItem) => (
                        <Link
                            key={subItem.id}
                            to={subItem.path}
                            className="flex items-center py-2 px-3 my-1 rounded-md transition-all duration-300 hover:bg-[#383840]"
                            style={{
                                backgroundColor:
                                    activeMainItem === hoveredMenuDetails.id && activeSubItem === subItem.id
                                        ? `${selectedMenuItem?.borderColor}25`
                                        : "transparent",
                                color: activeMainItem === hoveredMenuDetails.id && activeSubItem === subItem.id
                                    ? "#FFFFFF"
                                    : "#8A8A8F",
                            }}
                            onClick={(e) => handleSubMenuItemClick(hoveredMenuDetails.id, subItem.id, e)}
                        >
                            <div
                                className="w-2 h-2 rounded-full mr-2"
                                style={{
                                    backgroundColor: activeMainItem === hoveredMenuDetails.id && activeSubItem === subItem.id
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