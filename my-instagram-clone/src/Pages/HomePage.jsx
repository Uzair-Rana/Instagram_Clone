import React, { useState } from "react";
import { storiesData } from "../Components/StoriesData";
import StoriesBar from "../Components/StoriesBar";
import StoryViewer from "../Components/StoriesViewer";

export default function HomePage() {
    const [stories, setStories] = useState(storiesData);
    const [selectedStory, setSelectedStory] = useState(null);

    return (
        <div>
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
        </div>
    );
}
