import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:1337/",
});
instance.interceptors.request.use(
    function (config) {
        const authorizationHeader = `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`
        const device = localStorage.getItem("device")
        if (config.headers) {
            config.headers.Authorization = authorizationHeader
            config.headers.device = device
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        // console.log("reponse", response);

        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default instance;
