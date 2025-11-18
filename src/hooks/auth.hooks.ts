import { login, logout } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../schemas/login.schema";
import { QUERY_KEYS } from "@/constant";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormValues) => login(data),
    mutationKey: [QUERY_KEYS.LOGIN],
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    mutationKey: [QUERY_KEYS.LOGOUT],
  });
};
