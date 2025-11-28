import { QUERY_KEYS } from "@/constant";
import {
  createReservation,
  deleteReservation,
  getAvailableTables,
  getReservations,
  getReservationsSearch,
} from "@/services/reservation.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReservationRequest) => createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESERVATIONS] });
    },
  });
};

export const useGetAvailableTables = ({
  time,
  date,
}: {
  time: string;
  date: Date;
}) => {
  console.log("fetching tables");
  return useQuery({
    queryKey: [QUERY_KEYS.RESERVATIONTABLES, date, time],
    queryFn: () => getAvailableTables(time, date),
    retry: false,

    enabled: !!time && !!date,
  });
};

export const useGetReservations = (tableId?: string, date?: Date) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RESERVATIONTABLES, date, tableId],
    queryFn: () => getReservations(date, tableId),
    retry: false,
  });
};

export const useGetReservationsSearch = (search?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RESERVATIONS, search],
    queryFn: () => getReservationsSearch(search),
    retry: false,
  });
};

export const useDeleteReservation = (tab: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESERVATIONS, tab],
      });
    },
  });
};
