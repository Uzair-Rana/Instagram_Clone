import { Link } from "react-router-dom";
import { Home, User, Bookmark, Settings } from "lucide-react";
import useProfile from "../Components/useProfile";

export default function ProfileSidebar() {
    const { profile } = useProfile();

    if (!profile) return null;

    return (
        <div className="w-64 h-screen border-r border-gray-200 p-4 fixed left-0 top-0 bg-white flex flex-col justify-between">

            {/* User Info */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <img
                        src={profile.profilePic || "/default-avatar.png"}
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                        alt="Profile"
                    />
                    <div>
                        <h2 className="font-semibold text-gray-800">{profile.username}</h2>
                        <p className="text-sm text-gray-500">{profile.name || "No name"}</p>
                    </div>
                </div>

                {/* Menu Options */}
                <div className="flex flex-col gap-3 font-medium">
                    <Link
                        to="/homepage"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Home size={20} className="text-gray-600" />
                        <span className="text-gray-800">Home</span>
                    </Link>

                    <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <User size={20} className="text-gray-600" />
                        <span className="text-gray-800">Profile</span>
                    </Link>

                    <Link
                        to="/saved"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Bookmark size={20} className="text-gray-600" />
                        <span className="text-gray-800">Saved</span>
                    </Link>

                    <Link
                        to="/settings"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Settings size={20} className="text-gray-600" />
                        <span className="text-gray-800">Settings</span>
                    </Link>
                </div>
            </div>

            {/* Footer / Optional Logout */}
            <div className="text-sm text-gray-400 text-center mt-8">
                © 2025 MyInstagramClone
            </div>
        </div>
    );
}
