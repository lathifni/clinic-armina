import { axiosInstance } from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';
export const useFetchFacilities = ()=>{
    return useQuery({
        queryKey: ['facilities'],
        queryFn: async () => {
            const {data} = await axiosInstance('api/fasilitas')
            return data;
        },
    })
}