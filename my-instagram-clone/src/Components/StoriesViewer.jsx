// src/Components/StoriesViewer.jsx
import React, { useEffect, useState } from "react";
import API, { resolveUrl } from "../Api/Api.jsx";

export default function StoryViewer({ userData, onClose }) {
    const [index, setIndex] = useState(0);
    const stories = Array.isArray(userData?.stories) ? userData.stories : [];

    // Mark story as viewed when shown
    const markViewed = async (storyId) => {
        if (!storyId) return;
        try {
            // note: API baseURL contains /api so this resolves to /api/stories/view/:id/
            await API.post(`/stories/view/${storyId}/`);
        } catch (error) {
            console.log("Error marking story viewed:", error);
        }
    };

    useEffect(() => {
        if (stories[index]) {
            markViewed(stories[index].id);
        }

        const timer = setTimeout(() => {
            if (index < stories.length - 1) {
                setIndex(index + 1);
            } else {
                onClose();
            }
        }, 3000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, userData]);

    if (!stories.length) return null;

    const currentUrl = resolveUrl(stories[index].url) || "";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-50">

            {/* Progress bars */}
            <div className="absolute top-5 w-[90%] flex gap-1">
                {stories.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 bg-white/40 rounded-full ${
                            i === index ? "animate-progress" : ""
                        }`}
                    />
                ))}
            </div>

            {currentUrl ? (
                <img
                    src={currentUrl}
                    className="max-h-[80vh] object-contain rounded-xl"
                    alt="story"
                />
            ) : (
                <div className="text-white">Unable to load story</div>
            )}

            <button
                className="absolute top-5 right-5 text-white text-3xl"
                onClick={onClose}
            >
                ✕
            </button>
        </div>
    );
}
