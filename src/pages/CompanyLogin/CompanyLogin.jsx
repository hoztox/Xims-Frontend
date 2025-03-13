import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../Utils/Config";
import "./companylogin.css";
import logo from "../../assets/images/logo.svg";

import img1 from "../../assets/images/Company-Login/cmy1.png"
import img2 from "../../assets/images/Company-Login/cmy2.png"
import img3 from "../../assets/images/Company-Login/cmy3.png"
import img4 from "../../assets/images/Company-Login/cmy4.png"
import img5 from "../../assets/images/Company-Login/cmy5.png"
import img6 from "../../assets/images/Company-Login/cmy6.png"

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Username and Password are required");
            return;
        }

        try {
            setLoading(true);
            console.log("Attempting to send request to backend...");
            const response = await axios.post(`${BASE_URL}/company/company/login/`, {
                email: email,
                password: password,
            });
            console.log("Response:", response);
            if (response.status === 200) {
                const adminToken = response.data.access;
                const expirationTime = 24 * 60 * 60 * 1000;
                const logoutTime = new Date().getTime() + expirationTime;

                localStorage.setItem("adminAuthToken", adminToken);
                localStorage.setItem("logoutTime", logoutTime);

                toast.success("Successfully Logged In");
                setTimeout(() => {
                    navigate("/company/dashboard");
                }, 500);

            } else {
                throw new Error(response.data.error || "Login failed");
            }
        } catch (error) {
            console.error("Error during login request:", error);
            if (error.response && error.response.status === 400) {
                toast.error("Invalid username or password");
            } else {
                toast.error(
                    error.message ||
                    "An error occurred during login. Please try again later."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const adminToken = localStorage.getItem("adminAuthToken");
        const logoutTime = localStorage.getItem("logoutTime");

        if (adminToken && logoutTime) {
            const currentTime = new Date().getTime();
            if (currentTime >= logoutTime) {
                // Token has expired, perform logout
                localStorage.removeItem("adminAuthToken");
                localStorage.removeItem("logoutTime");
                navigate("/company-login");
            } else {
                navigate("/company/dashboard");
            }
        }
    }, [navigate]);

    return (
        <div className="flex flex-col h-screen items-center justify-center companyloginscreen">
            <Toaster position="top-center" />
            {/* Logo Section */}
            <div className="adminloginstyle">
                <div className="mb-9 mt-14">
                    <p className="text-[#52D3D8] loginheadtext">
                        Solutions you can count on.
                    </p>
                    <p className="text-[#52D3D8] loginheadtext">Partners you can trust. </p>
                </div>

                {/* Login Card Section */}
                <div className="flex ">
                    <div className="rounded-lg shadow-lg mains">
                        <h2 className="mb-7 lg:ml-12 text-white loginheading">Company Login</h2>
                        <form className="space-y-6" onSubmit={handleSubmit} >
                            <div className="relative">
                                <label className="labels">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="rounded-lg bg-[#161C23] mt-1 email outline-none inputs border-transparent"
                                />
                            </div>

                            <div className="relative">
                                <label className="labels">Password</label>
                                <div className="relative w-full">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="rounded-lg w-full bg-[#161C23] text-[#72787C] mt-1 outline-none inputs border-transparent"
                                    />
                                    <span
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? (
                                            <IoEyeOff size={20} className="text-white" />
                                        ) : (
                                            <IoEye size={20} className="text-white" />
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm text-white">
                                <Link
                                    to=""
                                    className="hover:underline forgotpassword"
                                >
                                    Forgot password?
                                </Link>
                                <Link
                                    to="/"
                                    className="hover:underline adminlogin">
                                    Admin Login
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#3C3B3B] text-white py-2 px-4 rounded-lg my-6 hover:bg-[#2d2d2d] transition signin"
                                disabled={loading}
                            >
                                {loading ? "Signing In..." : <p>Sign In</p>}
                            </button>
                        </form>
                    </div>
                    <div className="flex absolute flex-col justify-end items-center right-0 w-1/3 company-login-screen">
                        <div className="flex gap-2 relative">
                            <img src={img1} alt="comapny-login-picture" className="h-[165px] w-[148px] pic1 cursor-pointer duration-300" />
                            <img src={img2} alt="comapny-login-picture" className="h-[165px] w-[148px] pic2 cursor-pointer duration-300" />
                            <img src={img3} alt="comapny-login-picture" className="h-[165px] w-[148px] pic3 cursor-pointer duration-300" />
                        </div>
                        <div className="flex gap-2 absolute top-[134px]">
                            <img src={img4} alt="comapny-login-picture" className="h-[165px] w-[148px] pic4 cursor-pointer duration-300" />
                            <img src={img5} alt="comapny-login-picture" className="h-[165px] w-[148px] pic5 cursor-pointer duration-300" />
                        </div>
                        <div className="flex absolute top-[268px]">
                            <img src={img6} alt="comapny-login-picture" className="h-[165px] w-[148px] pic6 cursor-pointer duration-300" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-bottom">
                <img src={logo} alt="" className="footerlogo" />
                <p className="rightstext">© 2024 All rights reserved</p>
            </div>
        </div>
    );
};

export default AdminLogin;
