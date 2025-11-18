import { QUERY_KEYS } from "@/constant";
import { ExpenseInput } from "@/schemas/expense.schema";
import {
  addExpense,
  deleteExpense,
  editExpense,
  getExpense,
} from "@/services/expense.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.EXPENSE],
    mutationFn: (data: ExpenseInput) => addExpense(data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
    },
  });
};

export const useGetExpense = (
  time: string,
  to: string,
  from: string,
  page: number
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, time, to, from, page],
    queryFn: () => getExpense(page, time, to, from),
  });
};

export const useEditExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.EXPENSE],
    mutationFn: ({
      expenseId,
      data,
    }: {
      expenseId: string;
      data: ExpenseInput;
    }) => editExpense(expenseId, data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
    },
  });
};

export const useDeleteExpense = (
  time: string,
  to: string,
  from: string,
  page: number
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.EXPENSE],
    mutationFn: (id: string) => deleteExpense(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, time, from, page],
      });
    },
  });
};
