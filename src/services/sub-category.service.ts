import { SubCategoryFormValues } from "@/schemas/sub-category.schema";
import { api, handleApiError } from "./index";

export const createSubCategory = async (data: SubCategoryFormValues) => {
  try {
    const response = await api.post("/sub-category", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw handleApiError(error as Error);
  }
};

export const getSubCategories = async (): Promise<SubCategory[]> => {
  try {
    const response = await api.get("/sub-category");
    return response.data;
  } catch (error) {
    console.error(error);
    throw handleApiError(error as Error);
  }
};

export const deleteSubCategory = async (id: string) => {
  try {
    const response = await api.delete(`/sub-category/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw handleApiError(error as Error);
  }
};

export const updateSubCategory = async (
  id: string,
  data: { name: string; parentCategory: string }
) => {
  try {
    const response = await api.patch(`/sub-category/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw handleApiError(error as Error);
  }
};
