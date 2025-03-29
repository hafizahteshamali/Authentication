import axios from 'axios';

const ApiClients = axios.create({
    baseURL: "http://localhost:5173/auth/api",
    timeout: 9000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Response Interceptor
ApiClients.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error); // Correct way to handle errors
    }
);

export default ApiClients;
