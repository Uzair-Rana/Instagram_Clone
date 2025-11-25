import React, { useState } from "react";
import { storiesData } from "../Components/StoriesData";
import StoriesBar from "../Components/StoriesBar";
import StoryViewer from "../Components/StoriesViewer";
import ProfileSidebar from "../Components/ProfileSidebar.jsx";
import Feed from "../Components/Feed";          // make sure this is imported
import { posts } from "../Components/feedData"; // static posts data

export default function HomePage() {
    const [stories, setStories] = useState(storiesData);
    const [selectedStory, setSelectedStory] = useState(null);

    return (
        <div className="flex">

            {/* LEFT SIDEBAR */}
            <ProfileSidebar />

            {/* MAIN CONTENT AREA */}
            <div className="ml-64 w-full max-w-2xl mx-auto">

                {/* STORIES BAR */}
                <StoriesBar
                    stories={stories}
                    onStoryClick={(story) => setSelectedStory(story)}
                />

                {/* STORY VIEWER (MODAL POPUP) */}
                {selectedStory && (
                    <StoryViewer
                        userData={selectedStory}
                        onClose={() => setSelectedStory(null)}
                    />
                )}

                {/* FEED */}
                <Feed posts={posts} />
            </div>
        </div>
    );
}
