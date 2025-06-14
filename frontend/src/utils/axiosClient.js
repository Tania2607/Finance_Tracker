import axios from "axios";

// Set baseURL to your local backend server
export const axiosClient = axios.create({
    baseURL : 'http://localhost:4000'
});
