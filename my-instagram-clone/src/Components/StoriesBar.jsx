// src/Components/StoriesBar.jsx
import React, { useRef } from "react";
import API, { resolveUrl } from "../Api/Api.jsx";

export default function StoriesBar({ stories, onStoryClick }) {
    const fileInputRef = useRef(null);

    const handleAddStory = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await API.post("/stories/create/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Story uploaded:", res.data);
            alert("Story uploaded successfully! Refresh page to see it.");
        } catch (err) {
            console.error("Error uploading story", err);
            alert("Failed to upload story.");
        }
    };

    if (!Array.isArray(stories)) return null;

    return (
        <div className="w-full flex gap-4 overflow-x-auto py-4 px-2 border-b border-gray-300 scrollbar-hide">
            <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => fileInputRef.current.click()}
            >
                <div className="p-[2px] rounded-full bg-blue-500">
                    <div className="bg-white p-[2px] rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl">
                            +
                        </div>
                    </div>
                </div>

                <p className="text-xs mt-1 w-16 truncate text-center">
                    Add Story
                </p>

                <input
                    type="file"
                    accept="image/*,video/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleAddStory}
                />
            </div>

            {stories.map((userStory) => {
                const uid = userStory.user_id ?? userStory.userId ?? userStory.id;
                const username = userStory.username ?? "unknown";
                const avatarRaw = userStory.avatar ?? null;
                const avatar = resolveUrl(avatarRaw) || "/default-avatar.png";
                const storiesList = Array.isArray(userStory.stories) ? userStory.stories : [];
                const hasUnviewed = storiesList.some((s) => !s.viewed);

                return (
                    <div
                        key={uid}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => onStoryClick(userStory)}
                    >
                        <div
                            className={`p-[2px] rounded-full ${
                                hasUnviewed
                                    ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div className="bg-white p-[2px] rounded-full">
                                <img
                                    src={avatar}
                                    className="w-16 h-16 rounded-full object-cover"
                                    alt={username}
                                />
                            </div>
                        </div>

                        <p className="text-xs mt-1 w-16 truncate text-center">
                            {username}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
