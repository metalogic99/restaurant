import { ExpenseInput } from "@/schemas/expense.schema";
import { api, handleApiError } from ".";

export const addExpense = async (
  expense: ExpenseInput
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post("/expense", expense);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const getExpense = async (
  page: number,
  time: string,
  to: string,
  from: string
): Promise<{
  success: boolean;
  message: string;
  expenses: Expense[];
  totalExpense: number;
  totalAmount: number;
}> => {
  try {
    const response = await api.get(
      `/expense?page=${page}&time=${time}&to=${to}&from=${from}`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const editExpense = async (
  id: string,
  expense: ExpenseInput
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.put(`/expense/${id}`, expense);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};

export const deleteExpense = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.delete(`/expense/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as Error);
  }
};
