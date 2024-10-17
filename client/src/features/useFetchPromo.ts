import { axiosInstance } from "@/lib/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export const useFetchPromo = ()=>{
    return useQuery({
        queryKey: ['promo'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/promo')
            return data;
        },
    });
};