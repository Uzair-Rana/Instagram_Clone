import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaLock, FaQuestionCircle, FaShieldAlt, FaSignOutAlt } from "react-icons/fa";

export default function SettingsPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const settingsOptions = [
        { label: "Edit Profile", icon: <FaUserEdit />, onClick: () => navigate("/edit-profile") },
        { label: "Change Password", icon: <FaLock />, onClick: () => navigate("/change-password") },
        { label: "Help Center", icon: <FaQuestionCircle />, onClick: () => navigate("/help-center") },
        { label: "Privacy Policy", icon: <FaShieldAlt />, onClick: () => navigate("/privacy-policy") },
        { label: "Logout", icon: <FaSignOutAlt />, onClick: handleLogout, color: "bg-red-500 hover:bg-red-600 text-white" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 flex flex-col items-center justify-start py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative blurred circles */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-300 rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>

                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    Settings
                </h1>

                <div className="space-y-4">
                    {settingsOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={option.onClick}
                            className={`flex items-center w-full p-4 rounded-2xl shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-xl ${
                                option.color ? option.color : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            }`}
                        >
                            <span className="text-xl mr-4">{option.icon}</span>
                            <span className="text-lg font-medium">{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
