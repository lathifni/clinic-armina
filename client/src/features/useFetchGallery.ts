import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchGalleries=() =>{
    return useQuery({
        queryKey: ['galleries'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/galeri')
            return data;
        },
    });
}