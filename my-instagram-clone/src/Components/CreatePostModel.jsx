import React, { useState } from "react";
import CreatePost from "./CreatePost";

export default function CreatePostModal({ onPostCreated }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating + Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-1/2 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-4xl shadow-xl hover:bg-blue-700 transition duration-300 z-50"
            >
                +
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
                    onClick={() => setOpen(false)}
                >
                    {/* Modal Box */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-96 bg-white p-5 rounded-xl shadow-xl animate-scaleIn"
                    >
                        <CreatePost
                            onPostCreated={() => {
                                onPostCreated();
                                setOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
