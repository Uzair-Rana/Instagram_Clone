import React, { useEffect, useState } from "react";
import { resolveUrl } from "../Api/Api.jsx";
import { Heart, MessageCircle } from "lucide-react";

export default function Feed({ posts }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    if (!Array.isArray(posts)) return null;

    const mappedPosts = posts.map((post) => {
        const author = post.author || {};
        const profileAvatarRaw =
            author.profile?.avatar ?? author.profile_avatar ?? author.avatar ?? null;
        const profilePic = resolveUrl(profileAvatarRaw) || "/default-avatar.png";
        const media = Array.isArray(post.media) ? post.media : [];
        const firstMediaUrl = media.length > 0 ? resolveUrl(media[0].file) : null;
        const comments = Array.isArray(post.comments)
            ? post.comments.map((c) => c.text || "")
            : [];
        return {
            id: post.id,
            username: author.username || "unknown",
            profilePic,
            image: firstMediaUrl,
            likes: post.likes_count ?? post.likes?.length ?? 0,
            caption: post.caption || "",
            comments,
            time: post.created_at ? new Date(post.created_at).toLocaleString() : "",
        };
    });

    return (
        <div className="flex flex-col gap-6 mt-4 ml-0">
            {mappedPosts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-4"
                >
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={post.profilePic}
                            alt={post.username}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-0.5"
                        />
                        <p className="font-semibold text-gray-800">{post.username}</p>
                    </div>

                    {/* Post Image */}
                    {post.image && (
                        <img
                            src={post.image}
                            alt="post"
                            className="w-full max-h-[500px] object-cover rounded-2xl mb-3"
                        />
                    )}

                    {/* Caption */}
                    <p className="mb-2 text-gray-800">
                        <span className="font-semibold">{post.username} </span>
                        {post.caption}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mb-2">
                        <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer transition" />
                        <MessageCircle className="w-6 h-6 text-gray-600 hover:text-blue-500 cursor-pointer transition" />
                        <span className="text-sm text-gray-600">{post.likes} likes</span>
                    </div>

                    {/* Comments */}
                    <div className="text-sm text-gray-700 mb-2 space-y-1">
                        {post.comments.map((comment, idx) => (
                            <p key={idx}>
                                <span className="font-semibold text-gray-800">{post.username} </span>
                                {comment}
                            </p>
                        ))}
                    </div>

                    {/* Time */}
                    <p className="text-xs text-gray-400">{post.time}</p>

                    {/* Logged-in user info */}
                    {user && (
                        <p className="text-xs text-gray-400 mt-1">
                            Logged in as: {user.username}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
