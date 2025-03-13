import React from "react";
import policy from "../../../../assets/images/Company-Sidebar/policy.svg"
import manual from "../../../../assets/images/Company-Sidebar/manual.svg"
import procedure from "../../../../assets/images/Company-Sidebar/manual.svg"
import record from "../../../../assets/images/Company-Sidebar/record-format.svg"
import parties from "../../../../assets/images/Company-Sidebar/interested parties.svg"
import process from "../../../../assets/images/Company-Sidebar/interested parties.svg"
import scope from "../../../../assets/images/Company-Sidebar/record-format.svg"
import "./documentationsubmenu.css"

const DocumentationSubmenu = () => {
    const categories = [
        { id: 1, label: "Policy", icon: <img src={policy} alt="Policy" className="w-[15px] h-[15px]" /> },
        { id: 2, label: "Manual", icon: <img src={manual} alt="Manual" className="w-[15px] h-[15px]" /> },
        { id: 3, label: "Procedure", icon: <img src={procedure} alt="Procedure" className="w-[15px] h-[15px]" /> },
        { id: 4, label: "Record Format", icon: <img src={record} alt="Record Format" className="w-[15px] h-[15px]" /> },
        { id: 5, label: "Interested Parties", icon: <img src={parties} alt="Interested Parties" className="w-[15px] h-[15px]" /> },
        { id: 6, label: "Processes", icon: <img src={process} alt="Processes" className="w-[15px] h-[15px]" /> },
        { id: 7, label: "Scope Statements", icon: <img src={scope} alt="Scope Statements" className="w-[15px] h-[15px]" /> },
    ];


    return (
        <div className="grid grid-cols-3 gap-[10px] bg-[#1C1C24] p-5 w-[555px] absolute top-16 border-t border-r border-b border-[#383840]">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="flex flex-col items-center justify-center py-[10px] rounded-md bg-[#24242D] transition-colors duration-200 cursor-pointer h-[100px] gap-[10px] documentation-submenu-cards"
                >
                    <div className="bg-[#5B5B5B] rounded-full p-[5px] w-[26px] h-[26px] flex justify-center items-center">
                        {category.icon}
                    </div>
                    <span className="text-center text-[#5B5B5B] documentation-submenu-label duration-200">
                        {category.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default DocumentationSubmenu;