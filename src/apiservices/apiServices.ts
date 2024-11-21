import { getKeyWithExpiration } from "@/hooks/authContext";
import axios from "axios";
const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

const axiosInstance: any = axios.create({
    baseURL: BACKEND_URI,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config: any) => {
    // const token = localStorage.getItem("token");
    const token = getKeyWithExpiration()
    if (!token) return null;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error: any) => {
    return Promise.reject(error);
});



export default class Apiservices {
    static signup = async (data: any) => {
        try {
            const result = await axios.post(`${BACKEND_URI}/user/signup`, data);
            return result.data;
        } catch (error) {
            return error
        }
    }
    static profile = async () => {
        try {
            const result = await axiosInstance.get(`${BACKEND_URI}/user/profile`);
            return result.data;
        } catch (error) {
            return error
        }
    }
    static login = async (data: any) => {
        try {
            const result: any = await axios.post(`${BACKEND_URI}/user/login`, data);
            // localStorage.setItem('token', result.data.token)
            return result.data;
        } catch (error) {
            console.log('error: ', error);
            return error
        }
    }
    static addMovie = async (data: any) => {
        try {
            const result = await axiosInstance.post(`${BACKEND_URI}/movie`, data);
            return result.data;
        } catch (error) {
            return error
        }
    }
    static editMovie = async (data: any) => {
        try {
            const result = await axiosInstance.put(`${BACKEND_URI}/movie`, data);
            return result.data;
        } catch (error) {
            return error
        }
    }
    static getMoviesList = async (page: any) => {
        try {
            const result = await axiosInstance.get(`${BACKEND_URI}/movie?page=${page}`);
            return result.data;
        } catch (error) {
            return error
        }
    }
    static getMovieDetails = async (id: any) => {
        try {
            const result = await axiosInstance.get(`${BACKEND_URI}/movie/details/${id}`);
            return result.data;
        } catch (error) {
            return error
        }
    }
}