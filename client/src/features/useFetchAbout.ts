import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchAbout = ()=>{
    return useQuery({
        queryKey: ['about'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/tentang')
            return data;
        },
    });
}