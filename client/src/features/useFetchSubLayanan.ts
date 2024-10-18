import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query"

export const useFetchSubLayanan =()=>{
    return useQuery({
        queryKey:['sub-layanan'],
        queryFn:async()=>{
            const {data} = await axiosInstance('api/sublayanan')
            return data;
        }
    })
}