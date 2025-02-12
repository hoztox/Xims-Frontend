import React, { useState } from "react";
import logo from "../../assets/images/Company-Sidebar/xims-logo.svg";
import icon1 from "../../assets/images/Company-Sidebar/icon1.svg";
import icon2 from "../../assets/images/Company-Sidebar/icon2.svg";
import icon3 from "../../assets/images/Company-Sidebar/icon3.svg";
import icon4 from "../../assets/images/Company-Sidebar/icon4.svg";
import icon5 from "../../assets/images/Company-Sidebar/icon5.svg";
import icon6 from "../../assets/images/Company-Sidebar/icon6.svg";
import icon7 from "../../assets/images/Company-Sidebar/icon7.svg";
import icon8 from "../../assets/images/Company-Sidebar/icon8.svg";
import icon9 from "../../assets/images/Company-Sidebar/icon9.svg";
import icon10 from "../../assets/images/Company-Sidebar/icon10.svg";
import icon11 from "../../assets/images/Company-Sidebar/icon11.svg";
import icon12 from "../../assets/images/Company-Sidebar/icon12.svg";
import icon13 from "../../assets/images/Company-Sidebar/icon13.svg";
import icon14 from "../../assets/images/Company-Sidebar/icon14.svg";
import icon15 from "../../assets/images/Company-Sidebar/icon15.svg";
import icon16 from "../../assets/images/Company-Sidebar/icon16.svg";
import icon17 from "../../assets/images/Company-Sidebar/icon17.svg";
import icon18 from "../../assets/images/Company-Sidebar/icon18.svg";
import closeicon from "../../assets/images/Company-Sidebar/close-icon.svg";
import ximsletter from "../../assets/images/Company-Sidebar/xims-letter.svg";
import rightarrow from "../../assets/images/Company-Sidebar/rightarrow.svg";
import downarrow from "../../assets/images/Company-Sidebar/down-arrow.svg";
import "./companysidebar.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CompanySidebar = () => {
  const [activeBar, setActiveBar] = useState("none");
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeSecondSidebar, setActiveSecondSidebar] = useState("quality");

  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <img src={icon1} alt="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
      hasSubmenu: false,
    },
    {
      icon: <img src={icon2} alt="documentation" className="w-5 h-5" />,
      label: "Documentation",
      submenu: [
        "Policy",
        "Manual",
        "Procedure",
        "Record Format",
        "Interested Parties",
        "Processes",
        "Scope Statements",
      ],
    },
    {
      icon: (
        <img
          src={icon3}
          alt="Employee Training & Performance"
          className="w-5 h-5"
        />
      ),
      label: "Employee Training & Performance",
      submenu: [
        "Add Training",
        "List Training",
        "List User Training",
        "Training Evaluation",
        "Employee Performance Evaluation",
        "Employee Satisfaction Survey",
        "Awareness Training",
      ],
    },
    {
      icon: (
        <img
          src={icon4}
          alt="Actions, Meeting and Communication Management"
          className="w-5 h-5"
        />
      ),
      label: "Actions, Meeting and Communication Management",
      submenu: [
        "List Meeting",
        "Add Meeting",
        "System Messaging",
        "Internal Problems and Observations",
        "Actions",
      ],
    },
    {
      icon: (
        <img
          src={icon5}
          alt="Audits & Inspections Management"
          className="w-5 h-5"
        />
      ),
      label: "Audits & Inspections Management",
      submenu: [
        "Audit and Inspection Management",
        "Add Audit",
        "Add Inspection",
      ],
    },
    {
      icon: <img src={icon6} alt="Customer Management" className="w-5 h-5" />,
      label: "Customer Management",
      submenu: [
        "Add Customer",
        "List Customer",
        "Add Complaints and Feedback",
        "List Complaints and Feedback",
        "Customer Satisfaction Survey",
      ],
    },
    {
      icon: <img src={icon7} alt="Supplier Management" className="w-5 h-5" />,
      label: "Supplier Management",
      submenu: [
        "Add Supplier",
        "Enter Supplier Problems",
        "Supplier Problem Log",
        "Supplier Performance Evaluation",
      ],
    },
    {
      icon: (
        <img
          src={icon8}
          alt="Compliance, Sustainability & Management of Change"
          className="w-5 h-5"
        />
      ),
      label: "Compliance, Sustainability & Management of Change",
      submenu: [
        "Compliance",
        "Legal and Other Requirements",
        "Evaluation of Compliance",
        "Management of Change",
        "Management of Change Log",
        "Risk Management",
        "Process Risks and Assessments",
        "Sustainability",
        "Compliance Obligations",
        "Sustainability Indicators & Programs",
      ],
    },
    {
      icon: (
        <img
          src={icon9}
          alt="Risk, Opportunities & Incident Management"
          className="w-5 h-5"
        />
      ),
      label: "Risk, Opportunities & Incident Management",
      submenu: [
        "Environmental Aspects",
        "Environmental Impact Assessments",
        "Environmental Incidents",
        "Environmental Waste Management",
        "Health and Safety Hazards",
        "Health and Safety Risk Assessments",
        "Health and Safety Incidents",
        "Process Risks Assessments",
        "Process Opportunities Assessments",
        "Accident and Incident Investigations",
        "Environmental Hazards",
        "Significant Environmental Aspects",
        "Emergency Response and Preparedness",
        "Health and Safety Risk Assessments",
        "Health and Safety Incidents",
        "Business Risks",
        "Occupational Health and Safety Hazards",
        "Occupational Health and Safety Risk Assessments",
      ],
    },
    {
      icon: <img src={icon10} alt="Energy Management" className="w-5 h-5" />,
      label: "Energy Management",
      submenu: [
        "Energy Review",
        "Energy Baselines",
        "Significant Energy Use and Consumptions",
        "Energy Involvement Opportunities",
        "Energy Action Plans",
        "Energy Management Performance Score",
        "Structural Management Score",
        "Operation Management Score",
        "Target Achievement Score",
        "Energy Performance Improvement Actions",
        "Energy Performance Indicator",
      ],
    },
    {
      icon: (
        <img
          src={icon16}
          alt="Business Continuity Management"
          className="w-5 h-5"
        />
      ),
      label: "Business Continuity Management",
      submenu: [
        "Business Impact Analysis and Risk Assessment",
        "Business Continuity Strategies and Solutions",
        "Business Continuity Plans and Procedures",
        "Business Continuity Exercise and Programme",
        "Evaluation of Business Continuity Capabilities",
      ],
    },
    {
      icon: (
        <img
          src={icon11}
          alt="Correction Corrective Actions & Preventive Actions"
          className="w-5 h-5"
        />
      ),
      label: "Correction Corrective Actions & Preventive Actions",
      submenu: ["Correction / Corrective Actions", "Preventive Actions"],
    },
    {
      icon: <img src={icon12} alt="Objectives & Targets" className="w-5 h-5" />,
      label: "Objectives & Targets",
      submenu: ["Objectives and KPIs", "Targets and Programs"],
    },
    {
      icon: <img src={icon13} alt="User Management" className="w-5 h-5" />,
      label: "User Management",
      submenu: ["Add User", "List User"],
    },
    {
      icon: <img src={icon14} alt="Reports & Analysis" className="w-5 h-5" />,
      label: "Reports & Analysis",
      submenu: ["All"],
    },
    {
      icon: (
        <img
          src={icon15}
          alt="Non Conformity Report Management"
          className="w-5 h-5"
        />
      ),
      label: "Non Conformity Report Management",
      submenu: ["Non-Conformity Reports"],
    },
    // {
    //   icon: <img src={icon16} alt="Analysis Graph" className='w-5 h-5' />,
    //   label: 'Analysis Graph'
    // },
    {
      icon: <img src={icon17} alt="Backup" className="w-5 h-5" />,
      label: "Backup",
    },
    {
      icon: <img src={icon18} alt="Log Out" className="w-5 h-5" />,
      label: "Log Out",
    },
  ];




  const qmsMenuItems = [
    {
      icon: <img src={icon1} alt="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
      hasSubmenu: false,
    },
    {
      icon: <img src={icon2} alt="documentation" className="w-5 h-5" />,
      label: "Documentation",
      submenu: [
        "Policy",
        "Manual",
        "Procedure",
        "Record Format",
        "Interested Parties",
        "Processes",
        "Scope Statements",
      ],
    },
    {
      icon: <img src={icon3} alt="Employee Training & Performance" className="w-5 h-5" />,
      label: "Employee Training & Performance",
      submenu: [
        "Add Training",
        "List Training",
        "List User Training",
        "Training Evaluation",
        "Employee Performance Evaluation",
        "Employee Satisfaction Survey",
        "Awareness Training",
      ],
    },
    {
      icon: <img src={icon4} alt="Actions, Meeting and Communication Management" className="w-5 h-5" />,
      label: "Actions, Meeting and Communication Management",
      submenu: [
        "List Meeting",
        "Add Meeting",
        "System Messaging",
        "Internal Problems and Observations",
        "Actions",
      ],
    },
    {
      icon: <img src={icon5} alt="Audits & Inspections Management" className="w-5 h-5" />,
      label: "Audits & Inspections Management",
      submenu: [
        "Audit and Inspection Management",
        "Add Audit",
        "Add Inspection",
      ],
    },
    {
      icon: <img src={icon6} alt="Customer Management" className="w-5 h-5" />,
      label: "Customer Management",
      submenu: [
        "Add Customer",
        "List Customer",
        "Add Complaints and Feedback",
        "List Complaints and Feedback",
        "Customer Satisfaction Survey",
      ],
    },
    {
      icon: <img src={icon7} alt="Supplier Management" className="w-5 h-5" />,
      label: "Supplier Management",
      submenu: [
        "Add Supplier",
        "Enter Supplier Problems",
        "Supplier Problem Log",
        "Supplier Performance Evaluation",
      ],
    },
    {
      icon: <img src={icon8} alt="Compliance Management" className="w-5 h-5" />,
      label: "Compliance, Sustainability & Management of Change",
      submenu: [
        "Compliance",
        "Legal and Other Requirements",
        "Evaluation of Compliance",
        "Management of Change",
        "Management of Change Log",
        "Risk Management",
        "Process Risks and Assessments",
        "Sustainability",
      ],
    },
    {
      icon: <img src={icon9} alt="Risk Management" className="w-5 h-5" />,
      label: "Risk and Opportunities Management",
      submenu: [
        "Environmental Aspects",
        "Environmental Impact Assessments",
        "Environmental Incidents",
        "Environmental Waste Management",
        "Health and Safety Hazards",
        "Health and Safety Risk Assessments",
        "Health and Safety Incidents",
        "Process Risks Assessments",
        "Process Opportunities Assessment",
        "Accident and Incident Investigations",
      ],
    },
    {
      icon: <img src={icon10} alt="Energy Management" className="w-5 h-5" />,
      label: "Energy Management",
      submenu: [
        "Energy Review",
        "Energy Baselines",
        "Significant Energy Use and Consumptions",
        "Energy Involvement Opportunities",
        "Energy Action Plans",
      ],
    },
    {
      icon: <img src={icon11} alt="Correction Actions" className="w-5 h-5" />,
      label: "Correction Corrective Actions & Preventive Actions",
      submenu: [
        "Correction / Corrective Actions",
        "Preventive Actions",
      ],
    },
    {
      icon: <img src={icon12} alt="Objectives & Targets" className="w-5 h-5" />,
      label: "Objectives & Targets",
      submenu: [
        "Objectives and KPIs",
        "Targets and Programs",
      ],
    },
    {
      icon: <img src={icon13} alt="User Management" className="w-5 h-5" />,
      label: "User Management",
      submenu: [
        "Add User",
        "List User",
      ],
    },
    {
      icon: <img src={icon15} alt="Non Conformity" className="w-5 h-5" />,
      label: "Non Conformity Report Management",
      submenu: ["Non-Conformity Reports"],
    },
    {
      icon: <img src={icon14} alt="Reports & Analysis" className="w-5 h-5" />,
      label: "Reports & Analysis",
      submenu: ["All"],
    },
    {
      icon: <img src={icon17} alt="Backup" className="w-5 h-5" />,
      label: "Backup",
      hasSubmenu: false,
    },
    {
      icon: <img src={icon18} alt="Log Out" className="w-5 h-5" />,
      label: "Log Out",
      hasSubmenu: false,
    },
  ];

  const emsMenuItems = [
    {
      icon: <img src={icon1} alt="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
      hasSubmenu: false,
    },
    {
      icon: <img src={icon2} alt="documentation" className="w-5 h-5" />,
      label: "Documentation",
      submenu: [
        "Policy",
        "Manual",
        "Procedure",
        "Record Format",
        "Interested Parties",
        "Processes",
        "Scope Statements",
      ],
    },
    {
      icon: (
        <img
          src={icon3}
          alt="Employee Training & Performance"
          className="w-5 h-5"
        />
      ),
      label: "Employee Training & Performance",
      submenu: [
        "Add Training",
        "List Training",
        "List User Training",
        "Training Evaluation",
        "Employee Performance Evaluation",
        "Employee Satisfaction Survey",
        "Awareness Training",
      ],
    },
    {
      icon: (
        <img
          src={icon4}
          alt="Actions, Meeting and Communication Management"
          className="w-5 h-5"
        />
      ),
      label: "Actions, Meeting and Communication Management",
      submenu: [
        "List Meeting",
        "Add Meeting",
        "System Messaging",
        "Internal Problems and Observations",
        "Actions",
      ],
    },
    {
      icon: (
        <img
          src={icon5}
          alt="Audits & Inspections Management"
          className="w-5 h-5"
        />
      ),
      label: "Audits & Inspections Management",
      submenu: [
        "Audit and Inspection Management",
        "Add Audit",
        "Add Inspection",
      ],
    },
    {
      icon: <img src={icon6} alt="Customer Management" className="w-5 h-5" />,
      label: "Customer Management",
      submenu: [
        "Add Customer",
        "List Customer",
        "Add Complaints and Feedback",
        "List Complaints and Feedback",
        "Customer Satisfaction Survey",
      ],
    },
    {
      icon: <img src={icon7} alt="Supplier Management" className="w-5 h-5" />,
      label: "Supplier Management",
      submenu: [
        "Add Supplier",
        "Enter Supplier Problems",
        "Supplier Problem Log",
        "Supplier Performance Evaluation",
      ],
    },
    {
      icon: (
        <img
          src={icon8}
          alt="Compliance, Sustainability & Management of Change"
          className="w-5 h-5"
        />
      ),
      label: "Compliance, Sustainability & Management of Change",
      submenu: [
        "Compliance Obligations",
        "Legal and Other Requirements",
        "Evaluation of Compliance",
        "Management of Change",
        "Management of Change Log",
        "Sustainability Indicators & Programs",
      ],
    },
    {
      icon: (
        <img
          src={icon9}
          alt="Risk, Opportunities & Incident Management"
          className="w-5 h-5"
        />
      ),
      label: "Risk, Opportunities & Incident Management",
      submenu: [
        "Environmental Aspects",
        "Environmental Hazards",
        "Environmetal Impact Assessments",
        "Significant Environmental Aspects",
        "Environmental Incidents",
        "Environmental Waste Management",
        "Accident and Incident Investigations",
        "Process Risks Assessments",
        "Process Opportunities Assessments",
        "Emergency Response and Preparedness",
        "Health and Safety Risk Assessments",
        "Health and Safety Incidents",
        "Business Risks",
      ],
    },
    {
      icon: <img src={icon10} alt="Energy Management" className="w-5 h-5" />,
      label: "Energy Management",
      submenu: [
        "Energy Review",
        "Energy Baselines",
        "Significant Energy Use and Consumptions",
        "Energy Involvement Opportunities",
        "Energy Action Plans",
      ],
    },
    {
      icon: (
        <img
          src={icon11}
          alt="Correction Corrective Actions & Preventive Actions"
          className="w-5 h-5"
        />
      ),
      label: "Correction Corrective Actions & Preventive Actions",
      submenu: [
        "Correction / Corrective Actions",
        "Preventive Actions"
      ],
    },
    {
      icon: <img src={icon12} alt="Objectives & Targets" className="w-5 h-5" />,
      label: "Objectives & Targets",
      submenu: [
        "Objectives and KPIs",
        "Targets and Programs"
      ],
    },
    {
      icon: <img src={icon13} alt="User Management" className="w-5 h-5" />,
      label: "User Management",
      submenu: [
        "Add User",
        "List User"
      ],
    },
    {
      icon: (
        <img
          src={icon15}
          alt="Non Conformity Report Management"
          className="w-5 h-5"
        />
      ),
      label: "Non Conformity Report Management",
      submenu: [
        "Non-Conformity Reports"],
    },
    {
      icon: <img src={icon14} alt="Reports & Analysis" className="w-5 h-5" />,
      label: "Reports & Analysis",
      submenu: ["All"],
    },
    {
      icon: <img src={icon17} alt="Backup" className="w-5 h-5" />,
      label: "Backup",
    },
    {
      icon: <img src={icon18} alt="Log Out" className="w-5 h-5" />,
      label: "Log Out",
    },
  ]

  const hmsMenuItems = [
    {
      icon: <img src={icon1} alt="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
      hasSubmenu: false,
    },
    {
      icon: <img src={icon2} alt="documentation" className="w-5 h-5" />,
      label: "Documentation",
      submenu: [
        "Policy",
        "Manual",
        "Procedure",
        "Record Format",
        "Interested Parties",
        "Processes",
        "Scope Statements",
      ],
    },
    {
      icon: (
        <img
          src={icon3}
          alt="Employee Training & Performance"
          className="w-5 h-5"
        />
      ),
      label: "Employee Training & Performance",
      submenu: [
        "Add Training",
        "List Training",
        "List User Training",
        "Training Evaluation",
        "Employee Performance Evaluation",
        "Employee Satisfaction Survey",
        "Awareness Training",
      ],
    },
    {
      icon: (
        <img
          src={icon4}
          alt="Actions, Meeting and Communication Management"
          className="w-5 h-5"
        />
      ),
      label: "Actions, Meeting and Communication Management",
      submenu: [
        "List Meeting",
        "Add Meeting",
        "System Messaging",
        "Internal Problems and Observations",
        "Actions",
      ],
    },
    {
      icon: (
        <img
          src={icon5}
          alt="Audits & Inspections Management"
          className="w-5 h-5"
        />
      ),
      label: "Audits & Inspections Management",
      submenu: [
        "Audit and Inspection Management",
        "Add Audit",
        "Add Inspection",
      ],
    },
    {
      icon: <img src={icon6} alt="Customer Management" className="w-5 h-5" />,
      label: "Customer Management",
      submenu: [
        "Add Customer",
        "List Customer",
        "Add Complaints and Feedback",
        "List Complaints and Feedback",
        "Customer Satisfaction Survey",
      ],
    },
    {
      icon: <img src={icon7} alt="Supplier Management" className="w-5 h-5" />,
      label: "Supplier Management",
      submenu: [
        "Add Supplier",
        "Enter Supplier Problems",
        "Supplier Problem Log",
        "Supplier Performance Evaluation",
      ],
    },
    {
      icon: (
        <img
          src={icon8}
          alt="Compliance, Sustainability & Management of Change"
          className="w-5 h-5"
        />
      ),
      label: "Compliance, Sustainability & Management of Change",
      submenu: [
        "Compliance",
        "Legal and Other Requirements",
        "Evaluation of Compliance",
        "Management of Change",
        "Management of Change Log",
        "Sustainability Indicators & Programs",
      ],
    },
    {
      icon: (
        <img
          src={icon9}
          alt="Risk, Opportunities & Incident Management"
          className="w-5 h-5"
        />
      ),
      label: "Risk, Opportunities & Incident Management",
      submenu: [
        "Environmental Aspects",
        "Environmental Impact Assessments",
        "Environmental Incidents",
        "Environmental Waste Management",
        "Occupational Health and Safety Hazards",
        "Occupational Health and Safety Risk Assessments",
        "Health and Safety Incidents",
        "Accident and Incident Investigations",
        "Process Risks Assessments",
        "Process Opportunities Assessments",
        "Emergency Response and Preparedness",
      ],
    },
    {
      icon: <img src={icon10} alt="Energy Management" className="w-5 h-5" />,
      label: "Energy Management",
      submenu: [
        "Energy Review",
        "Energy Baselines",
        "Significant Energy Use and Consumptions",
        "Energy Involvement Opportunities",
        "Energy Action Plans",
      ],
    },
    {
      icon: (
        <img
          src={icon11}
          alt="Correction Corrective Actions & Preventive Actions"
          className="w-5 h-5"
        />
      ),
      label: "Correction Corrective Actions & Preventive Actions",
      submenu: [
        "Correction / Corrective Actions",
        "Preventive Actions"
      ],
    },
    {
      icon: <img src={icon12} alt="Objectives & Targets" className="w-5 h-5" />,
      label: "Objectives & Targets",
      submenu: [
        "Objectives and KPIs",
        "Targets and Programs"
      ],
    },
    {
      icon: <img src={icon13} alt="User Management" className="w-5 h-5" />,
      label: "User Management",
      submenu: [
        "Add User",
        "List User"
      ],
    },
    {
      icon: (
        <img
          src={icon15}
          alt="Non Conformity Report Management"
          className="w-5 h-5"
        />
      ),
      label: "Non Conformity Report Management",
      submenu: ["Non-Conformity Reports"],
    },
    {
      icon: <img src={icon14} alt="Reports & Analysis" className="w-5 h-5" />,
      label: "Reports & Analysis",
      submenu: ["All"],
    },
    {
      icon: <img src={icon17} alt="Backup" className="w-5 h-5" />,
      label: "Backup",
    },
    {
      icon: <img src={icon18} alt="Log Out" className="w-5 h-5" />,
      label: "Log Out",
    },
  ]

  const energyMenuItems = [
    {
      icon: <img src={icon1} alt="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
      hasSubmenu: false,
    },
    {
      icon: <img src={icon2} alt="documentation" className="w-5 h-5" />,
      label: "Documentation",
      submenu: [
        "Policy",
        "Manual",
        "Procedure",
        "Record Format",
        "Interested Parties",
        "Processes",
        "Scope Statements",
      ],
    },
    {
      icon: (
        <img
          src={icon3}
          alt="Employee Training & Performance"
          className="w-5 h-5"
        />
      ),
      label: "Employee Training & Performance",
      submenu: [
        "Add Training",
        "List Training",
        "List User Training",
        "Training Evaluation",
        "Employee Performance Evaluation",
        "Employee Satisfaction Survey",
        "Awareness Training",
      ],
    },
    {
      icon: (
        <img
          src={icon4}
          alt="Actions, Meeting and Communication Management"
          className="w-5 h-5"
        />
      ),
      label: "Actions, Meeting and Communication Management",
      submenu: [
        "List Meeting",
        "Add Meeting",
        "System Messaging",
        "Internal Problems and Observations",
        "Actions",
      ],
    },
    {
      icon: (
        <img
          src={icon5}
          alt="Audits & Inspections Management"
          className="w-5 h-5"
        />
      ),
      label: "Audits & Inspections Management",
      submenu: [
        "Audit and Inspection Management",
        "Add Audit",
        "Add Inspection",
      ],
    },
    {
      icon: <img src={icon6} alt="Customer Management" className="w-5 h-5" />,
      label: "Customer Management",
      submenu: [
        "Add Customer",
        "List Customer",
        "Add Complaints and Feedback",
        "List Complaints and Feedback",
        "Customer Satisfaction Survey",
      ],
    },
    {
      icon: <img src={icon7} alt="Supplier Management" className="w-5 h-5" />,
      label: "Supplier Management",
      submenu: [
        "Add Supplier",
        "Enter Supplier Problems",
        "Supplier Problem Log",
        "Supplier Performance Evaluation",
      ],
    },
    {
      icon: (
        <img
          src={icon8}
          alt="Compliance, Sustainability & Management of Change"
          className="w-5 h-5"
        />
      ),
      label: "Compliance, Sustainability & Management of Change",
      submenu: [
        "Compliance",
        "Legal and Other Requirements",
        "Evaluation of Compliance",
        "Management of Change",
        "Management of Change Log",
        "Sustainability Indicators & Programs",
      ],
    },
    {
      icon: (
        <img
          src={icon9}
          alt="Risk, Opportunities & Incident Management"
          className="w-5 h-5"
        />
      ),
      label: "Risk, Opportunities & Incident Management",
      submenu: [
        "Environmental Aspects",
        "Environmental Impact Assessments",
        "Environmental Incidents",
        "Environmental Waste Management",
        "Health and Safety Hazards",
        "Health and Safety Risk Assessments",
        "Health and Safety Incidents",
        "Business Risks",
        "Process Risks Assessments",
        "Process Opportunities Assessments",
        "Accident and Incident Investigations",
      ],
    },
    {
      icon: <img src={icon10} alt="Energy Management" className="w-5 h-5" />,
      label: "Energy Management",
      submenu: [
        "Energy Review",
        "Energy Baselines",
        "Energy Management Performance Score",
        "Structural Management Score",
        "Operation Management Score",
        "Target Achievement Score",
        "Energy Performance Improvement Actions",
        "Energy Performance Indicator",
        "Significant Energy Use and Consumptions",
        "Energy Involvement Opportunities",
        "Energy Action Plans",
      ],
    },
    {
      icon: (
        <img
          src={icon11}
          alt="Correction Corrective Actions & Preventive Actions"
          className="w-5 h-5"
        />
      ),
      label: "Correction Corrective Actions & Preventive Actions",
      submenu: [
        "Correction / Corrective Actions",
        "Preventive Actions"
      ],
    },
    {
      icon: <img src={icon12} alt="Objectives & Targets" className="w-5 h-5" />,
      label: "Objectives & Targets",
      submenu: [
        "Objectives and KPIs",
        "Targets and Programs"
      ],
    },
    {
      icon: <img src={icon13} alt="User Management" className="w-5 h-5" />,
      label: "User Management",
      submenu: [
        "Add User",
        "List User"
      ],
    },
    {
      icon: (
        <img
          src={icon15}
          alt="Non Conformity Report Management"
          className="w-5 h-5"
        />
      ),
      label: "Non Conformity Report Management",
      submenu: ["Non-Conformity Reports"],
    },
    {
      icon: <img src={icon14} alt="Reports & Analysis" className="w-5 h-5" />,
      label: "Reports & Analysis",
      submenu: ["All"],
    },
    {
      icon: <img src={icon17} alt="Backup" className="w-5 h-5" />,
      label: "Backup",
    },
    {
      icon: <img src={icon18} alt="Log Out" className="w-5 h-5" />,
      label: "Log Out",
    },
  ]

  const bcmsMenuItems = [
    {
      icon: <img src={icon1} alt="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
      hasSubmenu: false,
    },
    {
      icon: <img src={icon2} alt="documentation" className="w-5 h-5" />,
      label: "Documentation",
      submenu: [
        "Policy",
        "Manual",
        "Procedure",
        "Record Format",
        "Interested Parties",
        "Processes",
        "Scope Statements",
      ],
    },
    {
      icon: (
        <img
          src={icon3}
          alt="Employee Training & Performance"
          className="w-5 h-5"
        />
      ),
      label: "Employee Training & Performance",
      submenu: [
        "Add Training",
        "List Training",
        "List User Training",
        "Training Evaluation",
        "Employee Performance Evaluation",
        "Employee Satisfaction Survey",
        "Awareness Training",
      ],
    },
    {
      icon: (
        <img
          src={icon4}
          alt="Actions, Meeting and Communication Management"
          className="w-5 h-5"
        />
      ),
      label: "Actions, Meeting and Communication Management",
      submenu: [
        "List Meeting",
        "Add Meeting",
        "System Messaging",
        "Internal Problems and Observations",
        "Actions",
      ],
    },
    {
      icon: (
        <img
          src={icon5}
          alt="Audits & Inspections Management"
          className="w-5 h-5"
        />
      ),
      label: "Audits & Inspections Management",
      submenu: [
        "Audit and Inspection Management",
        "Add Audit",
        "Add Inspection",
      ],
    },
    {
      icon: <img src={icon6} alt="Customer Management" className="w-5 h-5" />,
      label: "Customer Management",
      submenu: [
        "Add Customer",
        "List Customer",
        "Add Complaints and Feedback",
        "List Complaints and Feedback",
        "Customer Satisfaction Survey",
      ],
    },
    {
      icon: <img src={icon7} alt="Supplier Management" className="w-5 h-5" />,
      label: "Supplier Management",
      submenu: [
        "Add Supplier",
        "Enter Supplier Problems",
        "Supplier Problem Log",
        "Supplier Performance Evaluation",
      ],
    },
    {
      icon: (
        <img
          src={icon8}
          alt="Compliance, Sustainability & Management of Change"
          className="w-5 h-5"
        />
      ),
      label: "Compliance, Sustainability & Management of Change",
      submenu: [
        "Compliance",
        "Legal and Other Requirements",
        "Evaluation of Compliance",
        "Management of Change",
        "Management of Change Log",
        "Sustainability Indicators & Programs",
      ],
    },
    {
      icon: (
        <img
          src={icon9}
          alt="Risk, Opportunities & Incident Management"
          className="w-5 h-5"
        />
      ),
      label: "Risk, Opportunities & Incident Management",
      submenu: [
        "Environmental Aspects",
        "Environmental Impact Assessments",
        "Environmental Incidents",
        "Environmental Waste Management",
        "Occupational Health and Safety Hazards",
        "Occupational Health and Safety Risk Assessments",
        "Health and Safety Incidents",
        "Accident and Incident Investigations",
        "Process Risks Assessments",
        "Process Opportunities Assessments",
        "Emergency Response and Preparedness",
      ],
    },
    {
      icon: (
        <img
          src={icon16}
          alt="Business Continuity Management"
          className="w-5 h-5"
        />
      ),
      label: "Business Continuity Management",
      submenu: [
        "Business Impact Analysis and Risk Assessment",
        "Business Continuity Strategies and Solutions",
        "Business Continuity Plans and Procedures",
        "Business Continuity Exercise and Programme",
        "Evaluation of Business Continuity Capabilities",
      ],
    },
    {
      icon: (
        <img
          src={icon11}
          alt="Correction Corrective Actions & Preventive Actions"
          className="w-5 h-5"
        />
      ),
      label: "Correction Corrective Actions & Preventive Actions",
      submenu: ["Correction / Corrective Actions", "Preventive Actions"],
    },
    {
      icon: <img src={icon12} alt="Objectives & Targets" className="w-5 h-5" />,
      label: "Objectives & Targets",
      submenu: ["Objectives and KPIs", "Targets and Programs"],
    },
    {
      icon: <img src={icon13} alt="User Management" className="w-5 h-5" />,
      label: "User Management",
      submenu: ["Add User", "List User"],
    },
    {
      icon: (
        <img
          src={icon15}
          alt="Non Conformity Report Management"
          className="w-5 h-5"
        />
      ),
      label: "Non Conformity Report Management",
      submenu: ["Non-Conformity Reports"],
    },
    {
      icon: <img src={icon14} alt="Reports & Analysis" className="w-5 h-5" />,
      label: "Reports & Analysis",
      submenu: ["All"],
    },
    {
      icon: <img src={icon17} alt="Backup" className="w-5 h-5" />,
      label: "Backup",
    },
    {
      icon: <img src={icon18} alt="Log Out" className="w-5 h-5" />,
      label: "Log Out",
    },
  ]

  const amsMenuItems = [
    {
      icon: <img src={icon1} alt="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
      hasSubmenu: false,
    },
    {
      icon: <img src={icon2} alt="documentation" className="w-5 h-5" />,
      label: "Documentation",
      submenu: [
        "Policy",
        "Manual",
        "Procedure",
        "Record Format",
      ],
    },
    {
      icon: (
        <img
          src={icon3}
          alt="Employee Training & Performance"
          className="w-5 h-5"
        />
      ),
      label: "Employee Training & Performance",
      submenu: [
        "Add Training",
        "List Training",
        "List User Training",
        "Training Evaluation",
        "Employee Performance Evaluation",
        "Employee Satisfaction Survey",
        "Awareness Training",
      ],
    },
    {
      icon: (
        <img
          src={icon4}
          alt="Meeting and Communication Management"
          className="w-5 h-5"
        />
      ),
      label: "Meeting and Communication Management",
      submenu: [
        "List Meeting",
        "Add Meeting",
        "System Messaging",
        "Internal Problems and Observations",
      ],
    },
    {
      icon: (
        <img
          src={icon5}
          alt="Audits & Inspections Management"
          className="w-5 h-5"
        />
      ),
      label: "Audits & Inspections Management",
      submenu: [
        "Audit and Inspection Management",
        "Add Audit",
        "Add Inspection",
      ],
    },
    {
      icon: <img src={icon6} alt="Customer Management" className="w-5 h-5" />,
      label: "Customer Management",
      submenu: [
        "Add Customer",
        "List Customer",
        "Add Complaints and Feedback",
        "List Complaints and Feedback",
        "Customer Satisfaction Survey",
      ],
    },
    {
      icon: <img src={icon7} alt="Supplier Management" className="w-5 h-5" />,
      label: "Supplier Management",
      submenu: [
        "Add Supplier",
        "Enter Supplier Problems",
        "Supplier Problem Log",
        "Supplier Evaluation",
      ],
    },
    {
      icon: (
        <img
          src={icon8}
          alt="Compliance, Sustainability & Management of Change"
          className="w-5 h-5"
        />
      ),
      label: "Compliance, Sustainability & Management of Change",
      submenu: [
        "Compliance",
        "Legal and Other Requirements",
        "Evaluation of Compliance",
        "Management of Change",
        "Sustainability",
      ],
    },
    {
      icon: (
        <img
          src={icon9}
          alt="Risk and Incident Management"
          className="w-5 h-5"
        />
      ),
      label: "Risk and Incident Management",
      submenu: [
        "Environmental Aspects",
        "Environmental Impact Assessments",
        "Environmental Incidents",
        "Environmental Waste Management",
        "Health and Safety Hazards",
        "Health and Safety Risk Assessments",
        "Health and Safety Incidents",
        "Business Risks",
        "Accident and Incident Investigations",
      ],
    },
    {
      icon: <img src={icon10} alt="Energy Management" className="w-5 h-5" />,
      label: "Energy Management",
      submenu: [
        "Energy Review",
        "Energy Baselines",
        "Significant Energy Use and Consumptions",
        "Energy Involvement Opportunities",
        "Energy Action Plans",
      ],
    },
    {
      icon: (
        <img
          src={icon11}
          alt="Correction Corrective Actions & Preventive Actions"
          className="w-5 h-5"
        />
      ),
      label: "Correction Corrective Actions & Preventive Actions",
      submenu: ["Correction / Corrective Actions", "Preventive Actions"],
    },
    {
      icon: <img src={icon12} alt="Objectives & Targets" className="w-5 h-5" />,
      label: "Objectives & Targets",
      submenu: ["Objectives and KPIs", "Targets and Programs"],
    },
    {
      icon: <img src={icon13} alt="User Management" className="w-5 h-5" />,
      label: "User Management",
      submenu: ["Add User", "List User"],
    },
    {
      icon: (
        <img
          src={icon15}
          alt="Non Conformity Report Management"
          className="w-5 h-5"
        />
      ),
      label: "Non Conformity Report Management",
      submenu: ["Non-Conformity Reports"],
    },
    {
      icon: <img src={icon14} alt="Reports & Analysis" className="w-5 h-5" />,
      label: "Reports & Analysis",
      submenu: ["All"],
    },
    {
      icon: <img src={icon17} alt="Backup" className="w-5 h-5" />,
      label: "Backup",
    },
    {
      icon: <img src={icon18} alt="Log Out" className="w-5 h-5" />,
      label: "Log Out",
    },
  ]

  const imsMenuItems = [
    {
      icon: <img src={icon1} alt="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
      hasSubmenu: false,
    },
  ]



  const menuMapping = {
    quality: qmsMenuItems,
    environment: emsMenuItems,
    health: hmsMenuItems,
    energy: energyMenuItems,
    bcms: bcmsMenuItems,
    ams: amsMenuItems,
    ims: imsMenuItems,
    default: [] // Default empty menu list
  };

  const subMenuItems = [
    { full: "Quality", short: "QMS", bg: "#858585", id: "quality" },
    { full: "Environment", short: "EMS", bg: "#38E76C", id: "environment" },
    { full: "Health & Safety", short: "HMS", bg: "#F9291F", id: "health" },
    { full: "Energy", short: "EMS", bg: "#10B8FF", id: "energy" },
    { full: "BCMS", short: "BMS", bg: "#F310FF", id: "bcms" },
    { full: "AMS", short: "AMS", bg: "#DD6B06", id: "ams" },
    { full: "IMS", short: "IMS", bg: "#CBA301", id: "ims" },
  ];

  const toggleSidebar = (clickedBar) => {
    if (activeBar === clickedBar) {
      setActiveBar("none");
    } else {
      setActiveBar(clickedBar);
    }
  };

  const handleMenuClick = (item) => {

    if (activeBar === 'none' && item.label !== 'Log Out') {
      setActiveBar('first');
    }

    // Close any open submenu when clicking a menu without a submenu
    if (!item.submenu) {
      setExpandedMenu(null);
      setActiveSubmenu(null); // Reset active submenu when switching to a menu without submenu
    } else {
      // Toggle the clicked submenu
      setExpandedMenu(expandedMenu === item.label ? null : item.label);
    }

    setActiveMenu(item.label);

    if (item.label === "Dashboard") {
      navigate("/company/company-dashboard");
    }
    if (item.label === "Backup") {
      navigate("/company/company-backup");
    }
    if (item.label === "Log Out") {
      localStorage.removeItem("adminAuthToken");
      navigate("/company-login");
    }
  };

  const handleSubmenuClick = (subItem) => {
    setActiveSubmenu(subItem);
  };

  const submenuVariants = {
    initial: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const handleSecondSidebarClick = (itemId) => {
    setActiveSecondSidebar(itemId);
    setExpandedMenu(null); // Close any open submenus
    setActiveMenu("Dashboard"); // Reset active menu
  };

  // const getCurrentMenuItems = () => {
  //   if (!activeSecondSidebar) return menuMapping.default;
  //   return menuMapping[activeSecondSidebar] || menuItems;
  // };

  const getCurrentMenuItems = () => {
    if (!activeSecondSidebar) return qmsMenuItems; // Ensure default menu is set
    return menuMapping[activeSecondSidebar] || qmsMenuItems;
  };
  

  return (
    <div className="sidebar-main bg-[#1C1C24]" style={{ width: "371px" }}>
      <div className="h-[88px] flex justify-center items-center border-b border-[#383840]">
        <img src={logo} alt="" />
      </div>
      <div className="flex h-screen main-sidebar">
        {/* First Sidebar */}
        <div
          className={`transition-all duration-300 flex flex-col relative border-r border-[#383840]   ${
            activeBar === "first" ? "w-[301px]" : "w-[105px]"
          }`}
          // style={{minWidth:'105px', maxWidth:'301px'}}
        >
          <div className="flex items-center justify-center p-4 absolute right-[-30px] z-40">
            <button
              onClick={() => toggleSidebar("first")}
              className="p-1 rounded-full border border-[#383840] h-[28px] w-[28px] flex justify-center items-center bg-[#1C1C24]"
            >
              <img
                src={closeicon}
                alt="Toggle Sidebar"
                className={`w-3 h-3 transition-transform duration-300 ${
                  activeBar === "first" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto pb-24 pt-[10px] [scrollbar-width:thin] [scrollbar-color:rgb(28_28_36)_transparent] 
            [&::-webkit-scrollbar]:w-0
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#1C1C24]
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:border-[0.5px]
            [&::-webkit-scrollbar-thumb]:border-solid
            [&::-webkit-scrollbar-thumb]:border-transparent
            [&::-webkit-scrollbar-thumb]:bg-clip-padding
            hover:[&::-webkit-scrollbar-thumb]:bg-[#1C1C24]"
          >
             {getCurrentMenuItems().map((item, index) => (
              <div key={index}>
                <div
                  className={`flex items-center px-4 pb-3 cursor-pointer menu-item
                 ${activeMenu === item.label ? "active" : ""}
                 ${activeBar === "none" ? "none-active" : ""}`}
                  onClick={() => handleMenuClick(item)}
                >
                  <div className="p-0 m-0 pseudo-class"></div>
                  <div
                    className={`flex items-center space-x-4 w-full main-sidebar-menu ${
                      activeBar === "none" ? "justify-center" : ""
                    }`}
                  >
                    <div className="icons flex items-center">{item.icon}</div>
                    {activeBar === "first" && (
                      <div className="flex items-center justify-between w-full">
                        <span className="main-sidebar-label">{item.label}</span>
                        {item.submenu && (
                          <img
                            src={downarrow}
                            alt="drop-down"
                            className={`w-[12px] transition-transform duration-300 ${
                              expandedMenu === item.label
                                ? "rotate-180 active-dropdown"
                                : "rotate-0"
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Submenu */}
                <AnimatePresence>
                  {activeBar === "first" &&
                    item.submenu &&
                    expandedMenu === item.label && (
                      <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={submenuVariants}
                        className="overflow-hidden"
                      >
                        {item.submenu.map((subItem, subIndex, array) => (
                          <div
                            key={subIndex}
                            className={`pl-6 pr-4 pb-4 pt-1 cursor-pointer submenu-text relative flex items-start group
                  ${activeSubmenu === subItem ? "active" : ""}`}
                            onClick={() => handleSubmenuClick(subItem)}
                          >
                            {subIndex !== array.length - 1 && (
                              <div className="absolute left-[1.7rem] top-[18px] w-[2px] h-[calc(100%)] bg-[#363538]"></div>
                            )}
                            <div
                              className={`relative z-10 w-2 h-2 rounded-full bg-[#363538] mr-7 dots mt-[6px]
                  group-hover:bg-[#b8b8b8] duration-200
                  ${activeSubmenu === subItem ? "active" : ""}`}
                            ></div>
                            <span className="flex-1">{subItem}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Second Sidebar */}
        <div
          className={`bg-[#1C1C24] transition-all duration-300 ${
            activeBar === "first"
              ? "w-[70px]"
              : activeBar === "none"
              ? "w-[266px]"
              : "w-[70px]"
          }`}
        >
          <div className="mt-2">
            {subMenuItems.map((item, index) => (
              <div
                key={index}
                className={`px-0 py-[1px] cursor-pointer text-center font-medium ${
                  activeBar === "first"
                    ? "text-white justify-end flex"
                    : "text-white justify-center flex"
                }`}
                onClick={() => handleSecondSidebarClick(item.id)}
              >
                {activeBar === "first" ? (
                <div
                  style={{
                    backgroundColor: item.bg,
                    opacity: activeSecondSidebar && activeSecondSidebar !== item.id ? 0.5 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                  className="w-[55px] h-[40px] flex justify-center items-center rounded-l-md second-sidebar-short-text mb-3"
                >
                  {item.short}
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: item.bg,
                    opacity: activeSecondSidebar && activeSecondSidebar !== item.id ? 0.5 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                  className="w-[227px] px-4 py-2 rounded-full mb-3 flex justify-between items-center second-sidebar-tabs"
                >
                  <div className="flex items-center gap-2">
                    <img src={ximsletter} alt="" className="w-[14px]" />
                    <p className="second-sidebar-full-text">{item.full}</p>
                  </div>
                  <img
                    src={rightarrow}
                    alt=""
                    className="h-[12px] rightarrow"
                  />
                </div>
              )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySidebar;
