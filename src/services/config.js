import axios from "axios";

const createApiClient = (tagUrl, token, headers) => {
    const url = `http://localhost:3005/api/${tagUrl}`;
    
    const commonHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    if (token) {
        commonHeaders.Authorization = `Bearer ${token}`;
    }

    const commonConfig = {
        withCredentials: true,
        headers: headers ? { ...commonHeaders, ...headers } : commonHeaders,
    };

    return axios.create({
        baseURL: url,
        ...commonConfig,
    });
}

export default createApiClient;
