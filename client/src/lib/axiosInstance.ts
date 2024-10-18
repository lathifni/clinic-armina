import axios from 'axios';
import { baseUrl } from '@/lib/baseUrl';
export const axiosInstance = axios.create({
    baseURL: baseUrl 
})