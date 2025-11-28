import React, { useEffect, useState } from "react";
import { resolveUrl } from "../Api/Api.jsx";

export default function Feed({ posts }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(user)
        } else {
            console.warn("User not found in localStorage. Please login.");
        }
    }, []);

    if (!Array.isArray(posts)) return null;

    const mappedPosts = posts.map(post => {
        const author = post.author || {};
        const profileAvatarRaw =
            author.profile?.avatar ??
            author.profile_avatar ??
            author.avatar ??
            null;

        const profilePic = resolveUrl(profileAvatarRaw) || "/default-avatar.png";

        const media = Array.isArray(post.media) ? post.media : [];
        const firstMediaUrl =
            media.length > 0 ? resolveUrl(media[0].file) : null;

        const comments = Array.isArray(post.comments)
            ? post.comments.map(c => c.text || "")
            : [];

        return {
            id: post.id,
            username: author.username || "unknown",
            profilePic,
            image: firstMediaUrl,
            likes: post.likes_count ?? post.likes?.length ?? 0,
            caption: post.caption || "",
            comments,
            time: post.created_at
                ? new Date(post.created_at).toLocaleString()
                : "",
        };
    });

    return (
        <div className="flex flex-col gap-6 mt-4 ml-0">
            {mappedPosts.map(post => (
                <div key={post.id} className="bg-white border border-gray-300 rounded-md shadow-sm p-4">

                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={post.profilePic}
                            alt={post.username}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <p className="font-semibold">{post.username}</p>
                    </div>

                    {/* MEDIA */}
                    {post.image && (
                        <img
                            src={post.image}
                            alt="post"
                            className="w-full max-h-[500px] object-cover rounded-md mb-2"
                        />
                    )}

                    {/* CAPTION */}
                    <p className="mb-2">{post.caption}</p>

                    {/* LIKES */}
                    <p className="text-sm font-semibold mb-1">{post.likes} likes</p>

                    {/* COMMENTS */}
                    <div className="text-sm text-gray-700">
                        {post.comments.map((comment, idx) => (
                            <p key={idx}>{comment}</p>
                        ))}
                    </div>

                    {/* TIME */}
                    <p className="text-xs text-gray-400 mt-2">{post.time}</p>

                    {/* Optional: Show user info if available */}
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
