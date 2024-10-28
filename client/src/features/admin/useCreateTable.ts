import { axiosInstance } from "@/lib/axiosInstance"
import { ActionProps } from "@/utils/ActionProps"
import { useMutation } from "@tanstack/react-query"

export const useCreateTable =({link,onSuccess,onError}:ActionProps)=>{
   return useMutation({
        mutationKey: ['create', link],
        mutationFn: async (data:any) => {
            const {data: response} = await axiosInstance.post('/api/'+link, data)
            return response
        },
        onSuccess,
        onError
    })
}