import React, { useEffect, useState } from "react";

export default function StoryViewer({ userData, onClose }) {
    const [index, setIndex] = useState(0);
    const stories = userData.stories;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (index < stories.length - 1) {
                setIndex(index + 1);
            } else {
                onClose();
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [index]);

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

            <img
                src={stories[index].url}
                className="max-h-[80vh] object-contain rounded-xl"
            />

            <button
                className="absolute top-5 right-5 text-white text-3xl"
                onClick={onClose}
            >
                ✕
            </button>
        </div>
    );
}
