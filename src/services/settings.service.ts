import { api, handleApiError } from ".";

export const getSettings = async () => {
  try {
    const res = await api.get("/settings");
    return res.data.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const updateSettings = async (formData: FormData) => {
  try {
    const res = await api.patch("/settings", formData);
    return res.data.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};
