import React from "react";
import { Home, User, Bookmark, Settings, LogOut, SwitchCamera } from "lucide-react";
import useProfile from "./UseProfile.js";
import { Link } from "react-router-dom";

export default function ProfileSidebar() {
    const profileData = useProfile();

    if (!profileData) return null;

    return (
        <div className="w-64 h-screen border-r border-gray-300 p-4 fixed left-0 top-0">

            {/* Profile Section */}
            <div className="flex items-center gap-3 mb-8">
                <img
                    src={profileData.profilePic || "/default-avatar.png"}
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                    <h2 className="font-semibold">{profileData.username}</h2>
                    <p className="text-sm text-gray-500">{profileData.name}</p>
                </div>
            </div>

            {/* Menu Options */}
            <div className="flex flex-col gap-4 font-medium">

                <Link
                    to="/homepage"
                    className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2"
                >
                    <Home size={20} />
                    Home
                </Link>

                <Link
                    to="/profile"
                    className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2"
                >
                    <User size={20} />
                    Profile
                </Link>

                <Link
                    to="/saved"
                    className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2"
                >
                    <Bookmark size={20} />
                    Saved
                </Link>

                <Link
                    to="/settings"
                    className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2"
                >
                    <Settings size={20} />
                    Settings
                </Link>

                <button className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2">
                    <SwitchCamera size={20} />
                    Switch Account
                </button>

                <button className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 text-red-600">
                    <LogOut size={20} />
                    Logout
                </button>

            </div>
        </div>
    );
}
