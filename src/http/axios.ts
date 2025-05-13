import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
});

api.defaults.headers.common['Accept']  = "application/json; charset=UTF-8";
api.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

export default api;