import React, { useState } from "react";
import API from "../api/API";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";

export default function EditProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [username, setUsername] = useState(user?.username || "");
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await API.put("/auth/update", { username, name });
            localStorage.setItem("user", JSON.stringify(response.data));
            alert("Profile updated successfully");
        } catch (err) {
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative circles like Instagram */}
                <div className="absolute -top-20 -right-16 w-40 h-40 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-yellow-300 rounded-full opacity-30 blur-3xl"></div>

                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    Edit Profile
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Update your account information
                </p>

                <div className="space-y-5">
                    {/* Username input */}
                    <div className="relative">
                        <UserIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md transition"
                        />
                    </div>

                    {/* Full Name input */}
                    <div className="relative">
                        <UserCircleIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md transition"
                        />
                    </div>

                    {/* Save button */}
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-3xl hover:scale-105 transform transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}
