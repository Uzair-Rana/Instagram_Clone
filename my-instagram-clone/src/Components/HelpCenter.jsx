import React from "react";

export default function HelpCenter() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 flex justify-center items-start py-12 px-4">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-300 rounded-full opacity-30 blur-3xl"></div>

                <h1 className="text-4xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-6">
                    Help Center
                </h1>

                <p className="text-gray-600 text-center mb-8">
                    How can we help you today? Find answers to common questions below.
                </p>

                {/* FAQ Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition">
                        <h2 className="font-semibold text-pink-500 mb-2">How do I reset my password?</h2>
                        <p className="text-gray-600">
                            You can reset your password by going to the "Change Password" section in your account settings.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition">
                        <h2 className="font-semibold text-purple-500 mb-2">How do I update my profile?</h2>
                        <p className="text-gray-600">
                            Visit the "Edit Profile" page from the settings menu and update your details.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 via-pink-50 to-purple-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition">
                        <h2 className="font-semibold text-indigo-500 mb-2">Who can I contact for support?</h2>
                        <p className="text-gray-600">
                            You can contact our support team at <span className="text-blue-600 font-medium">support@example.com</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
