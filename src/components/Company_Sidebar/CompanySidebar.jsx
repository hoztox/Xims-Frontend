import React, { useState } from "react";
import "./companysidebar.css";

const CompanySidebar = ({ setSelectedMenuItem }) => {
  const [activeItem, setActiveItem] = useState("QMS");
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { id: "QMS", label: "Quality Management System", shortLabel: "QMS", borderColor: "#858585", activeColor: "#858585" },
    { id: "EMS", label: "Environmental Management System", shortLabel: "EMS", borderColor: "#38E76C", activeColor: "#38E76C" },
    { id: "OHS", label: "Occupational Health and Safety Management System", shortLabel: "OHS", borderColor: "#F9291F", activeColor: "#F9291F" },
    { id: "EnMS", label: "Energy Management System", shortLabel: "EnMS", borderColor: "#10B8FF", activeColor: "#10B8FF" },
    { id: "BMS", label: "Business Continuity Management System", shortLabel: "BMS", borderColor: "#F310FF", activeColor: "#F310FF" },
    { id: "AMS", label: "Asset Management System", shortLabel: "AMS", borderColor: "#DD6B06", activeColor: "#DD6B06" },
    { id: "IMS", label: "Integrated Management System", shortLabel: "IMS", borderColor: "#CBA301", activeColor: "#CBA301" },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    setSelectedMenuItem({ id: item.id, label: item.label, borderColor: item.borderColor });
  };

  return (
    <div className='w-[93px] bg-[#13131A] text-white h-screen flex flex-col gap-[2px] relative'>
      {menuItems.map((item) => {
        const isActive = activeItem === item.id;
        const isHovered = hoveredItem === item.id;

        return (
          <div key={item.id} className="relative" 
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              className="w-[73px] h-[47px] company-main-menus border-l-2 flex justify-center items-center transition-all duration-300 ease-in-out"
              style={{
                borderColor: item.borderColor,
                backgroundColor: isActive ? item.activeColor : "#1C1C24",
                color: "#FFFFFF",
              }}
              onClick={() => handleItemClick(item)}
            >
              {item.shortLabel}
            </button>

            {isHovered && (
              <div
                className="absolute left-[0px] top-0 h-[47px] py-0 px-4 bg-[#1C1C24] text-white whitespace-nowrap flex items-center shadow-md cursor-pointer full-form z-50"
                style={{
                  minWidth: "150px",
                  textAlign: "center",
                  animation: "expandIn 0.3s ease forwards",
                  borderLeft: `2px solid ${item.borderColor}`,
                  backgroundColor: item.activeColor,
                }}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CompanySidebar;
