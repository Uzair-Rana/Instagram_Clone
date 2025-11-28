import React, { useState } from "react";
import API from "../Api/Api.jsx";

export default function CreatePost({ onPostCreated }) {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select an image or video.");

        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return alert("User not found in localStorage");

            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("author", user.id);
            formData.append("media", file);   // IMPORTANT!!!

            await API.post("/posts/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setCaption("");
            setFile(null);
            onPostCreated && onPostCreated();
            alert("Post uploaded successfully!");

        } catch (err) {
            console.error("Upload error:", err.response?.data || err);
            alert("Failed to upload post.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-4 bg-white border rounded-md shadow mb-4">
            <h2 className="text-lg font-semibold mb-3">Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="border p-2 w-full rounded mb-2"
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />

                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-2"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    {loading ? "Uploading..." : "Post"}
                </button>
            </form>
        </div>
    );
}
