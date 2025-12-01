import React, { useState } from "react";
import API from "../Api/Api.jsx";
import { LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            return alert("Passwords do not match");
        }

        setLoading(true);
        try {
            await API.post("/auth/change-password", {
                oldPassword,
                newPassword,
            });
            alert("Password changed successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            alert("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-16 w-40 h-40 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-yellow-300 rounded-full opacity-30 blur-3xl"></div>

                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    Change Password
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Update your account password below
                </p>

                <div className="space-y-5">
                    {/* Old Password */}
                    <div className="relative">
                        <KeyIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md transition"
                        />
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <LockClosedIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md transition"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <LockClosedIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md transition"
                        />
                    </div>

                    {/* Update Button */}
                    <button
                        onClick={handlePasswordChange}
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-3xl hover:scale-105 transform transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </div>
        </div>
    );
}
