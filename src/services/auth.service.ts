import { LoginFormValues } from "@/schemas/login.schema";
import { api, handleApiError } from "../services/index";

export const login = async (
  data: LoginFormValues
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const logout = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};
