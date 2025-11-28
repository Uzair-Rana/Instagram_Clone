import React from "react";
import { User, Lock, Bell, HelpCircle, LogOut } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex flex-col items-center w-full p-6">

            {/* HEADER */}
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            {/* SETTINGS CARD */}
            <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 border border-gray-200">

                {/* Account */}
                <SectionTitle title="Account" />
                <SettingItem icon={<User size={20} />} label="Edit Profile" />
                <SettingItem icon={<Lock size={20} />} label="Change Password" />

                {/* Notifications */}
                <SectionTitle title="Notifications" />
                <SettingItem icon={<Bell size={20} />} label="Push Notifications" />
                <SettingItem icon={<Bell size={20} />} label="Story Notifications" />

                {/* Support */}
                <SectionTitle title="Support & About" />
                <SettingItem icon={<HelpCircle size={20} />} label="Help Center" />
                <SettingItem icon={<HelpCircle size={20} />} label="Privacy Policy" />

                {/* Logout */}
                <div className="mt-6">
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600">
                        <LogOut className="inline-block mr-2" size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

function SettingItem({ icon, label }) {
    return (
        <div className="flex items-center gap-3 py-3 px-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            {icon}
            <p className="text-gray-700">{label}</p>
        </div>
    );
}

function SectionTitle({ title }) {
    return (
        <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-2 border-b pb-1">
            {title}
        </h2>
    );
}
