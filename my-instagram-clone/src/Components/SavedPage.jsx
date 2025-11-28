import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { resolveUrl } from "../Api/Api.jsx";

export default function SavedPostsPage() {

    // Dummy saved posts (you can replace with API data later)
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        // Dummy data for UI look (replace with API result)
        setSavedPosts([
            {
                id: 1,
                image: "https://picsum.photos/400/400?random=1"
            },
            {
                id: 2,
                image: "https://picsum.photos/400/400?random=2"
            },
            {
                id: 3,
                image: "https://picsum.photos/400/400?random=3"
            },
            {
                id: 4,
                image: "https://picsum.photos/400/400?random=4"
            },
            {
                id: 5,
                image: "https://picsum.photos/400/400?random=5"
            },
            {
                id: 6,
                image: "https://picsum.photos/400/400?random=6"
            }
        ]);
    }, []);

    return (
        <div className="p-6 w-full flex flex-col">

            {/* PAGE HEADER */}
            <div className="flex items-center gap-2 mb-6">
                <Bookmark size={24} className="text-blue-500" />
                <h1 className="text-2xl font-bold">Saved Posts</h1>
            </div>

            {/* GRID OF SAVED POSTS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {savedPosts.length === 0 ? (
                    <p className="text-gray-500">No saved posts yet.</p>
                ) : (
                    savedPosts.map(post => (
                        <div
                            key={post.id}
                            className="relative group cursor-pointer rounded-md overflow-hidden shadow-sm"
                        >
                            <img
                                src={post.image}
                                alt="saved"
                                className="w-full h-48 object-cover group-hover:brightness-75 transition"
                            />

                            {/* Hover Bookmark Icon */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                                <Bookmark size={20} className="text-white drop-shadow" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
