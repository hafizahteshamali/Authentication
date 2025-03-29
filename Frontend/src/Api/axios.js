import ApiClients from ".";

const GetReq = async (path) => {
    try {
        const response = await ApiClients.get(path);
        return response.data; // Only returning data instead of full response
    } catch (error) {
        return Promise.reject(error.response?.data || error.message); // Better error handling
    }
};

const PostReq = async (path, data) => {
    try {
        const response = await ApiClients.post(path, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error.message);
    }
};

const DeleteReq = async (path) => {
    try {
        const response = await ApiClients.delete(path);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error.message);
    }
};

const PutReq = async (path, data) => {
    try {
        const response = await ApiClients.put(path, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error.message);
    }
};

export { GetReq, PostReq, DeleteReq, PutReq };
