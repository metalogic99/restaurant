import { UserFormValues } from "@/schemas/user.schema";
import { api, handleApiError } from ".";

export const createUser = async (data: UserFormValues) => {
  try {
    const response = await api.post("/user-management", data);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/user-management");
    return response.data.users;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const deleteUsers = async (id: string) => {
  try {
    const response = await api.delete(`/user-management/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const updateUsers = async (id: string, data:UserFormValues) => {
  try {
    const response = await api.patch(`/user-management/${id}`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};
