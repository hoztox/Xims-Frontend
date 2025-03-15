import { toast } from "react-hot-toast";
import { BASE_URL } from "./Utils/Config";
import axios from "axios";

export function getLocal() {
  return localStorage.getItem("authToken");
}

export async function adminLogin(email, password) {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/login/`, {
            email,
            password,
        });

        const data = response.data;

        if (response.status === 200) {
            const adminToken = data.access;  
            localStorage.setItem('adminAuthToken', adminToken); 
            toast.success('Admin Login Success');
            return data;
        } else {
            toast.error('Invalid Admin Credentials');
            return null;
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        toast.error('An error occurred during admin login');
        return null;
    }
}


export async function companyLogin(email, password) {
    try {
        const response = await axios.post(`${BASE_URL}/company/company/login/`, {
            email,
            password,
        });

        if (response.status === 200) {
            const { access, refresh, ...companyData } = response.data; // Extract all data except tokens

            console.log("Access Token:", access);
            console.log("Refresh Token:", refresh);
            console.log("Company Data:", companyData); 

            // Store tokens
            localStorage.setItem("companyAccessToken", access);
            localStorage.setItem("companyRefreshToken", refresh);

            // Store all company data
            Object.keys(companyData).forEach((key) => {
                localStorage.setItem(`company_${key}`, JSON.stringify(companyData[key]));
            });

            toast.success("Admin Login Success");
            return response.data;
        } else {
            toast.error("Invalid Admin Credentials");
            return null;
        }
    } catch (error) {
        console.error("Error during admin login:", error);
        toast.error(error.response?.data?.error || "An error occurred during admin login.");
        return null;
    }
}


