import { Link } from "react-router-dom";
import { Home, User, Bookmark, Settings } from "lucide-react";
import useProfile from "../Components/useProfile";

export default function ProfileSidebar() {
    const { profile } = useProfile();

    if (!profile) return null;

    return (
        <div className="w-64 h-screen border-r border-gray-300 p-4 fixed left-0 top-0 bg-white">

            <div className="flex items-center gap-3 mb-8">
                <img
                    src={profile.profilePic || "/default-avatar.png"}
                    className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                    <h2 className="font-semibold">{profile.username}</h2>
                    <p className="text-sm text-gray-500">
                        {profile.name || "No name"}
                    </p>
                </div>
            </div>

            {/* Menu Options */}
            <div className="flex flex-col gap-4 font-medium">

                <Link to="/homepage" className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2">
                    <Home size={20} /> Home
                </Link>

                <Link to="/profile" className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2">
                    <User size={20} /> Profile
                </Link>

                <Link to="/saved" className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2">
                    <Bookmark size={20} /> Saved
                </Link>

                <Link to="/settings" className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2">
                    <Settings size={20} /> Settings
                </Link>
            </div>
        </div>
    );
}
