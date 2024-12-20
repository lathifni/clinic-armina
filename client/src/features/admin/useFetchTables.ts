import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query"

export const useFetchTables = <T>(link:string)=>{
    return useQuery<T>({
        queryKey: ['tables', link],
        queryFn: async () => {
            let {data} = await axiosInstance.get('/api/'+link)
            data = data?.data.map(({createdAt,updatedAt,Layanan,  ...data}:{createdAt:string,Layanan:any, updatedAt:string, },)=>data)
            return data
        },
    })
} 