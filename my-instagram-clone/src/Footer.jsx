import React from "react";

export default function Footer() {
    const links = [
        { label: "Meta", url: "https://about.meta.com/" },
        { label: "About", url: "https://about.instagram.com/" },
        { label: "Blog", url: "https://about.instagram.com/blog/" },
        { label: "Jobs", url: "https://about.instagram.com/about-us/careers" },
        { label: "Help", url: "https://help.instagram.com/" },
        { label: "API", url: "https://developers.facebook.com/docs/instagram" },
        { label: "Privacy", url: "/legal/privacy/?hl=en" },
        { label: "Terms", url: "/legal/terms/?hl=en" },
        { label: "Locations", url: "/explore/locations/?hl=en" },
        { label: "Instagram Lite", url: "/web/lite/?hl=en" },
        { label: "Meta AI", url: "https://www.meta.ai/?utm_source=foa_web_footer" },
        {
            label: "Meta AI Articles",
            url: "https://www.meta.ai/pages/ford-f-150-truck-features-and-accessories/?utm_source=foa_web_footer",
        },
        { label: "Threads", url: "https://www.threads.com/" },
        {
            label: "Contact Uploading & Non-Users",
            url: "https://www.facebook.com/help/instagram/261704639352628?hl=en",
        },
        {
            label: "Meta Verified",
            url: "/accounts/meta_verified/?entrypoint=web_footer&hl=en",
        },
    ];

    const languages = [
        "English",
        "Afrikaans",
        "العربية",
        "Čeština",
        "Dansk",
        "Deutsch",
        "Ελληνικά",
        "English (UK)",
        "Español",
        "Español (España)",
        "فارسی",
        "Suomi",
        "Français",
        "हिन्दी",
        "Italiano",
        "日本語",
        "한국어",
        "Nederlands",
        "Polski",
        "Português",
        "Русский",
        "Türkçe",
        "中文(简体)",
    ];

    return (
        <footer className="w-full py-5 mt-10 text-[#737373] text-sm">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            <div className="flex justify-center items-center gap-4">
                <select className="px-2 py-1 bg-white text-sm">
                    {languages.map((lang, index) => (
                        <option key={index} value={lang.toLowerCase()}>
                            {lang}
                        </option>
                    ))}
                </select>

                <span>© {new Date().getFullYear()} Instagram</span>
            </div>
        </footer>
    );
}
