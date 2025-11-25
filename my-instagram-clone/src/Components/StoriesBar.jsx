import React from "react";

export default function StoriesBar({ stories, onStoryClick }) {
    return (
        <div className="w-full flex gap-4 overflow-x-auto py-4 px-2 border-b border-gray-300 scrollbar-hide">
            {stories.map((userStory) => (
                <div
                    key={userStory.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => onStoryClick(userStory)}
                >
                    {/* Colored ring */}
                    <div
                        className={`p-[2px] rounded-full ${
                            userStory.viewed
                                ? "bg-gray-300"
                                : "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"
                        }`}
                    >
                        <div className="bg-white p-[2px] rounded-full">
                            <img
                                src={userStory.profilePic}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        </div>
                    </div>

                    <p className="text-xs mt-1 w-16 truncate text-center">
                        {userStory.username}
                    </p>
                </div>
            ))}
        </div>
    );
}
