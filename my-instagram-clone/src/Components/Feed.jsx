import React from "react";
import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MoreHorizontal,
} from "lucide-react";

export default function Feed({ posts }) {
    return (
        <div className="flex flex-col gap-8 max-w-xl mx-auto mt-6">

            {posts.map((post) => (
                <div key={post.id} className="border border-gray-300 rounded-lg">

                    {/* -------- POST HEADER -------- */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={post.profilePic}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <p className="font-semibold text-sm">{post.username}</p>
                        </div>
                        <MoreHorizontal size={22} />
                    </div>

                    {/* -------- POST IMAGE -------- */}
                    <img
                        src={post.image}
                        className="w-full max-h-[550px] object-cover"
                    />

                    {/* -------- POST ACTIONS -------- */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-4">
                            <Heart className="cursor-pointer hover:scale-110 transition" />
                            <MessageCircle className="cursor-pointer hover:scale-110 transition" />
                            <Send className="cursor-pointer hover:scale-110 transition" />
                        </div>
                        <Bookmark className="cursor-pointer hover:scale-110 transition" />
                    </div>

                    {/* -------- LIKE COUNT -------- */}
                    <p className="font-semibold px-4 text-sm">{post.likes} likes</p>

                    {/* -------- CAPTION -------- */}
                    <div className="px-4 text-sm">
                        <span className="font-semibold mr-2">{post.username}</span>
                        {post.caption}
                    </div>

                    {/* -------- VIEW COMMENTS -------- */}
                    <p className="px-4 text-gray-500 text-sm mt-1 cursor-pointer">
                        View all {post.comments.length} comments
                    </p>

                    {/* -------- TIME AGO -------- */}
                    <p className="px-4 text-gray-400 text-xs uppercase mb-3">
                        {post.time}
                    </p>
                </div>
            ))}
        </div>
    );
}
