import { axiosInstance } from "@/lib/axiosInstance"
import { ActionProps } from "@/utils/ActionProps"
import { useMutation } from "@tanstack/react-query"

export const useDeleteTable =({link,onSuccess,onError}:ActionProps)=>{
   return useMutation({
        mutationKey: ['delete', link],
        mutationFn: async (id:string|number) => {
            const {data: response} = await axiosInstance.delete('/api/'+link+'/'+id)
            return response
        },
        onSuccess,
        onError
    })
}