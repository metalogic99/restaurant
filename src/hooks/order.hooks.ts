import { QUERY_KEYS } from "@/constant";
import {
  addOrder,
  getOrderByStatus,
  getOrderByTableId,
  getTodayOrders,
  updateOrder,
} from "@/services/order.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrderbyTableId = (tableId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, tableId],
    queryFn: () => getOrderByTableId(tableId),
    retry: false,
  });
};

export const useAddOrder = (tableId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderType,
      currentOrders,
      discount,
    }: {
      orderType: string;
      currentOrders: AddOrder[];
      discount: number;
    }) => addOrder({ tableId, orderType, currentOrders, discount }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER, tableId],
      });
    },
  });
};

export const useUpdateOrder = (tableId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.ORDER, tableId],
    mutationFn: ({
      orderId,
      updateData,
      status,
      discount,
      productCompleted,
    }: {
      orderId: string;
      updateData?: UpdateOrder[];
      status?: string;
      discount?: number;
      productCompleted?: string;
    }) => updateOrder(orderId, updateData, status, discount, productCompleted),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER, tableId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS],
      });
    },
  });
};

export const useGetTodayOrders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODAYORDER],
    queryFn: getTodayOrders,
  });
};

export const useGetOrderbyStatus = (status: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, status],
    queryFn: () => getOrderByStatus(status),
  });
};
