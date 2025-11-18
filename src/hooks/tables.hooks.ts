import { QUERY_KEYS } from "@/constant";
import {
  addTable,
  deleteTable,
  getAllTable,
  updateTable,
} from "@/services/table.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.TABLE],
    mutationFn: (tableName: string) => addTable(tableName),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TABLES],
      });
    },
  });
};

export const useGetAllTables = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TABLES],
    queryFn: () => getAllTable(),
  });
};

export const useUpdateTableAll = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.TABLE],
    mutationFn: ({ update }: { update: UpdateTable }) =>
      updateTable(id, update),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TABLES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TABLE, id],
      });
    },
  });
};

export const useUpdateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.TABLE],
    mutationFn: ({
      tableId,
      update,
    }: {
      tableId: string;
      update: UpdateTable;
    }) => updateTable(tableId, update),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TABLES],
      });
    },
  });
};

export const useDeleteTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tableId: string) => deleteTable(tableId),
    mutationKey: [QUERY_KEYS.TABLE],
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TABLES],
      });
    },
  });
};
