// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
//     withCredentials: true, // send cookies to the server
// });

// export default axiosInstance;


import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? '/api' : 'https://kookwithmo-foodsite-backend.onrender.com/api',

    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;