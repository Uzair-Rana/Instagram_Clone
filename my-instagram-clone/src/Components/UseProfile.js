import { useEffect, useState } from "react";
import API, { resolveUrl } from "../Api/Api.jsx";

export default function useProfile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await API.get("/auth/me/");
                setProfile({
                    username: res.data.username,
                    name: res.data.name,
                    profilePic: resolveUrl(res.data.avatar),
                });
            } catch (err) {
                console.error("Failed to load profile:", err);
            }
        };

        loadProfile();
    }, []);

    return profile;
}
