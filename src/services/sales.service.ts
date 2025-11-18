import { api, handleApiError } from ".";

export const getSales = async (
  data: SalesFiltering
): Promise<{
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    totalRevenue: number;
    totalFilteredOrders: number;
    cancelledOrders: number;
  };
}> => {
  try {
    const response = await api.get(
      `/sales?orderType=${data.orderType}&status=${data.status}&time=${data.time}&to=${data.to}&from=${data.from}&page=${data.page}`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};
