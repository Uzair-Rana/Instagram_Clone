import React, { useState } from "react";
import API from "../Api/Api.jsx";
import useProfile from "../Components/UseProfile";

export default function ProfilePage() {
    const { profile, refreshProfile } = useProfile();

    const [username, setUsername] = useState(profile?.username || "");
    const [name, setName] = useState(profile?.name || "");
    const [avatarPreview, setAvatarPreview] = useState(profile?.profilePic);
    const [avatarFile, setAvatarFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        try {
            let form = new FormData();
            form.append("username", username);
            form.append("name", name);
            if (avatarFile) form.append("avatar", avatarFile);
            await API.put("/profile/update/", form, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            await refreshProfile();
            alert("Profile updated!");

        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="p-10 min-h-screen bg-gray-50 flex justify-center">
            <div className="bg-white shadow-sm border rounded-xl p-8 w-[420px]">
                <h1 className="text-2xl font-semibold mb-8 text-center">Edit Profile</h1>
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={avatarPreview || "https://i.pravatar.cc/150"}
                        className="w-28 h-28 rounded-full border object-cover shadow-sm"
                    />
                    <label
                        htmlFor="avatarInput"
                        className="mt-4 text-blue-600 font-medium cursor-pointer hover:underline"
                    >
                        Change Profile Photo
                    </label>

                    <input
                        id="avatarInput"
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="mb-5">
                    <label className="font-semibold text-sm text-gray-600">Username</label>
                    <input
                        className="border p-2 w-full rounded-lg bg-gray-100 focus:bg-white transition-all outline-none focus:ring-1 focus:ring-gray-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="font-semibold text-sm text-gray-600">Name</label>
                    <input
                        className="border p-2 w-full rounded-lg bg-gray-100 focus:bg-white transition-all outline-none focus:ring-1 focus:ring-gray-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg py-2 font-semibold"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
