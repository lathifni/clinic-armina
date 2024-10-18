import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchBrocures = ()=>{
    return useQuery({
        queryKey: ['brochures'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/promo')
            return data;
        },
    });
}