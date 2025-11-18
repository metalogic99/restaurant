import { api, handleApiError } from ".";

export const addSpecial = async (
  sendData: any
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post("/special", sendData);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const getSpecials = async (): Promise<{
  success: boolean;
  message: string;
  specials: Special[];
}> => {
  try {
    const response = await api.get("/special");
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const updateSpecial = async (
  specialId: string,
  sendData: any
): Promise<{ success: boolean; message: string }> => {
  console.log(sendData);
  try {
    const response = await api.put(`/special/${specialId}`, sendData);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const deleteSpecial = async (
  specialId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.delete(`/special/${specialId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};
