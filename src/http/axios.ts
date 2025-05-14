import axios from "axios";

const getXsrfToken = () => {
    const match = document.cookie.match(new RegExp("XSRF-TOKEN=([^;]+)"));
    return match ? decodeURIComponent(match[1]) : "";
};

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: {
        "Accept": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = getXsrfToken();
    if (token) {
        config.headers["X-XSRF-TOKEN"] = token;
    }
    return config;
});

export default api;