// hooks/useLogin.ts
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface LoginData {
  username: string;
  password: string;
}

type ActionProps = {
  onSuccess: (data:any) => void;
  onError: (error: any) => void;
};

export const useLogin = ({onSuccess,onError}:ActionProps) => {
  return useMutation({
    mutationFn: async (body: LoginData) => {
      const { data } = await axiosInstance.post("/api/auth/login",body);
      return data;
    },
    onError,
    onSuccess
  });
};
