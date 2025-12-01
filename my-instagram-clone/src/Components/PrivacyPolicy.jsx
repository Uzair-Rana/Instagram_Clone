import React from "react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 flex justify-center items-start py-12 px-4">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative blurred circles */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-300 rounded-full opacity-30 blur-3xl"></div>

                <h1 className="text-4xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-6">
                    Privacy Policy
                </h1>

                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Information We Collect</h2>
                        <p className="text-gray-600">
                            We may collect information such as your name, email address, and usage data to provide and improve our services. All data is handled securely.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <h2 className="text-2xl font-semibold text-purple-500 mb-2">How We Use Your Data</h2>
                        <p className="text-gray-600">
                            Your data helps us personalize your experience, enhance our services, and communicate important updates. We never sell your personal information.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 via-pink-50 to-purple-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <h2 className="text-2xl font-semibold text-indigo-500 mb-2">Security</h2>
                        <p className="text-gray-600">
                            We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Contact Us</h2>
                        <p className="text-gray-600">
                            If you have any questions about this Privacy Policy, feel free to contact us at <span className="font-medium text-blue-600">support@example.com</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
