// src/Components/StoriesBar.jsx
import React, { useRef } from "react";
import API, { resolveUrl } from "../Api/Api.jsx";

export default function StoriesBar({ stories, setStories, onStoryClick }) {
    const fileInputRef = useRef(null);

    const handleAddStory = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            await API.post("/stories/create/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // 🔥 Reload stories instantly
            const updated = await API.get("/stories/feed/");
            if (Array.isArray(updated.data)) {
                setStories(updated.data);
            }
        } catch (err) {
            console.error("Error uploading story", err);
            alert("Failed to upload story.");
        }
    };

    // 🔥 DELETE STORY
    const handleDeleteStory = async (storyId) => {
        if (!window.confirm("Delete this story?")) return;

        try {
            console.log(storyId)
            await API.delete(`/stories/delete/${storyId}/`);

            // Reload updated stories
            const updated = await API.get("/stories/feed/");
            if (Array.isArray(updated.data)) {
                setStories(updated.data);
            }
        } catch (err) {
            console.error("Failed to delete story", err);
            alert("Could not delete story.");
        }
    };

    if (!Array.isArray(stories)) return null;

    return (
        <div className="w-full flex gap-4 overflow-x-auto py-4 px-2 border-b border-gray-300 scrollbar-hide">

            {/* ADD STORY BUTTON */}
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

                <p className="text-xs mt-1 w-16 truncate text-center">Add Story</p>

                <input
                    type="file"
                    accept="image/*,video/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleAddStory}
                />
            </div>

            {/* EXISTING STORIES */}
            {stories.map((userStory) => {
                const uid = userStory.user_id ?? userStory.userId ?? userStory.id;
                const username = userStory.username ?? "unknown";
                const avatarRaw = userStory.avatar ?? null;
                const avatar = resolveUrl(avatarRaw) || "/default-avatar.png";
                const storiesList = Array.isArray(userStory.stories) ? userStory.stories : [];
                const hasUnviewed = storiesList.some((s) => !s.viewed);

                return (
                    <div key={uid} className="relative flex flex-col items-center">

                        {/* DELETE BUTTON (top-right) */}
                        <button
                            onClick={() => handleDeleteStory(storiesList[0]?.id)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-red-700"
                            title="Delete Story"
                        >
                            ✕
                        </button>

                        {/* Story Thumbnail */}
                        <div
                            className="cursor-pointer"
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

                            <p className="text-xs mt-1 w-16 truncate text-center">{username}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
