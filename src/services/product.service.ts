import { ProductFormValues } from "@/schemas/product.schema";
import { api, handleApiError } from ".";

export const createProduct = async (data: ProductFormValues) => {
  try {
    const response = await api.post("/product", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get("/product");
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const updateProduct = async (id: string, data: ProductFormValues) => {
  try {
    const response = await api.patch(`/product/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};
