import { axiosInstance } from "@/lib/axiosInstance";
import { ActionProps } from "@/utils/ActionProps";
import { useMutation } from "@tanstack/react-query";

export const useEditTable = ({ link, onSuccess, onError }: ActionProps) => {
    return useMutation({
        mutationKey: ['edit', link],
        mutationFn: async (data: any) => {
            const { id, ...dataWithoutId } = data;

            try {
                console.log(dataWithoutId)
                const { data: response } = await axiosInstance.put('/api/' + link+'/'+id, dataWithoutId);
                return response;
            } catch (error) {
                console.warn('PUT request failed, trying PATCH as fallback:', error);
                // Jika PUT gagal, coba metode PATCH
                const { data: response } = await axiosInstance.patch('/api/' + link+'/'+id, dataWithoutId);
                return response;
            }
        },
        onSuccess,
        onError
    });
};
