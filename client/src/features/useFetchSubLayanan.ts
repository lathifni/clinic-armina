import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query"

export const useFetchSubLayanan =()=>{
    return useQuery({
        queryKey:['sub-layanan'],
        queryFn:async()=>{
            const {data} = await axiosInstance('api/sub-layanan')
            return data;
        },
        staleTime: 60000 * 60*15,
        gcTime: 1000 * 60 * 30
        
    })
}