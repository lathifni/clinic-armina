import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query"

export const useFetchLayanan = ()=>{
    return useQuery({
        queryKey: ['layanan'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/layanan')
            return data;
        },
    })
}