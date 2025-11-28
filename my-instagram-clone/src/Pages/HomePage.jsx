import React, { useState, useEffect } from "react";
import StoriesBar from "../Components/StoriesBar";
import StoryViewer from "../Components/StoriesViewer";
import ProfileSidebar from "../Components/ProfileSidebar";
import Feed from "../Components/Feed";
import CreatePost from "../Components/CreatePost";
import API from "../Api/Api.jsx";

export default function HomePage() {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const res = await API.get("/posts/");
            if (Array.isArray(res.data)) setPosts(res.data);
        } catch (err) {
            console.error("Failed to fetch posts", err);
        }
    };

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await API.get("/stories/feed/");
                if (Array.isArray(res.data)) setStories(res.data);
            } catch (err) {
                console.error("Failed to fetch stories", err);
            }
        };

        fetchStories();
        fetchPosts();
    }, []);

    return (
        <div className="flex">
            <ProfileSidebar />
            <div className="ml-64 w-full mx-auto">

                {/* STORIES */}
                <StoriesBar
                    stories={stories}
                    onStoryClick={(story) => setSelectedStory(story)}
                />

                {selectedStory && (
                    <StoryViewer
                        userData={selectedStory}
                        onClose={() => setSelectedStory(null)}
                    />
                )}

                {/* CREATE POST */}
                <CreatePost onPostCreated={fetchPosts} />

                {/* FEED */}
                <Feed posts={posts} />
            </div>
        </div>
    );
}
