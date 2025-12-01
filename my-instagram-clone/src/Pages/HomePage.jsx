import React, { useState, useEffect } from "react";
import StoriesBar from "../Components/StoriesBar";
import StoryViewer from "../Components/StoriesViewer";
import ProfileSidebar from "../Components/ProfileSidebar";
import Feed from "../Components/Feed";
import CreatePostModal from "../Components/CreatePostModel";
import API from "../Api/Api.jsx";
import Suggestions from "../Components/Suggestions.jsx";

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
        <div className="flex w-full bg-gray-50 min-h-screen">
            {/* SIDEBAR */}
            <div className="fixed left-0 top-0 h-full w-64 border-r bg-white shadow-sm">
                <ProfileSidebar />
            </div>

            {/* MAIN CONTENT */}
            <div className="ml-64 w-full flex justify-center">
                <div className="w-full max-w-[600px] px-6">
                    {/* STORIES BAR */}
                    <div className="mt-6">
                        <StoriesBar
                            stories={stories}
                            setStories={setStories}
                            onStoryClick={(story) => setSelectedStory(story)}
                        />
                    </div>

                    {/* STORY VIEWER */}
                    {selectedStory && (
                        <StoryViewer
                            userData={selectedStory}
                            onClose={() => setSelectedStory(null)}
                        />
                    )}

                    {/* FEED */}
                    <div className="mt-6 space-y-6">
                        <Feed posts={posts} />
                    </div>

                    {/* CREATE POST */}
                    <div className="mt-10 pb-10 flex justify-center">
                        <CreatePostModal onPostCreated={fetchPosts} />
                    </div>
                </div>

                {/* SUGGESTIONS / RIGHT SIDEBAR */}
                <div className="hidden lg:block w-[340px] px-4">
                    <div className="sticky top-10 space-y-6">
                        <Suggestions />
                    </div>
                </div>
            </div>
        </div>
    );
}
