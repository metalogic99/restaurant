import { QUERY_KEYS } from "@/constant";
import { getSales } from "@/services/sales.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSales = (data: SalesFiltering) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SALES, data],
    queryFn: () => getSales(data),
  });
};
