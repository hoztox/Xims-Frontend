import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {


  const navigate = useNavigate();
  useEffect(() => {
    const access = localStorage.getItem("companyAccessToken");
    if (!access) {
        navigate("/company-login");
    } else {
        navigate("/company/dashboard");
    }
}, [navigate]);
  useEffect(() => {
    const refresh = localStorage.getItem("companyAccessToken");
    if (!refresh) {
        navigate("/company-login");
    } else {
        navigate("/company/dashboard");
    }
}, [navigate]);



  return (
    <div className='text-white text-center'>
      Dashboard Page
    </div>
  )
}

export default CompanyDashboard
