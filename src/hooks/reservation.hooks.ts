import { QUERY_KEYS } from "@/constant";
import {
  createReservation,
  getAvailableTables,
  getReservations,
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

export const useGetReservations = ({
  tableId,
  date,
}: {
  tableId?: string;
  date?: Date;
}) => {
  console.log("fetching tables");
  return useQuery({
    queryKey: [QUERY_KEYS.RESERVATIONTABLES, date, tableId],
    queryFn: () => getReservations(date, tableId),
    retry: false,
  });
};
