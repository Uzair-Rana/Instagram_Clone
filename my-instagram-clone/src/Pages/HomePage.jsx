import React, { useState, useEffect } from "react";
import StoriesBar from "../Components/StoriesBar";
import StoryViewer from "../Components/StoriesViewer";
import ProfileSidebar from "../Components/ProfileSidebar";
import Feed from "../Components/Feed";
import CreatePostModal from "../Components/CreatePostModel";
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
        <div className="flex w-[80%]">
            <ProfileSidebar />
            <div className="ml-64 w-full mx-auto">

                {/* STORIES */}
                <StoriesBar
                    stories={stories}
                    setStories={setStories}
                    onStoryClick={(story) => setSelectedStory(story)}
                />

                {/* STORY VIEWER */}
                {selectedStory && (
                    <StoryViewer
                        userData={selectedStory}
                        onClose={() => setSelectedStory(null)}
                    />
                )}

                {/* FEED */}
                <Feed posts={posts} />

                {/* CREATE POST MODAL */}
                <CreatePostModal onPostCreated={fetchPosts} />
            </div>
        </div>
    );
}
