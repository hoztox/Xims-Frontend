import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./secondarysidebar.css";
import { motion, AnimatePresence } from "framer-motion";

// Import icons
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

// Import submenu components
import DocumentationSubmenu from "../Company_Sidebar/QMS/Documentation/DocumentationSubmenu";
// Other submenu components would be imported here

const SecondarySidebar = ({ selectedMenuItem, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMainItem, setActiveMainItem] = useState("dashboard");
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [currentSubmenu, setCurrentSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState(0);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [manuallyActivated, setManuallyActivated] = useState(false);

  const timeoutRef = useRef(null);
  const submenuRef = useRef(null);
  const menuItemRefs = useRef({});
  const sidebarRef = useRef(null);

  const systemMenus = {
    QMS: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: DashboardIcon,
        path: "/company/dashboard",
        hasSubMenu: false,
      },
      {
        id: "qmsdocumentation",
        label: "Documentation",
        icon: DocumentationIcon,
        hasSubMenu: true,
        submenuType: "qmsdocumentation",
        pathPrefix: "/company/documentation",
      },
      {
        id: "training",
        label: "Employee Training & Performance",
        icon: TrainingIcon,
        hasSubMenu: true,
        submenuType: "training",
        pathPrefix: "/company/training",
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
    EMS: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: DashboardIcon,
        path: "/company/dashboard",
      },
    ],
  };

  const currentMenuItems = systemMenus[selectedMenuItem?.id] || systemMenus.QMS;

  // Improved function to find parent menu item based on path
  const findParentMenuItem = (path) => {
    // First check for exact path matches
    const exactMatch = currentMenuItems.find(
      (item) => item.path && path === item.path
    );
    if (exactMatch) return exactMatch.id;

    // Then check for path prefixes
    for (const item of currentMenuItems) {
      if (item.pathPrefix && path.startsWith(item.pathPrefix)) {
        return item.id;
      }
    }

    // Legacy fallback checks
    if (
      path.includes("/company/documentation") ||
      path.includes("/company/qmsdocumentation")
    ) {
      return "qmsdocumentation";
    }

    if (path.includes("/company/training")) {
      return "training";
    }

    return null;
  };

  // Update active states based on current URL path
  useEffect(() => {
    if (manuallyActivated) {
      // Skip this effect if we've just manually set the active state
      setManuallyActivated(false);
      return;
    }

    const currentPath = location.pathname;
    const parentMenuItem = findParentMenuItem(currentPath);

    if (parentMenuItem) {
      setActiveMainItem(parentMenuItem);

      const pathSegments = currentPath.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];

      // Only set active sub-item if it's not the same as parent menu
      setActiveSubItem(lastSegment !== parentMenuItem ? lastSegment : null);
    } else {
      // If no parent menu is found, reset active submenu
      setActiveSubItem(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    updateSubmenuPosition();

    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener("scroll", updateSubmenuPosition);

      return () => {
        sidebarElement.removeEventListener("scroll", updateSubmenuPosition);
      };
    }
  }, [hoveredMenuItem]);

  const updateSubmenuPosition = () => {
    if (
      hoveredMenuItem &&
      menuItemRefs.current[hoveredMenuItem] &&
      sidebarRef.current
    ) {
      const menuItemElement = menuItemRefs.current[hoveredMenuItem];
      const sidebarElement = sidebarRef.current;
  
      const menuItemRect = menuItemElement.getBoundingClientRect();
      const sidebarRect = sidebarElement.getBoundingClientRect();
  
      let topPosition = menuItemRect.top - sidebarRect.top -65;
  
      setSubmenuPosition(topPosition);
    }
  };
  

  const handleMenuItemMouseEnter = (item) => {
    if (collapsed) return;
  
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  
    setHoveredMenuItem(item.id);
  
    // If the new item doesn't have a submenu, close the existing submenu immediately
    if (!item.hasSubMenu) {
      setShowSubmenu(false);
      setCurrentSubmenu(null);
      return;
    }
  
    // Open submenu if the item has one
    setCurrentSubmenu(item.submenuType);
    setShowSubmenu(true);
    updateSubmenuPosition();
  };
  
  const handleMenuAreaMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setHoveredMenuItem(null);
      setShowSubmenu(false);
    }, 300);
  };

  const handleSubmenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleSubmenuMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setHoveredMenuItem(null);
      setShowSubmenu(false);
    }, 300);
  };

  const handleMenuItemClick = (item) => {
    if (item.hasSubMenu) {
      // Keep parent active only if a submenu is clicked later
      setManuallyActivated(true);
      setShowSubmenu((prev) => (currentSubmenu === item.submenuType ? !prev : true));
      setCurrentSubmenu(item.submenuType);
      return;
    }
  
    // If clicking a main menu without a submenu, deactivate any active submenu
    setActiveMainItem(item.id);
    setActiveSubItem(null); 
    setCurrentSubmenu(null);
    setShowSubmenu(false);
    setManuallyActivated(true);
  
    if (item.path) {
      navigate(item.path);
    }
  };
  

  const handleSubMenuItemClick = (subItemId, path) => {
    setActiveMainItem("qmsdocumentation"); // Always keep 'Documentation' active
    setActiveSubItem(subItemId); // Highlight the clicked submenu item
    setManuallyActivated(true); // Prevent unwanted resets
    if (path) {
      navigate(path);
    }
  };
  
  const isMenuItemActive = (item) => {
    if (item.hasSubMenu && item.id === activeMainItem) {
      return true; // Keep parent menu active when a submenu is active
    }
  
    return !item.hasSubMenu && activeMainItem === item.id;
  };

  const renderSubmenu = () => {
    if (!showSubmenu || collapsed) return null;

    const submenuVariants = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    };

    let submenuContent = null;

    switch (currentSubmenu) {
      case "qmsdocumentation":
        submenuContent = (
          <DocumentationSubmenu
            activeSubItem={activeSubItem}
            handleItemClick={handleSubMenuItemClick}
          />
        );
        break;
      case "training":
        submenuContent = null;
        break;
      default:
        submenuContent = null;
    }

    if (!submenuContent) return null;

    return (
      <motion.div
        ref={submenuRef}
        className="absolute left-full bg-[#2A2A36] border border-[#383840] rounded-r-md shadow-lg -z-10"
        style={{ top: `${submenuPosition}px` }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        variants={submenuVariants}
        onMouseEnter={handleSubmenuMouseEnter}
        onMouseLeave={handleSubmenuMouseLeave}
      >
        {submenuContent}
      </motion.div>
    );
  };

  return (
    <div className="relative z-10" onMouseLeave={handleMenuAreaMouseLeave}>
      <div
        ref={sidebarRef}
        className="secondary-sidebar bg-[#1C1C24] text-[#5B5B5B] h-full overflow-y-auto transition-all border-l border-r border-[#383840] "
        style={{ width: collapsed ? "73px" : "292px" }}
      >
        <div className="py-5">
          {currentMenuItems.map((item) => (
            <div
              key={item.id}
              ref={(el) => (menuItemRefs.current[item.id] = el)}
              onClick={() => handleMenuItemClick(item)}
              onMouseEnter={() => handleMenuItemMouseEnter(item)}
            >
              <div
                className="flex items-center justify-between pl-[25px] pr-2 py-3 cursor-pointer second-sidebar"
                style={{
                  borderLeft: isMenuItemActive(item)
                    ? `2px solid ${selectedMenuItem?.borderColor || "#30AD71"}`
                    : "none",
                  backgroundColor: isMenuItemActive(item)
                    ? `${selectedMenuItem?.borderColor || "#30AD71"}15`
                    : "transparent",
                  color: isMenuItemActive(item) ? "#FFFFFF" : "#5B5B5B",
                }}
              >
                <div className="flex items-center">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`w-5 h-5 second-sidebar-icons ${
                      isMenuItemActive(item) ? "filter brightness-0 invert" : ""
                    }`}
                  />
                  {!collapsed && (
                    <span className="ml-3 second-sidebar-spans">
                      {item.label}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>{renderSubmenu()}</AnimatePresence>
    </div>
  );
};

export default SecondarySidebar;
