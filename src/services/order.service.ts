import { api, handleApiError } from ".";

export const getOrderByTableId = async (
  tableId?: string
): Promise<{
  success: boolean;
  message: string;
  data: Order | null;
}> => {
  if (!tableId) {
    return {
      success: false,
      message: "Table ID not provided.",
      data: null,
    };
  }

  try {
    const response = await api.get(`order/${tableId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const addOrder = async ({
  tableId,
  orderType,
  currentOrders,
  discount,
}: {
  tableId: string;
  orderType: string;
  currentOrders: AddOrder[];
  discount: number;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post(`/order/${tableId}`, {
      orderType: orderType,
      currentOrders: currentOrders,
      discount: discount,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const updateOrder = async (
  orderId: string,
  updateData?: UpdateOrder[],
  status?: string,
  discount?: number,
  productCompleted?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.patch(`/order/${orderId}`, {
      data: updateData,
      status,
      discount: discount,
      completeProduct: productCompleted,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const getOrderByStatus = async (
  status: string
): Promise<{
  success: boolean;
  message: string;
  data: Order[];
}> => {
  try {
    const response = await api.get(`order?status=${status}&date=today`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const getTodayOrders = async (): Promise<{
  success: boolean;
  message: string;
  data: Order[];
}> => {
  try {
    const response = await api.get(`order?status=all&date=today`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};
