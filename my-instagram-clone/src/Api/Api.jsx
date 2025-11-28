import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


function resolveUrl(url) {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    const apiBase = API.defaults.baseURL || "";
    const serverRoot = apiBase.replace(/\/api\/?$/, "");
    if (!url.startsWith("/")) {
        return `${serverRoot}/${url}`;
    }
    return `${serverRoot}${url}`;
}

export { resolveUrl };
export default API;
