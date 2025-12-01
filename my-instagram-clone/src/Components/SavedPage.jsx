import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { resolveUrl } from "../Api/Api.jsx";

export default function SavedPostsPage() {
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        setSavedPosts([
            { id: 1, image: "https://picsum.photos/400/400?random=1" },
            { id: 2, image: "https://picsum.photos/400/400?random=2" },
            { id: 3, image: "https://picsum.photos/400/400?random=3" },
            { id: 4, image: "https://picsum.photos/400/400?random=4" },
            { id: 5, image: "https://picsum.photos/400/400?random=5" },
            { id: 6, image: "https://picsum.photos/400/400?random=6" }
        ]);
    }, []);

    return (
        <div className="p-8 w-full flex flex-col bg-white">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                    <Bookmark size={22} />
                </div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Saved Posts
                </h1>
            </div>

            {/* GRID SECTION */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {savedPosts.length === 0 ? (
                    <p className="text-gray-500 text-lg">No saved posts yet.</p>
                ) : (
                    savedPosts.map((post) => (
                        <div
                            key={post.id}
                            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm bg-gray-100"
                        >
                            {/* Image */}
                            <img
                                src={post.image}
                                alt="saved post"
                                className="w-full h-52 object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                            />

                            {/* Hover Bookmark Icon */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300">
                                <div className="bg-black/50 p-1.5 rounded-full">
                                    <Bookmark size={18} className="text-white" />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
