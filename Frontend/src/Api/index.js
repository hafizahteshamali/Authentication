import axios from 'axios';

const ApiClients = axios.create({
    baseURL: "http://localhost:3003/auth/api",
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