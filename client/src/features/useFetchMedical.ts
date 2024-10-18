import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchMedical = ()=>{
    return useQuery({
        queryKey: ['medical'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/tenaga-medis')
            return data;
        },
    });
}