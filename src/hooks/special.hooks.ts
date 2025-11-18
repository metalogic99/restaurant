import { QUERY_KEYS } from "@/constant";
import {
  addSpecial,
  deleteSpecial,
  getSpecials,
  updateSpecial,
} from "@/services/special.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddSpecial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.SPECIAL],
    mutationFn: (sendData: any) => addSpecial(sendData),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPECIALS],
      });
    },
  });
};

export const useGetSpecials = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SPECIALS],
    queryFn: () => getSpecials(),
  });
};

export const useUpdateSpecial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.SPECIAL],
    mutationFn: ({
      sendData,
      specialId,
    }: {
      sendData: any;
      specialId: string;
    }) => updateSpecial(specialId, sendData),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPECIALS],
      });
    },
  });
};

export const useDeleteSpecial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.SPECIAL],
    mutationFn: (id: string) => deleteSpecial(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPECIALS],
      });
    },
  });
};
