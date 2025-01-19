import ApiClients from ".";

const GetReq = async(path)=>{
    try {
        const response = await ApiClients.get(path)
        return response;
    } catch (error) {
        return error;
    }
}

const PostReq = async(path, data)=>{
    try {
        const response = await ApiClients.post(path, data)
        return response;
    } catch (error) {
        return error;
    }
}

const DeleteReq = async(path)=>{
    try {
        const response = await ApiClients.delete(path)
        return response;
    } catch (error) {
        return error;
    }
}

const PutReq = async(path, data)=>{
    try {
        const response = await ApiClients.put(path, data)
        return response;
    } catch (error) {
        return error;
    }
}

export {GetReq, PostReq, DeleteReq, PutReq};