import axios from 'axios';

const ApiClients = axios.create({
    baseURL: "https://authentication-rho-gray.vercel.app/auth/api",
    timeout: 9000,
    headers:{
        "Content-Type": "application/json"
    }
})


ApiClients.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    return error;
})

export default ApiClients;