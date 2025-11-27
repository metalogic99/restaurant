import { QUERY_KEYS } from "@/constant";
import {
  createReservation,
  getAvailableTables,
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
    queryKey: [QUERY_KEYS.RESERVATIONTABLES],
    queryFn: () => getAvailableTables(time, date),
    retry: false,
    enabled: !!time && !!date, // only fetch if both exist
  });
};
