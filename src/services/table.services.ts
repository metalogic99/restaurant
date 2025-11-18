import { api, handleApiError } from ".";

export const addTable = async (
  tableName: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post("/table", { tableName: tableName });
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const getAllTable = async (): Promise<{
  success: boolean;
  message: string;
  data: Table[];
}> => {
  try {
    const response = await api.get("/table");
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const updateTable = async (
  tableId: string,
  update: UpdateTable
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.patch(`/table/${tableId}`, update);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const deleteTable = async (
  tableId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.delete(`/table/${tableId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};
