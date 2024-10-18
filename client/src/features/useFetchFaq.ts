import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query"

export const useFetchFaq = ()=>{
    return useQuery({
        queryKey: ['faq'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/faq')
            return data;
        },
    })
}