import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchTestimoni = ()=>{
    return useQuery({
        queryKey: ['testimoni'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/testimoni')
            return data;
        },
    });
}