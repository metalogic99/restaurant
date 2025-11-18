import { CategoryFormValues } from "@/schemas/category.schema";
import { api, handleApiError } from "./index";

export const createCategory = async (data: CategoryFormValues) => {
  try {
    const response = await api.post("/category", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const updateCategory = async (id: string, name: string) => {
  try {
    const response = await api.patch(`/category/${id}`, { name });
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};
