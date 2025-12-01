// src/Components/StoriesViewer.jsx
import React, { useEffect, useState, useRef } from "react";
import API, { resolveUrl } from "../Api/Api.jsx";

export default function StoryViewer({ userData, onClose }) {
    const [index, setIndex] = useState(0);
    const stories = Array.isArray(userData?.stories) ? userData.stories : [];
    const timeoutRef = useRef(null);

    // Mark story as viewed when displayed
    const markViewed = async (storyId) => {
        if (!storyId) return;
        try {
            await API.post(`/stories/view/${storyId}/`);
        } catch (error) {
            console.log("Error marking story viewed:", error);
        }
    };

    useEffect(() => {
        if (!stories.length) return;

        markViewed(stories[index].id);

        timeoutRef.current = setTimeout(() => {
            if (index < stories.length - 1) {
                setIndex(index + 1);
            } else {
                onClose();
            }
        }, 3000);

        return () => clearTimeout(timeoutRef.current);
    }, [index, stories]);

    if (!stories.length) return null;

    const currentUrl = resolveUrl(stories[index].url) || "";

    const handlePrev = () => {
        if (index > 0) setIndex(index - 1);
    };

    const handleNext = () => {
        if (index < stories.length - 1) setIndex(index + 1);
        else onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-50">
            {/* Progress bars */}
            <div className="absolute top-5 w-[90%] flex gap-1">
                {stories.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 bg-white/40 rounded-full overflow-hidden relative`}
                    >
                        {i <= index && (
                            <div
                                className={`h-1 bg-white rounded-full transition-all duration-300`}
                                style={{ width: i === index ? "100%" : "100%" }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation overlays */}
            <div
                className="absolute inset-0 flex"
                onClick={(e) => {
                    const { clientX } = e;
                    const mid = window.innerWidth / 2;
                    if (clientX < mid) handlePrev();
                    else handleNext();
                }}
            />

            {/* Story content */}
            {currentUrl ? (
                <img
                    src={currentUrl}
                    className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-lg"
                    alt="story"
                />
            ) : (
                <div className="text-white">Unable to load story</div>
            )}

            {/* Close button */}
            <button
                className="absolute top-5 right-5 text-white text-3xl font-bold hover:scale-110 transition-transform"
                onClick={onClose}
            >
                ✕
            </button>

            {/* User info */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
                <img
                    src={resolveUrl(userData.avatar) || "/default-avatar.png"}
                    alt={userData.username}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <span className="text-white font-semibold">{userData.username}</span>
            </div>
        </div>
    );
}
