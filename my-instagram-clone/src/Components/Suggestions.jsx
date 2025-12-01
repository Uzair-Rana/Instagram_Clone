import React from "react";

export default function Suggestions() {
    const suggestions = [
        { id: 1, username: "john_doe", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, username: "jane_smith", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, username: "alex_92", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: 4, username: "emma_w", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: 5, username: "mike_007", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 6, username: "sara_p", avatar: "https://i.pravatar.cc/150?img=6" },
        { id: 7, username: "tommy_77", avatar: "https://i.pravatar.cc/150?img=7" },
        { id: 8, username: "lisa_b", avatar: "https://i.pravatar.cc/150?img=8" },
        { id: 9, username: "chris_k", avatar: "https://i.pravatar.cc/150?img=9" },
        { id: 10, username: "nina_r", avatar: "https://i.pravatar.cc/150?img=10" },
        { id: 11, username: "paul_t", avatar: "https://i.pravatar.cc/150?img=11" },
        { id: 12, username: "kate_m", avatar: "https://i.pravatar.cc/150?img=12" }
    ];

    return (
        <div className="w-full h-screen p-4 flex flex-col bg-gray-50 rounded-2xl">
            <h2 className="font-semibold text-gray-700 mb-4 text-lg">
                Suggestions for you
            </h2>

            {/* Scrollable suggestions list */}
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-80px)] pr-2">
                {suggestions.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 hover:border-blue-400 transition"
                            />
                            <span className="font-medium text-sm text-gray-800 hover:underline">
                                {user.username}
                            </span>
                        </div>
                        <button className="text-blue-500 text-sm font-semibold hover:text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition">
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
