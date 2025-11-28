import React, { useState } from "react";
import API, { resolveUrl } from "../Api/Api.jsx";
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

            const res = await API.put("/profile/update/", form, {
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
        <div className="ml-64 p-8">

            <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

            <div className="flex flex-col gap-6 w-96">

                {/* Avatar Upload */}
                <div>
                    <img
                        src={avatarPreview || "/default-avatar.png"}
                        className="w-24 h-24 rounded-full mb-3 object-cover"
                    />
                    <input type="file" onChange={handleImageChange} />
                </div>

                {/* Username */}
                <div>
                    <label className="font-semibold">Username</label>
                    <input
                        className="border p-2 w-full rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="font-semibold">Name</label>
                    <input
                        className="border p-2 w-full rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
